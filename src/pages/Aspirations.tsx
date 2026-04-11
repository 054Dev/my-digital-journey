import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import aspirationsImage from "@/assets/aspirations-horizon.jpg";
import { motion } from "framer-motion";
import { useAspirations, useSiteSettings, useSiteImages } from "@/hooks/usePortfolioData";
import { getIcon } from "@/lib/iconMap";
import { PageSkeleton } from "@/components/LoadingSkeleton";

const statusColors: Record<string, string> = {
  "In Progress": "bg-primary/15 text-primary",
  "Planning": "bg-accent text-accent-foreground",
  "Dream": "bg-amber-soft text-foreground",
  "Future": "bg-muted text-muted-foreground",
  "Active": "bg-sage-soft text-foreground",
  "Ongoing": "bg-muted text-muted-foreground",
};

const Aspirations = () => {
  const { data: goals, isLoading } = useAspirations();
  const { data: settings } = useSiteSettings();
  const { data: images } = useSiteImages();

  if (isLoading) return <PageSkeleton />;

  const heroImg = images?.find(i => i.image_key === "hero-aspirations");

  return (
    <>
      <PageHero image={heroImg?.url || aspirationsImage} title="Future Aspirations" subtitle="Where I'm headed — the dreams, goals, and ambitions that fuel my journey forward." alt="Sunrise horizon" />

      <section className="page-section">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">My Vision</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-tight mb-8">
              {settings?.vision_title ? (
                <>{settings.vision_title.split(",")[0]},{" "}<span className="text-primary">{settings.vision_title.split(",").slice(1).join(",")}</span></>
              ) : "Technology should empower everyone, not just the privileged few."}
            </h2>
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

      <section className="page-section text-center">
        <AnimatedSection>
          <blockquote className="font-display text-2xl md:text-4xl font-medium text-foreground italic max-w-3xl mx-auto leading-relaxed">
            "{settings?.aspirations_quote || "The best time to plant a tree was 20 years ago. The second best time is now."}"
          </blockquote>
          <p className="mt-6 text-muted-foreground font-body">— {settings?.aspirations_quote_author || "Chinese Proverb"}</p>
        </AnimatedSection>
      </section>
    </>
  );
};

export default Aspirations;
