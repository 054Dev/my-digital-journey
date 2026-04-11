import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSocialLinks } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Save } from "lucide-react";
import { iconNames, getIcon } from "@/lib/iconMap";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SetupSocialLinks = () => {
  const { data: links, isLoading } = useSocialLinks();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingLinks, setEditingLinks] = useState<any[]>([]);
  const [initialized, setInitialized] = useState(false);

  if (links && !initialized) {
    setEditingLinks(links.map((l) => ({ ...l })));
    setInitialized(true);
  }

  const addLink = () => {
    setEditingLinks([...editingLinks, {
      id: `new-${Date.now()}`,
      platform: "",
      url: "",
      icon_name: "Globe",
      handle: "",
      display_order: editingLinks.length,
      isNew: true,
    }]);
  };

  const updateLink = (index: number, field: string, value: string) => {
    const updated = [...editingLinks];
    updated[index] = { ...updated[index], [field]: value };
    setEditingLinks(updated);
  };

  const removeLink = async (index: number) => {
    const link = editingLinks[index];
    if (!link.isNew) {
      await supabase.from("social_links").delete().eq("id", link.id);
    }
    setEditingLinks(editingLinks.filter((_, i) => i !== index));
    queryClient.invalidateQueries({ queryKey: ["social_links"] });
    toast({ title: "Removed", description: "Social link removed." });
  };

  const saveAll = async () => {
    for (const link of editingLinks) {
      const data = {
        platform: link.platform,
        url: link.url,
        icon_name: link.icon_name,
        handle: link.handle || "",
        display_order: link.display_order,
      };
      if (link.isNew) {
        await supabase.from("social_links").insert(data);
      } else {
        await supabase.from("social_links").update(data).eq("id", link.id);
      }
    }
    queryClient.invalidateQueries({ queryKey: ["social_links"] });
    setInitialized(false);
    toast({ title: "Saved!", description: "Social links updated." });
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-2xl font-semibold">Social Links</h2>
        <Button onClick={addLink} variant="outline"><Plus size={16} /> Add Link</Button>
      </div>

      {editingLinks.map((link, index) => (
        <Card key={link.id}>
          <CardContent className="pt-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Platform Name</Label>
                <Input value={link.platform} onChange={(e) => updateLink(index, "platform", e.target.value)} className="mt-1" placeholder="e.g. GitHub" />
              </div>
              <div>
                <Label>Icon</Label>
                <Select value={link.icon_name} onValueChange={(v) => updateLink(index, "icon_name", v)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {iconNames.map((name) => (
                      <SelectItem key={name} value={name}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>URL</Label>
                <Input value={link.url} onChange={(e) => updateLink(index, "url", e.target.value)} className="mt-1" placeholder="https://..." />
              </div>
              <div>
                <Label>Handle / Display</Label>
                <Input value={link.handle || ""} onChange={(e) => updateLink(index, "handle", e.target.value)} className="mt-1" placeholder="@username" />
              </div>
            </div>
            <Button variant="destructive" size="sm" onClick={() => removeLink(index)}>
              <Trash2 size={14} /> Remove
            </Button>
          </CardContent>
        </Card>
      ))}

      <Button onClick={saveAll} size="lg"><Save size={18} /> Save All Links</Button>
    </div>
  );
};

export default SetupSocialLinks;
