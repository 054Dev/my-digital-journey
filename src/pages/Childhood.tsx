import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { useChildhoodEvents, useSiteSettings, useSiteImages } from "@/hooks/usePortfolioData";
import { getIcon } from "@/lib/iconMap";
import { PageSkeleton } from "@/components/LoadingSkeleton";
import { usePageSEO } from "@/hooks/usePageSEO";

const Childhood = () => {
  const { data: events, isLoading: loadingEvents } = useChildhoodEvents();
  const { data: settings, isLoading: loadingSettings } = useSiteSettings();
  const { data: images } = useSiteImages();

  usePageSEO({
    title: "Childhood",
    description: settings?.full_name
      ? `Discover the childhood and formative years of ${settings.full_name}.`
      : "Childhood memories and formative experiences.",
  });

  if (loadingEvents || loadingSettings) return <PageSkeleton />;

  const heroImg = images?.find(i => i.image_key === "hero-childhood");

  return (
    <>
      {heroImg?.url ? (
        <PageHero image={heroImg.url} title="My Childhood" subtitle="The formative years that shaped who I am." alt={heroImg.alt_text || "Childhood memories"} />
      ) : (
        <section className="bg-card border-b border-border">
          <div className="page-section pt-24 md:pt-32 pb-16">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-mono mb-3">
              <span className="text-muted-foreground">//</span> Looking Back
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground leading-tight tracking-tight">My Childhood</h1>
          </div>
        </section>
      )}

      <section className="page-section">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 text-primary text-sm font-mono mb-3">
            <span className="text-muted-foreground">//</span> Looking Back
          </div>
          <h2 className="section-title">Moments That Shaped Me</h2>
        </AnimatedSection>
        <div className="relative mt-16">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.3), hsl(var(--neon-cyan) / 0.1))" }} />
          {events?.map((memory, index) => {
            const Icon = getIcon(memory.icon_name);
            return (
              <AnimatedSection
                key={memory.id}
                delay={index * 0.15}
                className={`relative flex flex-col md:flex-row gap-8 mb-16 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 border-4 border-background z-10 shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
                <div className={`md:w-1/2 pl-14 md:pl-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <span className="inline-block bg-primary/10 border border-primary/20 text-primary font-mono font-semibold text-sm px-3 py-1 rounded-full mb-3">{memory.year}</span>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">{memory.title}</h3>
                  <p className="body-text">{memory.description}</p>
                </div>
                <div className={`hidden md:flex md:w-1/2 items-start ${index % 2 === 0 ? "pl-16" : "pr-16 justify-end"}`}>
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-6"><Icon className="text-primary" size={32} /></div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      <section className="bg-card/50 border-y border-border/50">
        <div className="page-section">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="section-title">Family & Values</h2>
              <p className="body-text mb-8">{settings?.family_text || ""}</p>
              <div className="grid grid-cols-3 gap-8 mt-12">
                {settings?.value_1 && (
                  <div>
                    <p className="font-display text-3xl font-extrabold text-primary neon-text">{settings.value_1}</p>
                    <p className="text-sm text-muted-foreground mt-2 font-mono">{settings.value_1_sub || ""}</p>
                  </div>
                )}
                {settings?.value_2 && (
                  <div>
                    <p className="font-display text-3xl font-extrabold text-primary neon-text">{settings.value_2}</p>
                    <p className="text-sm text-muted-foreground mt-2 font-mono">{settings.value_2_sub || ""}</p>
                  </div>
                )}
                {settings?.value_3 && (
                  <div>
                    <p className="font-display text-3xl font-extrabold text-primary neon-text">{settings.value_3}</p>
                    <p className="text-sm text-muted-foreground mt-2 font-mono">{settings.value_3_sub || ""}</p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Childhood;
