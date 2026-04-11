import { supabase } from "@/integrations/supabase/client";
import { useSiteImages } from "@/hooks/usePortfolioData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Upload, Image } from "lucide-react";

const imageLabels: Record<string, string> = {
  "hero-home": "Homepage Hero",
  "hero-childhood": "Childhood Page Hero",
  "hero-education": "Education Page Hero",
  "hero-skills": "Skills Page Hero",
  "hero-aspirations": "Aspirations Page Hero",
  "favicon": "Favicon",
};

const SetupImages = () => {
  const { data: images, isLoading } = useSiteImages();
  const { toast } = useToast();
  const qc = useQueryClient();

  const upload = async (imageKey: string, file: File) => {
    const path = `site/${imageKey}-${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("portfolio-images").upload(path, file);
    if (error) { toast({ title: "Upload failed", description: error.message, variant: "destructive" }); return; }
    const { data: { publicUrl } } = supabase.storage.from("portfolio-images").getPublicUrl(path);

    const existing = images?.find(i => i.image_key === imageKey);
    if (existing) {
      await supabase.from("site_images").update({ url: publicUrl }).eq("id", existing.id);
    } else {
      await supabase.from("site_images").insert({ image_key: imageKey, url: publicUrl });
    }
    qc.invalidateQueries({ queryKey: ["site_images"] });
    toast({ title: "Image updated!" });
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">Site Images</h2>
      <p className="text-muted-foreground">Upload custom images for each page hero and the favicon. If no custom image is set, the default AI-generated images will be used.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(imageLabels).map(([key, label]) => {
          const img = images?.find(i => i.image_key === key);
          return (
            <Card key={key}>
              <CardHeader className="pb-3"><CardTitle className="text-base">{label}</CardTitle></CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                  {img?.url ? (
                    <img src={img.url} alt={label} className="w-full h-full object-cover" />
                  ) : (
                    <Image className="text-muted-foreground" size={32} />
                  )}
                </div>
                <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-input rounded-md text-sm hover:bg-accent w-full justify-center">
                  <Upload size={14} /> {img?.url ? "Replace" : "Upload"}
                  <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && upload(key, e.target.files[0])} />
                </label>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SetupImages;
