import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useChildhoodEvents } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { iconNames } from "@/lib/iconMap";

const SetupChildhood = () => {
  const { data: events, isLoading } = useChildhoodEvents();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [items, setItems] = useState<any[]>([]);
  const [init, setInit] = useState(false);

  if (events && !init) { setItems(events.map(e => ({ ...e }))); setInit(true); }

  const saveAll = async () => {
    for (const e of items) {
      const d = { year: e.year, title: e.title, description: e.description, icon_name: e.icon_name, display_order: e.display_order };
      if (e.isNew) await supabase.from("childhood_events").insert(d);
      else await supabase.from("childhood_events").update(d).eq("id", e.id);
    }
    qc.invalidateQueries({ queryKey: ["childhood_events"] });
    setInit(false);
    toast({ title: "Saved!" });
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-2xl font-semibold">Childhood Timeline</h2>
        <Button variant="outline" onClick={() => setItems([...items, { id: `new-${Date.now()}`, year: "", title: "", description: "", icon_name: "Star", display_order: items.length, isNew: true }])}>
          <Plus size={16} /> Add Event
        </Button>
      </div>
      {items.map((e, i) => (
        <Card key={e.id}>
          <CardContent className="pt-6 space-y-3">
            <div className="grid sm:grid-cols-3 gap-3">
              <Input value={e.year} onChange={ev => { const u = [...items]; u[i] = { ...u[i], year: ev.target.value }; setItems(u); }} placeholder="Year" />
              <Input value={e.title} onChange={ev => { const u = [...items]; u[i] = { ...u[i], title: ev.target.value }; setItems(u); }} placeholder="Title" />
              <Select value={e.icon_name} onValueChange={v => { const u = [...items]; u[i] = { ...u[i], icon_name: v }; setItems(u); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{iconNames.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Textarea value={e.description} onChange={ev => { const u = [...items]; u[i] = { ...u[i], description: ev.target.value }; setItems(u); }} placeholder="Description" />
            <Button variant="destructive" size="sm" onClick={async () => { if (!e.isNew) await supabase.from("childhood_events").delete().eq("id", e.id); setItems(items.filter((_, idx) => idx !== i)); qc.invalidateQueries({ queryKey: ["childhood_events"] }); }}>
              <Trash2 size={14} /> Remove
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button onClick={saveAll} size="lg"><Save size={18} /> Save Timeline</Button>
    </div>
  );
};

export default SetupChildhood;
