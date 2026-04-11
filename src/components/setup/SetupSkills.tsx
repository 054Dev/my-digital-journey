import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSkillsTechnical, useSkillsCreative } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { iconNames } from "@/lib/iconMap";
import { Slider } from "@/components/ui/slider";

const SetupSkills = () => {
  const { data: techSkills, isLoading: loadingTech } = useSkillsTechnical();
  const { data: creativeSkills, isLoading: loadingCreative } = useSkillsCreative();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [techItems, setTechItems] = useState<any[]>([]);
  const [creativeItems, setCreativeItems] = useState<any[]>([]);
  const [initT, setInitT] = useState(false);
  const [initC, setInitC] = useState(false);

  if (techSkills && !initT) { setTechItems(techSkills.map(s => ({ ...s }))); setInitT(true); }
  if (creativeSkills && !initC) { setCreativeItems(creativeSkills.map(s => ({ ...s }))); setInitC(true); }

  const saveAll = async () => {
    for (const s of techItems) {
      const d = { name: s.name, level: s.level, display_order: s.display_order };
      if (s.isNew) await supabase.from("skills_technical").insert(d);
      else await supabase.from("skills_technical").update(d).eq("id", s.id);
    }
    for (const s of creativeItems) {
      const d = { title: s.title, description: s.description, icon_name: s.icon_name, display_order: s.display_order };
      if (s.isNew) await supabase.from("skills_creative").insert(d);
      else await supabase.from("skills_creative").update(d).eq("id", s.id);
    }
    qc.invalidateQueries({ queryKey: ["skills_technical"] });
    qc.invalidateQueries({ queryKey: ["skills_creative"] });
    setInitT(false); setInitC(false);
    toast({ title: "Saved!" });
  };

  if (loadingTech || loadingCreative) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Technical Skills</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setTechItems([...techItems, { id: `new-${Date.now()}`, name: "", level: 50, display_order: techItems.length, isNew: true }])}>
              <Plus size={14} /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {techItems.map((s, i) => (
            <div key={s.id} className="flex items-center gap-4">
              <Input value={s.name} onChange={e => { const u = [...techItems]; u[i] = { ...u[i], name: e.target.value }; setTechItems(u); }} placeholder="Skill name" className="flex-1" />
              <div className="w-32 flex items-center gap-2">
                <Slider value={[s.level]} onValueChange={([v]) => { const u = [...techItems]; u[i] = { ...u[i], level: v }; setTechItems(u); }} max={100} step={5} />
                <span className="text-sm text-muted-foreground w-8">{s.level}%</span>
              </div>
              <Button variant="ghost" size="icon" onClick={async () => {
                if (!s.isNew) await supabase.from("skills_technical").delete().eq("id", s.id);
                setTechItems(techItems.filter((_, idx) => idx !== i));
                qc.invalidateQueries({ queryKey: ["skills_technical"] });
              }}><Trash2 size={14} /></Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Creative Skills</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setCreativeItems([...creativeItems, { id: `new-${Date.now()}`, title: "", description: "", icon_name: "Star", display_order: creativeItems.length, isNew: true }])}>
              <Plus size={14} /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {creativeItems.map((s, i) => (
            <div key={s.id} className="space-y-2 border-b border-border pb-4">
              <div className="flex gap-4">
                <Input value={s.title} onChange={e => { const u = [...creativeItems]; u[i] = { ...u[i], title: e.target.value }; setCreativeItems(u); }} placeholder="Skill title" className="flex-1" />
                <Select value={s.icon_name} onValueChange={v => { const u = [...creativeItems]; u[i] = { ...u[i], icon_name: v }; setCreativeItems(u); }}>
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>{iconNames.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={async () => {
                  if (!s.isNew) await supabase.from("skills_creative").delete().eq("id", s.id);
                  setCreativeItems(creativeItems.filter((_, idx) => idx !== i));
                  qc.invalidateQueries({ queryKey: ["skills_creative"] });
                }}><Trash2 size={14} /></Button>
              </div>
              <Textarea value={s.description} onChange={e => { const u = [...creativeItems]; u[i] = { ...u[i], description: e.target.value }; setCreativeItems(u); }} placeholder="Description" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Button onClick={saveAll} size="lg"><Save size={18} /> Save All Skills</Button>
    </div>
  );
};

export default SetupSkills;
