import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useEducationEntries, useEducationAchievements, useEducationActivities } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Save, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { iconNames } from "@/lib/iconMap";

const SetupEducation = () => {
  const { data: entries } = useEducationEntries();
  const { data: achievements } = useEducationAchievements();
  const { data: activities } = useEducationActivities();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [eduItems, setEduItems] = useState<any[]>([]);
  const [achItems, setAchItems] = useState<any[]>([]);
  const [actItems, setActItems] = useState<any[]>([]);
  const [init, setInit] = useState({ e: false, a: false, ac: false });

  if (entries && !init.e) { setEduItems(entries.map(e => ({ ...e, highlights: Array.isArray(e.highlights) ? e.highlights : [] }))); setInit(p => ({ ...p, e: true })); }
  if (achievements && !init.a) { setAchItems(achievements.map(a => ({ ...a }))); setInit(p => ({ ...p, a: true })); }
  if (activities && !init.ac) { setActItems(activities.map(a => ({ ...a }))); setInit(p => ({ ...p, ac: true })); }

  const saveAll = async () => {
    for (const e of eduItems) {
      const d = { period: e.period, institution: e.institution, degree: e.degree, highlights: e.highlights, icon_name: e.icon_name, display_order: e.display_order };
      if (e.isNew) await supabase.from("education_entries").insert(d);
      else await supabase.from("education_entries").update(d).eq("id", e.id);
    }
    for (const a of achItems) {
      const d = { title: a.title, count_value: a.count_value, description: a.description, display_order: a.display_order };
      if (a.isNew) await supabase.from("education_achievements").insert(d);
      else await supabase.from("education_achievements").update(d).eq("id", a.id);
    }
    for (const a of actItems) {
      const d = { title: a.title, role: a.role, description: a.description, display_order: a.display_order };
      if (a.isNew) await supabase.from("education_activities").insert(d);
      else await supabase.from("education_activities").update(d).eq("id", a.id);
    }
    ["education_entries", "education_achievements", "education_activities"].forEach(k => qc.invalidateQueries({ queryKey: [k] }));
    setInit({ e: false, a: false, ac: false });
    toast({ title: "Saved!" });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Education Entries</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setEduItems([...eduItems, { id: `new-${Date.now()}`, period: "", institution: "", degree: "", highlights: [], icon_name: "GraduationCap", display_order: eduItems.length, isNew: true }])}>
              <Plus size={14} /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {eduItems.map((e, i) => (
            <div key={e.id} className="space-y-3 border-b border-border pb-4">
              <div className="grid sm:grid-cols-3 gap-3">
                <Input value={e.period} onChange={ev => { const u = [...eduItems]; u[i] = { ...u[i], period: ev.target.value }; setEduItems(u); }} placeholder="Period" />
                <Input value={e.institution} onChange={ev => { const u = [...eduItems]; u[i] = { ...u[i], institution: ev.target.value }; setEduItems(u); }} placeholder="Institution" />
                <Input value={e.degree} onChange={ev => { const u = [...eduItems]; u[i] = { ...u[i], degree: ev.target.value }; setEduItems(u); }} placeholder="Degree" />
              </div>
              <div>
                <Label className="text-xs">Highlights</Label>
                {(e.highlights as string[]).map((h: string, hi: number) => (
                  <div key={hi} className="flex gap-2 mt-1">
                    <Input value={h} onChange={ev => { const u = [...eduItems]; const hl = [...u[i].highlights]; hl[hi] = ev.target.value; u[i] = { ...u[i], highlights: hl }; setEduItems(u); }} />
                    <Button variant="ghost" size="icon" onClick={() => { const u = [...eduItems]; u[i] = { ...u[i], highlights: u[i].highlights.filter((_: any, idx: number) => idx !== hi) }; setEduItems(u); }}><X size={14} /></Button>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="mt-1" onClick={() => { const u = [...eduItems]; u[i] = { ...u[i], highlights: [...u[i].highlights, ""] }; setEduItems(u); }}><Plus size={12} /> Add highlight</Button>
              </div>
              <Button variant="destructive" size="sm" onClick={async () => { if (!e.isNew) await supabase.from("education_entries").delete().eq("id", e.id); setEduItems(eduItems.filter((_, idx) => idx !== i)); qc.invalidateQueries({ queryKey: ["education_entries"] }); }}>
                <Trash2 size={14} /> Remove
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Achievements</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setAchItems([...achItems, { id: `new-${Date.now()}`, title: "", count_value: "", description: "", display_order: achItems.length, isNew: true }])}>
              <Plus size={14} /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {achItems.map((a, i) => (
            <div key={a.id} className="flex gap-3 items-center">
              <Input value={a.title} onChange={e => { const u = [...achItems]; u[i] = { ...u[i], title: e.target.value }; setAchItems(u); }} placeholder="Title" className="flex-1" />
              <Input value={a.count_value} onChange={e => { const u = [...achItems]; u[i] = { ...u[i], count_value: e.target.value }; setAchItems(u); }} placeholder="Value" className="w-20" />
              <Input value={a.description} onChange={e => { const u = [...achItems]; u[i] = { ...u[i], description: e.target.value }; setAchItems(u); }} placeholder="Description" className="flex-1" />
              <Button variant="ghost" size="icon" onClick={async () => { if (!a.isNew) await supabase.from("education_achievements").delete().eq("id", a.id); setAchItems(achItems.filter((_, idx) => idx !== i)); qc.invalidateQueries({ queryKey: ["education_achievements"] }); }}><Trash2 size={14} /></Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Extracurricular Activities</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setActItems([...actItems, { id: `new-${Date.now()}`, title: "", role: "", description: "", display_order: actItems.length, isNew: true }])}>
              <Plus size={14} /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {actItems.map((a, i) => (
            <div key={a.id} className="space-y-2 border-b border-border pb-3">
              <div className="flex gap-3">
                <Input value={a.title} onChange={e => { const u = [...actItems]; u[i] = { ...u[i], title: e.target.value }; setActItems(u); }} placeholder="Title" className="flex-1" />
                <Input value={a.role} onChange={e => { const u = [...actItems]; u[i] = { ...u[i], role: e.target.value }; setActItems(u); }} placeholder="Role" className="flex-1" />
                <Button variant="ghost" size="icon" onClick={async () => { if (!a.isNew) await supabase.from("education_activities").delete().eq("id", a.id); setActItems(actItems.filter((_, idx) => idx !== i)); qc.invalidateQueries({ queryKey: ["education_activities"] }); }}><Trash2 size={14} /></Button>
              </div>
              <Textarea value={a.description} onChange={e => { const u = [...actItems]; u[i] = { ...u[i], description: e.target.value }; setActItems(u); }} placeholder="Description" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Button onClick={saveAll} size="lg"><Save size={18} /> Save All Education</Button>
    </div>
  );
};

export default SetupEducation;
