import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteImages } from "@/hooks/usePortfolioData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Upload, Image, Trash2, ChevronLeft, ChevronRight, Check } from "lucide-react";

const imageLabels: Record<string, string> = {
  "hero-home": "Homepage Hero",
  "hero-childhood": "Childhood Page Hero",
  "hero-education": "Education Page Hero",
  "hero-skills": "Skills Page Hero",
  "hero-aspirations": "Aspirations Page Hero",
  "hero-resume": "Resume Page Hero",
  "hero-contact": "Contact Page Hero",
  "bg-quote-home": "Home Quote Background",
  "bg-quote-aspirations": "Aspirations Quote Background",
  "bg-family-childhood": "Childhood Family Section BG",
  "bg-creative-skills": "Skills Creative Section BG",
  "favicon": "Favicon",
};

const SetupImages = () => {
  const { data: images, isLoading: loadingImages } = useSiteImages();
  const { data: versions, isLoading: loadingVersions } = useQuery({
    queryKey: ["image_versions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("image_versions").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const { toast } = useToast();
  const qc = useQueryClient();
  const [scrollIndex, setScrollIndex] = useState<Record<string, number>>({});

  const upload = async (imageKey: string, file: File) => {
    const path = `site/${imageKey}-${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("portfolio-images").upload(path, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      return;
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from("portfolio-images").getPublicUrl(path);

    // Save as a new version
    await supabase.from("image_versions").insert({ image_key: imageKey, url: publicUrl, is_active: true });

    // Deactivate other versions
    const existingVersions = versions?.filter((v) => v.image_key === imageKey && v.url !== publicUrl);
    if (existingVersions) {
      for (const v of existingVersions) {
        await supabase.from("image_versions").update({ is_active: false }).eq("id", v.id);
      }
    }

    // Update or insert site_images record
    const existing = images?.find((i) => i.image_key === imageKey);
    if (existing) {
      await supabase.from("site_images").update({ url: publicUrl }).eq("id", existing.id);
    } else {
      await supabase.from("site_images").insert({ image_key: imageKey, url: publicUrl });
    }

    qc.invalidateQueries({ queryKey: ["site_images"] });
    qc.invalidateQueries({ queryKey: ["image_versions"] });
    toast({ title: "Image uploaded!" });
  };

  const selectVersion = async (imageKey: string, versionUrl: string, versionId: string) => {
    // Set this version as active
    const keyVersions = versions?.filter((v) => v.image_key === imageKey) || [];
    for (const v of keyVersions) {
      await supabase.from("image_versions").update({ is_active: v.id === versionId }).eq("id", v.id);
    }

    // Update site_images
    const existing = images?.find((i) => i.image_key === imageKey);
    if (existing) {
      await supabase.from("site_images").update({ url: versionUrl }).eq("id", existing.id);
    } else {
      await supabase.from("site_images").insert({ image_key: imageKey, url: versionUrl });
    }

    qc.invalidateQueries({ queryKey: ["site_images"] });
    qc.invalidateQueries({ queryKey: ["image_versions"] });
    toast({ title: "Image selected!" });
  };

  const deleteVersion = async (imageKey: string, versionId: string, versionUrl: string) => {
    await supabase.from("image_versions").delete().eq("id", versionId);

    // If this was the active version, revert to previous or remove
    const currentImg = images?.find((i) => i.image_key === imageKey);
    if (currentImg?.url === versionUrl) {
      const remaining = versions?.filter((v) => v.image_key === imageKey && v.id !== versionId);
      if (remaining && remaining.length > 0) {
        await supabase.from("site_images").update({ url: remaining[0].url }).eq("id", currentImg.id);
        await supabase.from("image_versions").update({ is_active: true }).eq("id", remaining[0].id);
      } else {
        await supabase.from("site_images").delete().eq("id", currentImg.id);
      }
    }

    qc.invalidateQueries({ queryKey: ["site_images"] });
    qc.invalidateQueries({ queryKey: ["image_versions"] });
    toast({ title: "Image deleted" });
  };

  if (loadingImages || loadingVersions) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">Site Images</h2>
      <p className="text-muted-foreground">
        Upload custom images for each page hero and background sections. Scroll through your upload history
        to select or delete previous images.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(imageLabels).map(([key, label]) => {
          const img = images?.find((i) => i.image_key === key);
          const keyVersions = versions?.filter((v) => v.image_key === key) || [];
          const idx = scrollIndex[key] || 0;

          return (
            <Card key={key}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{label}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Current / Gallery View */}
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-3">
                  {keyVersions.length > 0 ? (
                    <>
                      <img
                        src={keyVersions[idx]?.url || img?.url || ""}
                        alt={label}
                        className="w-full h-full object-cover"
                      />
                      {/* Active badge */}
                      {keyVersions[idx]?.is_active && (
                        <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check size={10} /> Active
                        </span>
                      )}
                      {/* Navigation arrows */}
                      {keyVersions.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              setScrollIndex({ ...scrollIndex, [key]: (idx - 1 + keyVersions.length) % keyVersions.length })
                            }
                            className="absolute left-1 top-1/2 -translate-y-1/2 bg-foreground/60 text-background rounded-full p-1 hover:bg-foreground/80"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={() =>
                              setScrollIndex({ ...scrollIndex, [key]: (idx + 1) % keyVersions.length })
                            }
                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-foreground/60 text-background rounded-full p-1 hover:bg-foreground/80"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </>
                      )}
                      {/* Counter */}
                      {keyVersions.length > 1 && (
                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-foreground/60 text-background text-xs px-2 py-0.5 rounded-full">
                          {idx + 1} / {keyVersions.length}
                        </span>
                      )}
                    </>
                  ) : img?.url ? (
                    <img src={img.url} alt={label} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Image className="text-muted-foreground" size={32} />
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <label className="cursor-pointer flex-1 inline-flex items-center gap-2 px-3 py-2 border border-input rounded-md text-sm hover:bg-accent justify-center">
                    <Upload size={14} /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && upload(key, e.target.files[0])}
                    />
                  </label>
                  {keyVersions.length > 0 && keyVersions[idx] && !keyVersions[idx].is_active && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => selectVersion(key, keyVersions[idx].url, keyVersions[idx].id)}
                      className="px-3"
                    >
                      <Check size={14} /> Use
                    </Button>
                  )}
                  {keyVersions.length > 0 && keyVersions[idx] && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        deleteVersion(key, keyVersions[idx].id, keyVersions[idx].url);
                        if (idx >= keyVersions.length - 1) setScrollIndex({ ...scrollIndex, [key]: Math.max(0, idx - 1) });
                      }}
                      className="px-3 text-destructive hover:text-destructive"
                    >
                      <Trash2 size={14} />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SetupImages;
