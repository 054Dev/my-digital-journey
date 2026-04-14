import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { Code, Terminal, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useSkillsTechnical, useSkillsCreative, useProjects, useSiteImages, useSiteSettings } from "@/hooks/usePortfolioData";
import { getIcon } from "@/lib/iconMap";
import { PageSkeleton } from "@/components/LoadingSkeleton";
import { usePageSEO } from "@/hooks/usePageSEO";

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="font-body font-medium text-foreground">{name}</span>
      <span className="font-mono text-sm text-primary">{level}%</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--neon-cyan)))" }}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      />
    </div>
  </div>
);

const Skills = () => {
  const { data: techSkills, isLoading } = useSkillsTechnical();
  const { data: creativeSkills } = useSkillsCreative();
  const { data: projects } = useProjects();
  const { data: images } = useSiteImages();
  const { data: settings } = useSiteSettings();

  usePageSEO({
    title: "Skills & Projects",
    description: settings?.full_name
      ? `Technical skills, projects and creative pursuits of ${settings.full_name}.`
      : "Skills, projects and creative work.",
  });

  if (isLoading) return <PageSkeleton />;

  const heroImg = images?.find(i => i.image_key === "hero-skills");

  return (
    <>
      {heroImg?.url ? (
        <PageHero image={heroImg.url} title="Skills & Talents" subtitle="From coding to creating — the diverse skills that define my toolkit." alt="Creative workspace" />
      ) : (
        <section className="bg-card border-b border-border">
          <div className="page-section pt-24 md:pt-32 pb-16">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-mono mb-3">
              <span className="text-muted-foreground">//</span> Toolkit
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground leading-tight tracking-tight">Skills & Talents</h1>
          </div>
        </section>
      )}

      <section className="page-section">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="text-primary" size={24} />
              <p className="font-mono text-primary uppercase tracking-[0.2em] text-sm">Technical</p>
            </div>
            <h2 className="section-title">Hard Skills</h2>
            {techSkills?.map((skill) => <SkillBar key={skill.id} name={skill.name} level={skill.level} />)}
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <Code className="text-primary" size={24} />
              <p className="font-mono text-primary uppercase tracking-[0.2em] text-sm">Projects</p>
            </div>
            <h2 className="section-title">Featured Work</h2>
            <div className="space-y-6">
              {projects?.map((project, index) => (
                <motion.div key={project.id} className="skill-card" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15, duration: 0.5 }}>
                  {project.image_url && <img src={project.image_url} alt={project.title} className="w-full h-32 object-cover rounded-lg mb-3" loading="lazy" />}
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">{project.title}</h3>
                  <p className="text-sm text-primary font-mono font-medium mb-3">{project.tech_stack}</p>
                  <p className="text-muted-foreground font-body">{project.description}</p>
                  <div className="flex gap-3 mt-3">
                    {project.live_demo_link && (
                      <a href={project.live_demo_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-mono">
                        <ExternalLink size={14} /> demo
                      </a>
                    )}
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-mono">
                        <Github size={14} /> source
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {creativeSkills && creativeSkills.length > 0 && (
        <section className="bg-card/50 border-y border-border/50">
          <div className="page-section">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 text-primary text-sm font-mono mb-3 justify-center w-full">
                <span className="text-muted-foreground">//</span> Beyond Code
              </div>
              <h2 className="section-title text-center">Creative Pursuits</h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              {creativeSkills.map((skill, index) => {
                const Icon = getIcon(skill.icon_name);
                return (
                  <AnimatedSection key={skill.id} delay={index * 0.1}>
                    <div className="skill-card h-full flex gap-5">
                      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 h-fit shrink-0"><Icon className="text-primary" size={24} /></div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-2">{skill.title}</h3>
                        <p className="body-text text-base">{skill.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Skills;
