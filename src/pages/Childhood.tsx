import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import childhoodImage from "@/assets/childhood-memory.jpg";
import { useChildhoodEvents, useSiteSettings, useSiteImages } from "@/hooks/usePortfolioData";
import { getIcon } from "@/lib/iconMap";
import { PageSkeleton } from "@/components/LoadingSkeleton";

const Childhood = () => {
  const { data: events, isLoading: loadingEvents } = useChildhoodEvents();
  const { data: settings } = useSiteSettings();
  const { data: images } = useSiteImages();

  if (loadingEvents) return <PageSkeleton />;

  const heroImg = images?.find(i => i.image_key === "hero-childhood");

  return (
    <>
      <PageHero
        image={heroImg?.url || childhoodImage}
        title="My Childhood"
        subtitle="The formative years that shaped who I am — from backyard adventures to discovering my first passion."
        alt={heroImg?.alt_text || "Nostalgic childhood backyard scene"}
      />

      <section className="page-section">
        <AnimatedSection>
          <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">Looking Back</p>
          <h2 className="section-title">Moments That Shaped Me</h2>
        </AnimatedSection>
        <div className="relative mt-16">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          {events?.map((memory, index) => {
            const Icon = getIcon(memory.icon_name);
            return (
              <AnimatedSection
                key={memory.id}
                delay={index * 0.15}
                className={`relative flex flex-col md:flex-row gap-8 mb-16 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 border-4 border-background z-10" />
                <div className={`md:w-1/2 pl-14 md:pl-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <span className="inline-block bg-primary/10 text-primary font-body font-semibold text-sm px-3 py-1 rounded-full mb-3">{memory.year}</span>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{memory.title}</h3>
                  <p className="body-text">{memory.description}</p>
                </div>
                <div className={`hidden md:flex md:w-1/2 items-start ${index % 2 === 0 ? "pl-16" : "pr-16 justify-end"}`}>
                  <div className="bg-accent rounded-xl p-6"><Icon className="text-primary" size={32} /></div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="page-section">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="section-title">Family & Values</h2>
              <p className="body-text mb-8">{settings?.family_text || ""}</p>
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div>
                  <p className="font-display text-3xl font-bold text-primary">{settings?.value_1 || "Curiosity"}</p>
                  <p className="text-sm text-muted-foreground mt-2">{settings?.value_1_sub || ""}</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-primary">{settings?.value_2 || "Resilience"}</p>
                  <p className="text-sm text-muted-foreground mt-2">{settings?.value_2_sub || ""}</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-primary">{settings?.value_3 || "Kindness"}</p>
                  <p className="text-sm text-muted-foreground mt-2">{settings?.value_3_sub || ""}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Childhood;
