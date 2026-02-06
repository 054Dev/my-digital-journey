import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import skillsImage from "@/assets/skills-workspace.jpg";
import { Code, Camera, Music, Paintbrush, Globe, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const technicalSkills = [
  { name: "JavaScript / TypeScript", level: 90 },
  { name: "React & Next.js", level: 85 },
  { name: "Python", level: 80 },
  { name: "Node.js & Express", level: 75 },
  { name: "SQL & Database Design", level: 70 },
  { name: "Git & DevOps", level: 72 },
];

const creativeSkills = [
  {
    icon: Camera,
    title: "Photography",
    description: "Landscape and street photography. My work has been featured in the university magazine and local exhibitions.",
  },
  {
    icon: Music,
    title: "Guitar & Music",
    description: "Self-taught guitarist for 6 years. I play acoustic, perform at open mics, and compose my own pieces.",
  },
  {
    icon: Paintbrush,
    title: "Digital Art",
    description: "Creating illustrations and UI mockups using Figma, Procreate, and Adobe Creative Suite.",
  },
  {
    icon: Globe,
    title: "Languages",
    description: "Fluent in English and Spanish. Currently learning Japanese through self-study and conversation groups.",
  },
];

const projects = [
  {
    title: "EcoTrack App",
    tech: "React Native • Node.js • MongoDB",
    description: "A mobile app helping users track their carbon footprint with personalized sustainability tips.",
  },
  {
    title: "StudyBuddy Platform",
    tech: "Next.js • PostgreSQL • WebRTC",
    description: "Real-time collaborative study platform connecting students for virtual study sessions.",
  },
  {
    title: "AI Poetry Generator",
    tech: "Python • TensorFlow • Flask",
    description: "An NLP project that generates poetry in the style of famous poets using fine-tuned language models.",
  },
];

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="font-body font-medium text-foreground">{name}</span>
      <span className="font-body text-sm text-muted-foreground">{level}%</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      />
    </div>
  </div>
);

const Skills = () => {
  return (
    <>
      <PageHero
        image={skillsImage}
        title="Skills & Talents"
        subtitle="From coding to creating — the diverse skills that define my toolkit."
        alt="Creative workspace with camera, guitar, and laptop with code"
      />

      {/* Technical Skills */}
      <section className="page-section">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="text-primary" size={24} />
              <p className="font-body text-primary uppercase tracking-[0.2em] text-sm">
                Technical
              </p>
            </div>
            <h2 className="section-title">Hard Skills</h2>
            <p className="body-text mb-8">
              My technical foundation is built on web development, with growing expertise
              in machine learning and cloud computing.
            </p>
            {technicalSkills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <Code className="text-primary" size={24} />
              <p className="font-body text-primary uppercase tracking-[0.2em] text-sm">
                Projects
              </p>
            </div>
            <h2 className="section-title">Featured Work</h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="skill-card"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-primary font-body font-medium mb-3">
                    {project.tech}
                  </p>
                  <p className="text-muted-foreground font-body">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Creative Skills */}
      <section className="bg-card border-y border-border">
        <div className="page-section">
          <AnimatedSection>
            <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3 text-center">
              Beyond Code
            </p>
            <h2 className="section-title text-center">Creative Pursuits</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-6 mt-12">
            {creativeSkills.map((skill, index) => (
              <AnimatedSection key={skill.title} delay={index * 0.1}>
                <div className="skill-card h-full flex gap-5">
                  <div className="bg-accent rounded-xl p-4 h-fit shrink-0">
                    <skill.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {skill.title}
                    </h3>
                    <p className="body-text text-base">{skill.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;
