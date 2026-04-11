import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAspirations } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { iconNames } from "@/lib/iconMap";

const statuses = ["In Progress", "Planning", "Dream", "Future", "Active", "Ongoing"];

const SetupAspirations = () => {
  const { data: aspirations, isLoading } = useAspirations();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [items, setItems] = useState<any[]>([]);
  const [init, setInit] = useState(false);

  if (aspirations && !init) { setItems(aspirations.map(a => ({ ...a }))); setInit(true); }

  const saveAll = async () => {
    for (const a of items) {
      const d = { title: a.title, description: a.description, timeline: a.timeline, icon_name: a.icon_name, status: a.status, display_order: a.display_order };
      if (a.isNew) await supabase.from("aspirations").insert(d);
      else await supabase.from("aspirations").update(d).eq("id", a.id);
    }
    qc.invalidateQueries({ queryKey: ["aspirations"] });
    setInit(false);
    toast({ title: "Saved!" });
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-2xl font-semibold">Aspirations</h2>
        <Button variant="outline" onClick={() => setItems([...items, { id: `new-${Date.now()}`, title: "", description: "", timeline: "", icon_name: "Rocket", status: "Planning", display_order: items.length, isNew: true }])}>
          <Plus size={16} /> Add Goal
        </Button>
      </div>
      {items.map((a, i) => (
        <Card key={a.id}>
          <CardContent className="pt-6 space-y-3">
            <div className="grid sm:grid-cols-3 gap-3">
              <Input value={a.title} onChange={e => { const u = [...items]; u[i] = { ...u[i], title: e.target.value }; setItems(u); }} placeholder="Title" />
              <Input value={a.timeline} onChange={e => { const u = [...items]; u[i] = { ...u[i], timeline: e.target.value }; setItems(u); }} placeholder="Timeline" />
              <div className="flex gap-2">
                <Select value={a.status} onValueChange={v => { const u = [...items]; u[i] = { ...u[i], status: v }; setItems(u); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={a.icon_name} onValueChange={v => { const u = [...items]; u[i] = { ...u[i], icon_name: v }; setItems(u); }}>
                  <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                  <SelectContent>{iconNames.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <Textarea value={a.description} onChange={e => { const u = [...items]; u[i] = { ...u[i], description: e.target.value }; setItems(u); }} placeholder="Description" />
            <Button variant="destructive" size="sm" onClick={async () => { if (!a.isNew) await supabase.from("aspirations").delete().eq("id", a.id); setItems(items.filter((_, idx) => idx !== i)); qc.invalidateQueries({ queryKey: ["aspirations"] }); }}>
              <Trash2 size={14} /> Remove
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button onClick={saveAll} size="lg"><Save size={18} /> Save Aspirations</Button>
    </div>
  );
};

export default SetupAspirations;
