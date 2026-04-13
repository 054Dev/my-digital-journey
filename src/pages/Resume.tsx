import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { useResumeFiles, useSiteSettings } from "@/hooks/usePortfolioData";
import { PageSkeleton } from "@/components/LoadingSkeleton";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePageSEO } from "@/hooks/usePageSEO";

const Resume = () => {
  const { data: files, isLoading } = useResumeFiles();
  const { data: settings } = useSiteSettings();
  const [previewFile, setPreviewFile] = useState<{ url: string; name: string } | null>(null);

  usePageSEO({
    title: "Resume & CV",
    description: settings?.full_name
      ? `Download the resume and CV of ${settings.full_name}.`
      : "Resume and CV documents.",
  });

  if (isLoading) return <PageSkeleton />;

  const resumeFile = files?.find((f) => f.file_type === "resume");
  const cvFile = files?.find((f) => f.file_type === "cv");
  const allFiles = [resumeFile, cvFile].filter(Boolean);

  return (
    <>
      <section className="bg-secondary text-secondary-foreground">
        <div className="page-section pt-24 md:pt-32 pb-16">
          <div className="max-w-3xl">
            <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">Documents</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary-foreground leading-tight mb-6">
              Resume & CV
            </h1>
            <p className="text-xl text-secondary-foreground/80 font-body">
              Download my resume or CV to learn more about my qualifications and experience.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section">
        {allFiles.length > 0 ? (
          <div className={`grid gap-8 ${allFiles.length === 1 ? "max-w-2xl mx-auto" : "md:grid-cols-2"}`}>
            {allFiles.map((file) => {
              if (!file) return null;
              const label = file.file_type === "resume" ? "Resume" : "CV";
              return (
                <AnimatedSection key={file.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-8 text-center">
                      <FileText className="text-primary mx-auto mb-4" size={56} />
                      <h2 className="font-display text-2xl font-semibold text-foreground mb-2">{label}</h2>
                      <p className="text-muted-foreground mb-6 text-sm">{file.file_name}</p>
                      <div className="flex gap-3 justify-center">
                        {file.file_url.endsWith(".pdf") && (
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setPreviewFile({ url: file.file_url, name: label })}
                          >
                            <Eye size={18} /> Preview
                          </Button>
                        )}
                        <Button asChild size="lg">
                          <a href={file.file_url} download>
                            <Download size={18} /> Download
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        ) : (
          <AnimatedSection>
            <div className="text-center py-16">
              <FileText className="text-muted-foreground mx-auto mb-4" size={48} />
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">No Documents Yet</h2>
              <p className="text-muted-foreground">
                Resume and CV will appear here once uploaded via the admin setup page.
              </p>
            </div>
          </AnimatedSection>
        )}
      </section>

      <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-2 flex-shrink-0">
            <DialogTitle>{previewFile?.name} Preview</DialogTitle>
          </DialogHeader>
          <div
            className="flex-1 overflow-hidden px-6 pb-6"
            style={{ userSelect: "none" }}
            onCopy={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
          >
            {previewFile && (
              <iframe
                src={`${previewFile.url}#toolbar=0&navpanes=0`}
                className="w-full h-full rounded-lg border border-border"
                title={`${previewFile.name} Preview`}
                style={{ pointerEvents: "auto" }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Resume;
