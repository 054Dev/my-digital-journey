import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { useAspirations, useSiteSettings, useSiteImages } from "@/hooks/usePortfolioData";
import { getIcon } from "@/lib/iconMap";
import { PageSkeleton } from "@/components/LoadingSkeleton";
import { usePageSEO } from "@/hooks/usePageSEO";

const statusColors: Record<string, string> = {
  "In Progress": "bg-primary/15 text-primary border border-primary/30",
  "Planning": "bg-muted text-foreground border border-border",
  "Dream": "bg-muted text-muted-foreground border border-border",
  "Future": "bg-muted text-muted-foreground border border-border",
  "Active": "bg-primary/15 text-primary border border-primary/30",
  "Ongoing": "bg-muted text-muted-foreground border border-border",
};

const Aspirations = () => {
  const { data: goals, isLoading } = useAspirations();
  const { data: settings, isLoading: loadingSettings } = useSiteSettings();
  const { data: images } = useSiteImages();

  usePageSEO({
    title: "Aspirations",
    description: settings?.full_name
      ? `Future goals, dreams and aspirations of ${settings.full_name}.`
      : "Future aspirations and career goals.",
  });

  if (isLoading || loadingSettings) return <PageSkeleton />;

  const heroImg = images?.find(i => i.image_key === "hero-aspirations");

  return (
    <>
      {heroImg?.url ? (
        <PageHero image={heroImg.url} title="Future Aspirations" subtitle="Where I'm headed — the dreams, goals, and ambitions that fuel my journey forward." alt="Sunrise horizon" />
      ) : (
        <section className="bg-card border-b border-border">
          <div className="page-section pt-24 md:pt-32 pb-16">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-mono mb-3">
              <span className="text-muted-foreground">//</span> Looking Ahead
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground leading-tight tracking-tight">Future Aspirations</h1>
          </div>
        </section>
      )}

      <section className="page-section">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-mono mb-3">
              <span className="text-muted-foreground">//</span> My Vision
            </div>
            {settings?.vision_title && (
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-8 tracking-tight">
                {settings.vision_title.split(",")[0]},{" "}
                <span className="text-primary neon-text">{settings.vision_title.split(",").slice(1).join(",")}</span>
              </h2>
            )}
            <p className="body-text">{settings?.vision_text || ""}</p>
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-card/50 border-y border-border/50">
        <div className="page-section">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-primary text-sm font-mono mb-3">
              <span className="text-muted-foreground">//</span> Roadmap
            </div>
            <h2 className="section-title">Goals & Milestones</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {goals?.map((goal, index) => {
              const Icon = getIcon(goal.icon_name);
              return (
                <AnimatedSection key={goal.id} delay={index * 0.1}>
                  <motion.div className="skill-card h-full" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-primary/10 border border-primary/20 rounded-xl p-3"><Icon className="text-primary" size={24} /></div>
                      <span className={`text-xs font-mono font-medium px-3 py-1 rounded-full ${statusColors[goal.status] || "bg-muted text-muted-foreground border border-border"}`}>{goal.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono mb-1">{goal.timeline}</p>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{goal.title}</h3>
                    <p className="body-text text-base">{goal.description}</p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {settings?.aspirations_quote && (
        <section
          className="page-section text-center relative"
          style={{
            backgroundImage: images?.find(i => i.image_key === "bg-quote-aspirations")?.url
              ? `url(${images.find(i => i.image_key === "bg-quote-aspirations")?.url})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {images?.find(i => i.image_key === "bg-quote-aspirations")?.url && (
            <div className="absolute inset-0 bg-background/85 dark:bg-background/90" />
          )}
          <AnimatedSection>
            <div className="relative z-10">
              <blockquote className="font-display text-2xl md:text-4xl font-bold text-foreground italic max-w-3xl mx-auto leading-relaxed">
                "<span className="text-primary">{settings.aspirations_quote}</span>"
              </blockquote>
              {settings.aspirations_quote_author && (
                <p className="mt-6 text-muted-foreground font-mono text-sm">— {settings.aspirations_quote_author}</p>
              )}
            </div>
          </AnimatedSection>
        </section>
      )}
    </>
  );
};

export default Aspirations;
