import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Palette, Rocket, Mail, Code2, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useSiteSettings, useSiteImages } from "@/hooks/usePortfolioData";
import { PageSkeleton } from "@/components/LoadingSkeleton";
import { usePageSEO } from "@/hooks/usePageSEO";

const journeyLinks = [
  { to: "/childhood", icon: BookOpen, title: "Childhood", description: "Where it all began — family, adventures, and formative moments." },
  { to: "/education", icon: BookOpen, title: "Education", description: "Academic milestones and the pursuit of knowledge." },
  { to: "/skills", icon: Palette, title: "Skills & Talents", description: "Coding, creativity, and everything in between." },
  { to: "/aspirations", icon: Rocket, title: "Future Aspirations", description: "Dreams and goals that drive me forward." },
  { to: "/contact", icon: Mail, title: "Get in Touch", description: "Let's connect and create something together." },
];

const Index = () => {
  const { data: settings, isLoading } = useSiteSettings();
  const { data: images } = useSiteImages();

  usePageSEO({
    title: settings?.full_name ? `${settings.full_name} — Personal Portfolio` : undefined,
    description: settings?.bio_short || "Personal portfolio showcasing life journey, skills, and aspirations.",
  });

  if (isLoading) return <PageSkeleton />;

  const heroImg = images?.find(i => i.image_key === "hero-home");
  const s = settings;

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {heroImg?.url && (
          <img
            src={heroImg.url}
            alt={`${s?.full_name || "Portfolio"} hero`}
            className="absolute inset-0 w-full h-full object-cover opacity-30 dark:opacity-20"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.06]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-mono mb-6">
              <Code2 size={14} /> <span>Welcome to my portfolio</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground leading-[1.1] mb-6 tracking-tight">
              {s?.first_name && (
                <>Hi, I'm{" "}<span className="text-primary neon-text">{s.first_name}</span><br /></>
              )}
              <span className="text-muted-foreground">{s?.full_name?.split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed mb-10">
              {s?.bio_short || ""}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/childhood" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-body font-semibold text-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)] group">
                Explore My Story <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-xl font-body font-semibold text-lg hover:border-primary/50 hover:bg-primary/5 transition-all">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-section">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-primary text-sm font-mono mb-3">
                <span className="text-muted-foreground">//</span> About Me
              </div>
              <h2 className="section-title">{s?.about_heading || ""}</h2>
              <p className="body-text mb-6">{s?.about_text_1 || ""}</p>
              <p className="body-text">{s?.about_text_2 || ""}</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 neon-border">
              <div className="space-y-6">
                {s?.stat_1_value && (
                  <div>
                    <p className="font-display text-4xl font-extrabold text-primary neon-text">{s.stat_1_value}</p>
                    <p className="text-sm text-muted-foreground mt-1 font-mono">{s.stat_1_label}</p>
                  </div>
                )}
                {s?.stat_2_value && (
                  <div className="border-t border-border pt-6">
                    <p className="font-display text-4xl font-extrabold text-primary neon-text">{s.stat_2_value}</p>
                    <p className="text-sm text-muted-foreground mt-1 font-mono">{s.stat_2_label}</p>
                  </div>
                )}
                {s?.stat_3_value && (
                  <div className="border-t border-border pt-6">
                    <p className="font-display text-4xl font-extrabold text-primary neon-text">{s.stat_3_value}</p>
                    <p className="text-sm text-muted-foreground mt-1 font-mono">{s.stat_3_label}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-card/50 border-y border-border/50">
        <div className="page-section">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-primary text-sm font-mono mb-3 justify-center w-full">
              <span className="text-muted-foreground">//</span> My Journey
            </div>
            <h2 className="section-title text-center">Explore My Life Chapters</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {journeyLinks.map((link, index) => (
              <AnimatedSection key={link.to} delay={index * 0.1}>
                <Link to={link.to} className="group skill-card flex flex-col h-full">
                  <link.icon className="text-primary mb-4" size={28} />
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{link.title}</h3>
                  <p className="text-muted-foreground text-sm flex-grow">{link.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    explore() <ChevronRight size={14} />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {s?.quote_text && (
        <section
          className="page-section text-center relative"
          style={{
            backgroundImage: images?.find(i => i.image_key === "bg-quote-home")?.url
              ? `url(${images.find(i => i.image_key === "bg-quote-home")?.url})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {images?.find(i => i.image_key === "bg-quote-home")?.url && (
            <div className="absolute inset-0 bg-background/85 dark:bg-background/90" />
          )}
          <AnimatedSection>
            <div className="relative z-10">
              <blockquote className="font-display text-2xl md:text-4xl font-bold text-foreground italic max-w-3xl mx-auto leading-relaxed">
                "<span className="text-primary">{s.quote_text}</span>"
              </blockquote>
              {s.quote_author && <p className="mt-6 text-muted-foreground font-mono text-sm">— {s.quote_author}</p>}
            </div>
          </AnimatedSection>
        </section>
      )}
    </>
  );
};

export default Index;
