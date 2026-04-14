import { motion } from "framer-motion";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface PageHeroProps {
  image: string;
  title: string;
  subtitle?: string;
  alt: string;
}

const PageHero = ({ image, title, subtitle, alt }: PageHeroProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="page-hero">
      {!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <img
        src={image}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-40 dark:opacity-25" : "opacity-0"}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
      <div className="page-hero-overlay" />
      <div className="page-hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-6xl font-extrabold text-foreground leading-tight neon-text tracking-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-xl text-muted-foreground font-body max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
