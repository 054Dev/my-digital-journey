import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useResumeFiles } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Upload, Trash2, FileText } from "lucide-react";

const SetupResume = () => {
  const { data: files, isLoading } = useResumeFiles();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [uploading, setUploading] = useState<string | null>(null);

  const resumeFile = files?.find(f => f.file_type === "resume");
  const cvFile = files?.find(f => f.file_type === "cv");

  const upload = async (type: "resume" | "cv", file: File) => {
    setUploading(type);
    const path = `${type}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("resume-files").upload(path, file);
    if (uploadError) { toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" }); setUploading(null); return; }
    const { data: { publicUrl } } = supabase.storage.from("resume-files").getPublicUrl(path);

    const existing = files?.find(f => f.file_type === type);
    if (existing) {
      await supabase.from("resume_files").update({ file_url: publicUrl, file_name: file.name }).eq("id", existing.id);
    } else {
      await supabase.from("resume_files").insert({ file_type: type, file_url: publicUrl, file_name: file.name });
    }
    qc.invalidateQueries({ queryKey: ["resume_files"] });
    toast({ title: "Uploaded!", description: `${type === "cv" ? "CV" : "Resume"} uploaded.` });
    setUploading(null);
  };

  const remove = async (type: "resume" | "cv") => {
    const f = files?.find(f => f.file_type === type);
    if (f) {
      await supabase.from("resume_files").delete().eq("id", f.id);
      qc.invalidateQueries({ queryKey: ["resume_files"] });
      toast({ title: "Removed" });
    }
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  const FileCard = ({ type, file }: { type: "resume" | "cv"; file: any }) => (
    <Card>
      <CardHeader><CardTitle>{type === "cv" ? "CV" : "Resume"}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {file ? (
          <div className="flex items-center justify-between bg-accent rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FileText className="text-primary" size={24} />
              <div>
                <p className="font-medium text-foreground">{file.file_name}</p>
                <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">View file</a>
              </div>
            </div>
            <Button variant="destructive" size="sm" onClick={() => remove(type)}><Trash2 size={14} /></Button>
          </div>
        ) : (
          <p className="text-muted-foreground">No {type} uploaded yet.</p>
        )}
        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-input rounded-md text-sm hover:bg-accent">
          <Upload size={14} /> {file ? "Replace" : "Upload"} {type === "cv" ? "CV" : "Resume"}
          <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => e.target.files?.[0] && upload(type, e.target.files[0])} disabled={uploading === type} />
        </label>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <FileCard type="resume" file={resumeFile} />
      <FileCard type="cv" file={cvFile} />
    </div>
  );
};

export default SetupResume;
