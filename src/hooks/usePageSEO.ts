import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/usePortfolioData";

interface SEOOptions {
  title?: string;
  description?: string;
  path?: string;
}

export const usePageSEO = ({ title, description, path }: SEOOptions) => {
  const { data: settings } = useSiteSettings();

  useEffect(() => {
    const name = settings?.full_name || "";
    const baseTitle = name ? `${name} — Portfolio` : "Portfolio";

    document.title = title
      ? `${title} | ${name || "Portfolio"}`
      : baseTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) {
      metaDesc.setAttribute("content", description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", document.title);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", document.title);

    if (description) {
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", description);
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute("content", description);
    }
  }, [title, description, settings]);
};
