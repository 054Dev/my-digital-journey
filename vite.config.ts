import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const siteUrl = "https://duncanndegwa.lovable.app";
const staticRoutes = ["/", "/childhood", "/education", "/skills", "/aspirations", "/resume", "/contact"];
const routeHtml = {
  "/": {
    title: "Duncan Ndegwa — Software Engineer | Dancon Software",
    description: "Duncan Ndegwa, also known as Dancon, is a software engineer building React, TypeScript, and full stack web apps in Kenya.",
  },
  "/childhood": {
    title: "Duncan Ndegwa Story & Background | Dancon Software",
    description: "Learn about Duncan Ndegwa's background, values, and formative story behind the Dancon Software portfolio.",
  },
  "/education": {
    title: "Duncan Ndegwa Education & Software Engineering Training",
    description: "Explore Duncan Ndegwa's education, academic journey, achievements, and software engineering training.",
  },
  "/skills": {
    title: "Duncan Ndegwa Skills, Projects & React Developer Portfolio",
    description: "View Duncan Ndegwa's software engineering skills, React projects, TypeScript work, web development portfolio, and Dancon Software projects.",
  },
  "/aspirations": {
    title: "Duncan Ndegwa Career Goals & Software Engineering Aspirations",
    description: "Discover Duncan Ndegwa's software engineering aspirations, career goals, technology vision, and future plans for Dancon Software.",
  },
  "/resume": {
    title: "Duncan Ndegwa Resume & CV | Software Engineer",
    description: "Download or preview Duncan Ndegwa's software engineer resume and CV, including skills, education, projects, and experience.",
  },
  "/contact": {
    title: "Contact Duncan Ndegwa | Dancon Software",
    description: "Contact Duncan Ndegwa, Dancon Software, for software engineering, web development, React, and full stack collaboration opportunities.",
  },
} as const;

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const seoPrerenderPlugin = () => ({
  name: "seo-prerender-routes",
  generateBundle(_: unknown, bundle: Record<string, { type: string; source?: string }>) {
    const htmlAsset = bundle["index.html"];
    if (!htmlAsset || htmlAsset.type !== "asset" || typeof htmlAsset.source !== "string") return;

    staticRoutes.forEach((route) => {
      const meta = routeHtml[route as keyof typeof routeHtml];
      const canonical = `${siteUrl}${route === "/" ? "/" : route}`;
      const html = htmlAsset.source
        .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
        .replace(/<meta name="description" content=".*?"\s*\/?\>/, `<meta name="description" content="${escapeHtml(meta.description)}" />`)
        .replace(/<link rel="canonical" href=".*?"\s*\/?\>/, `<link rel="canonical" href="${canonical}" />`)
        .replace(/<meta property="og:url" content=".*?"\s*\/?\>/, `<meta property="og:url" content="${canonical}" />`)
        .replace(/<meta property="og:title" content=".*?"\s*\/?\>/, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`)
        .replace(/<meta property="og:description" content=".*?"\s*\/?\>/, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`)
        .replace(/<meta name="twitter:title" content=".*?"\s*\/?\>/, `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`)
        .replace(/<meta name="twitter:description" content=".*?"\s*\/?\>/, `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);

      this.emitFile({
        type: "asset",
        fileName: route === "/" ? "index.html" : `${route.slice(1)}/index.html`,
        source: html,
      });
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), seoPrerenderPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
