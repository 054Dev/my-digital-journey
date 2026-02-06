import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import childhoodImage from "@/assets/childhood-memory.jpg";
import { Heart, TreePine, Users, Star } from "lucide-react";

const memories = [
  {
    year: "2005",
    title: "First Adventures",
    description:
      "Growing up in a cozy neighborhood in Portland, Oregon, my earliest memories are of building blanket forts with my sister and exploring the creek behind our house. Every day was a new adventure waiting to unfold.",
    icon: TreePine,
  },
  {
    year: "2008",
    title: "The Curious Tinkerer",
    description:
      "I took apart my first radio at age 7 — much to my parents' dismay! But that spark of curiosity about how things work would define my path forward. My dad taught me to solder, and together we built a simple AM radio.",
    icon: Star,
  },
  {
    year: "2010",
    title: "Family Road Trips",
    description:
      "Summer road trips with the family became a treasured tradition. From the Grand Canyon to Yellowstone, these journeys taught me to appreciate the vastness of the world and the closeness of family bonds.",
    icon: Users,
  },
  {
    year: "2012",
    title: "Discovering My Passion",
    description:
      "At age 11, I attended a coding workshop at the local library. Writing my first 'Hello World' program felt like magic. I spent that entire summer learning Scratch and building simple games for my friends.",
    icon: Heart,
  },
  {
    year: "2014",
    title: "Growing Through Challenges",
    description:
      "Moving to a new city taught me resilience. Making new friends, adapting to a bigger school, and joining the robotics club helped me grow from a shy kid into someone who embraces change and new opportunities.",
    icon: Star,
  },
];

const Childhood = () => {
  return (
    <>
      <PageHero
        image={childhoodImage}
        title="My Childhood"
        subtitle="The formative years that shaped who I am — from backyard adventures to discovering my first passion."
        alt="Nostalgic childhood backyard scene with treehouse"
      />

      {/* Timeline */}
      <section className="page-section">
        <AnimatedSection>
          <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">
            Looking Back
          </p>
          <h2 className="section-title">Moments That Shaped Me</h2>
        </AnimatedSection>

        <div className="relative mt-16">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          {memories.map((memory, index) => (
            <AnimatedSection
              key={memory.year}
              delay={index * 0.15}
              className={`relative flex flex-col md:flex-row gap-8 mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 border-4 border-background z-10" />

              {/* Content */}
              <div className={`md:w-1/2 pl-14 md:pl-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <span className="inline-block bg-primary/10 text-primary font-body font-semibold text-sm px-3 py-1 rounded-full mb-3">
                  {memory.year}
                </span>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  {memory.title}
                </h3>
                <p className="body-text">{memory.description}</p>
              </div>

              {/* Icon side */}
              <div className={`hidden md:flex md:w-1/2 items-start ${index % 2 === 0 ? "pl-16" : "pr-16 justify-end"}`}>
                <div className="bg-accent rounded-xl p-6">
                  <memory.icon className="text-primary" size={32} />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Family Values */}
      <section className="bg-card border-y border-border">
        <div className="page-section">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="section-title">Family & Values</h2>
              <p className="body-text mb-8">
                My parents, Maria and David Rivera, instilled in me the values of hard work,
                kindness, and lifelong learning. My older sister, Sofia, has always been my
                biggest cheerleader and friendly rival. Together, our family taught me that
                success isn't just about achievements — it's about the love and support you
                share along the way.
              </p>
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div>
                  <p className="font-display text-3xl font-bold text-primary">Curiosity</p>
                  <p className="text-sm text-muted-foreground mt-2">Always asking "why?"</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-primary">Resilience</p>
                  <p className="text-sm text-muted-foreground mt-2">Growing through change</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-primary">Kindness</p>
                  <p className="text-sm text-muted-foreground mt-2">Putting others first</p>
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
