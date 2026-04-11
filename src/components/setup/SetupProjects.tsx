import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProjects } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Save, Upload } from "lucide-react";

const SetupProjects = () => {
  const { data: projects, isLoading } = useProjects();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [items, setItems] = useState<any[]>([]);
  const [initialized, setInitialized] = useState(false);

  if (projects && !initialized) {
    setItems(projects.map((p) => ({ ...p })));
    setInitialized(true);
  }

  const addItem = () => {
    setItems([...items, {
      id: `new-${Date.now()}`, title: "", description: "", tech_stack: "",
      image_url: "", github_link: "", live_demo_link: "",
      display_order: items.length, isNew: true,
    }]);
  };

  const update = (i: number, field: string, value: string) => {
    const u = [...items]; u[i] = { ...u[i], [field]: value }; setItems(u);
  };

  const remove = async (i: number) => {
    const item = items[i];
    if (!item.isNew) await supabase.from("projects").delete().eq("id", item.id);
    setItems(items.filter((_, idx) => idx !== i));
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    toast({ title: "Removed" });
  };

  const uploadImage = async (i: number, file: File) => {
    const path = `projects/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("portfolio-images").upload(path, file);
    if (error) { toast({ title: "Upload failed", description: error.message, variant: "destructive" }); return; }
    const { data: { publicUrl } } = supabase.storage.from("portfolio-images").getPublicUrl(path);
    update(i, "image_url", publicUrl);
  };

  const saveAll = async () => {
    for (const item of items) {
      const data = {
        title: item.title, description: item.description, tech_stack: item.tech_stack || "",
        image_url: item.image_url || "", github_link: item.github_link || "",
        live_demo_link: item.live_demo_link || "", display_order: item.display_order,
      };
      if (item.isNew) await supabase.from("projects").insert(data);
      else await supabase.from("projects").update(data).eq("id", item.id);
    }
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    setInitialized(false);
    toast({ title: "Saved!", description: "Projects updated." });
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-2xl font-semibold">Projects</h2>
        <Button onClick={addItem} variant="outline"><Plus size={16} /> Add Project</Button>
      </div>

      {items.map((item, i) => (
        <Card key={item.id}>
          <CardContent className="pt-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => update(i, "title", e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Tech Stack</Label>
                <Input value={item.tech_stack || ""} onChange={(e) => update(i, "tech_stack", e.target.value)} className="mt-1" placeholder="React • Node.js" />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={item.description} onChange={(e) => update(i, "description", e.target.value)} className="mt-1" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Live Demo Link</Label>
                <Input value={item.live_demo_link || ""} onChange={(e) => update(i, "live_demo_link", e.target.value)} className="mt-1" placeholder="https://..." />
              </div>
              <div>
                <Label>GitHub Link (optional)</Label>
                <Input value={item.github_link || ""} onChange={(e) => update(i, "github_link", e.target.value)} className="mt-1" placeholder="https://github.com/..." />
              </div>
            </div>
            <div>
              <Label>Project Image</Label>
              <div className="flex items-center gap-4 mt-1">
                {item.image_url && <img src={item.image_url} alt="" className="w-20 h-14 object-cover rounded" />}
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-input rounded-md text-sm hover:bg-accent">
                  <Upload size={14} /> Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadImage(i, e.target.files[0])} />
                </label>
              </div>
            </div>
            <Button variant="destructive" size="sm" onClick={() => remove(i)}>
              <Trash2 size={14} /> Remove Project
            </Button>
          </CardContent>
        </Card>
      ))}

      <Button onClick={saveAll} size="lg"><Save size={18} /> Save All Projects</Button>
    </div>
  );
};

export default SetupProjects;
