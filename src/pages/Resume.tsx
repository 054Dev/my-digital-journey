import AnimatedSection from "@/components/AnimatedSection";
import { useResumeFiles } from "@/hooks/usePortfolioData";
import { PageSkeleton } from "@/components/LoadingSkeleton";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Resume = () => {
  const { data: files, isLoading } = useResumeFiles();

  if (isLoading) return <PageSkeleton />;

  const resumeFile = files?.find(f => f.file_type === "resume");
  const cvFile = files?.find(f => f.file_type === "cv");

  return (
    <>
      <section className="bg-secondary text-secondary-foreground">
        <div className="page-section pt-24 md:pt-32 pb-16">
          <div className="max-w-3xl">
            <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">Documents</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary-foreground leading-tight mb-6">Resume & CV</h1>
            <p className="text-xl text-secondary-foreground/80 font-body">Download my resume or CV to learn more about my qualifications and experience.</p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="grid md:grid-cols-2 gap-8">
          {resumeFile && (
            <AnimatedSection>
              <div className="skill-card text-center py-12">
                <FileText className="text-primary mx-auto mb-4" size={48} />
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">Resume</h2>
                <p className="text-muted-foreground mb-6">{resumeFile.file_name}</p>
                <div className="space-y-3">
                  <Button asChild size="lg">
                    <a href={resumeFile.file_url} download><Download size={18} /> Download Resume</a>
                  </Button>
                </div>
                {resumeFile.file_url.endsWith(".pdf") && (
                  <div className="mt-8 border border-border rounded-lg overflow-hidden">
                    <iframe src={resumeFile.file_url} className="w-full h-[600px]" title="Resume Preview" />
                  </div>
                )}
              </div>
            </AnimatedSection>
          )}

          {cvFile && (
            <AnimatedSection delay={0.15}>
              <div className="skill-card text-center py-12">
                <FileText className="text-primary mx-auto mb-4" size={48} />
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">CV</h2>
                <p className="text-muted-foreground mb-6">{cvFile.file_name}</p>
                <div className="space-y-3">
                  <Button asChild size="lg">
                    <a href={cvFile.file_url} download><Download size={18} /> Download CV</a>
                  </Button>
                </div>
                {cvFile.file_url.endsWith(".pdf") && (
                  <div className="mt-8 border border-border rounded-lg overflow-hidden">
                    <iframe src={cvFile.file_url} className="w-full h-[600px]" title="CV Preview" />
                  </div>
                )}
              </div>
            </AnimatedSection>
          )}
        </div>

        {!resumeFile && !cvFile && (
          <AnimatedSection>
            <div className="text-center py-16">
              <FileText className="text-muted-foreground mx-auto mb-4" size={48} />
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">No Documents Yet</h2>
              <p className="text-muted-foreground">Resume and CV will appear here once uploaded via the admin setup page.</p>
            </div>
          </AnimatedSection>
        )}
      </section>
    </>
  );
};

export default Resume;
