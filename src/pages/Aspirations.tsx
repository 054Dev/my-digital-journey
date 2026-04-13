import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { useAspirations, useSiteSettings, useSiteImages } from "@/hooks/usePortfolioData";
import { getIcon } from "@/lib/iconMap";
import { PageSkeleton } from "@/components/LoadingSkeleton";
import { usePageSEO } from "@/hooks/usePageSEO";

const statusColors: Record<string, string> = {
  "In Progress": "bg-primary/15 text-primary",
  "Planning": "bg-accent text-accent-foreground",
  "Dream": "bg-muted text-foreground",
  "Future": "bg-muted text-muted-foreground",
  "Active": "bg-muted text-foreground",
  "Ongoing": "bg-muted text-muted-foreground",
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
      {heroImg?.url && (
        <PageHero image={heroImg.url} title="Future Aspirations" subtitle="Where I'm headed — the dreams, goals, and ambitions that fuel my journey forward." alt="Sunrise horizon" />
      )}

      <section className="page-section">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">My Vision</p>
            {settings?.vision_title && (
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-tight mb-8">
                {settings.vision_title.split(",")[0]},{" "}
                <span className="text-primary">{settings.vision_title.split(",").slice(1).join(",")}</span>
              </h2>
            )}
            <p className="body-text">{settings?.vision_text || ""}</p>
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-card border-y border-border">
        <div className="page-section">
          <AnimatedSection>
            <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">Roadmap</p>
            <h2 className="section-title">Goals & Milestones</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {goals?.map((goal, index) => {
              const Icon = getIcon(goal.icon_name);
              return (
                <AnimatedSection key={goal.id} delay={index * 0.1}>
                  <motion.div className="skill-card h-full" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-accent rounded-xl p-3"><Icon className="text-primary" size={24} /></div>
                      <span className={`text-xs font-body font-medium px-3 py-1 rounded-full ${statusColors[goal.status] || "bg-muted text-muted-foreground"}`}>{goal.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-body mb-1">{goal.timeline}</p>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">{goal.title}</h3>
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
            <div className="absolute inset-0 bg-background/80" />
          )}
          <AnimatedSection>
            <div className="relative z-10">
              <blockquote className="font-display text-2xl md:text-4xl font-medium text-foreground italic max-w-3xl mx-auto leading-relaxed">
                "{settings.aspirations_quote}"
              </blockquote>
              {settings.aspirations_quote_author && (
                <p className="mt-6 text-muted-foreground font-body">— {settings.aspirations_quote_author}</p>
              )}
            </div>
          </AnimatedSection>
        </section>
      )}
    </>
  );
};

export default Aspirations;
