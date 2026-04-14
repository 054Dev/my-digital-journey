import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download, Sun, Moon, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteSettings, useResumeFiles } from "@/hooks/usePortfolioData";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/hooks/useTheme";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/childhood", label: "Childhood" },
  { path: "/education", label: "Education" },
  { path: "/skills", label: "Skills" },
  { path: "/aspirations", label: "Aspirations" },
  { path: "/resume", label: "Resume" },
  { path: "/contact", label: "Contact" },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: settings, isLoading: loadingSettings } = useSiteSettings();
  const { data: resumeFiles } = useResumeFiles();
  const { theme, toggleTheme } = useTheme();

  const name = settings?.full_name || "";
  const tagline = settings?.tagline || "";
  const resumeFile = resumeFiles?.find(f => f.file_type === "resume");
  const cvFile = resumeFiles?.find(f => f.file_type === "cv");
  const downloadFile = resumeFile || cvFile;

  if (location.pathname === "/setup") return <>{children}</>;

  return (
    <div className="min-h-screen bg-background relative">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
        <nav className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground tracking-tight group">
            <Terminal size={20} className="text-primary group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)] transition-all" />
            {loadingSettings ? <Skeleton className="h-6 w-32" /> : <span>{name}</span>}
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className={`nav-link text-foreground/60 hover:text-foreground ${location.pathname === item.path ? "active text-primary" : ""}`}>
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-muted hover:bg-accent text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            {downloadFile && (
              <a href={downloadFile.file_url} download className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)]">
                <Download size={14} /> CV
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-muted text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-foreground p-2" aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden">
              <div className="px-6 py-4 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)} className={`nav-link text-foreground/60 hover:text-foreground py-2 ${location.pathname === item.path ? "active text-primary" : ""}`}>
                    {item.label}
                  </Link>
                ))}
                {downloadFile && (
                  <a href={downloadFile.file_url} download className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
                    <Download size={14} /> Download CV
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16 relative z-10">
        <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          {children}
        </motion.div>
      </main>

      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              {loadingSettings ? (
                <>
                  <Skeleton className="h-5 w-40 mb-2" />
                  <Skeleton className="h-4 w-56" />
                </>
              ) : (
                <>
                  <p className="font-display text-lg font-bold text-foreground">{name}</p>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">{tagline}</p>
                </>
              )}
            </div>
            <div className="flex gap-6 flex-wrap justify-center">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">{item.label}</Link>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border/50 text-center">
            <p className="text-sm text-muted-foreground font-mono">© {new Date().getFullYear()} {name} <span className="text-primary">// </span>Crafted with passion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
