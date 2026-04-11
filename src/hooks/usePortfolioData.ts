import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteSettings = () =>
  useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).single();
      if (error) throw error;
      return data;
    },
  });

export const useSocialLinks = () =>
  useQuery({
    queryKey: ["social_links"],
    queryFn: async () => {
      const { data, error } = await supabase.from("social_links").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

export const useSkillsTechnical = () =>
  useQuery({
    queryKey: ["skills_technical"],
    queryFn: async () => {
      const { data, error } = await supabase.from("skills_technical").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

export const useSkillsCreative = () =>
  useQuery({
    queryKey: ["skills_creative"],
    queryFn: async () => {
      const { data, error } = await supabase.from("skills_creative").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

export const useEducationEntries = () =>
  useQuery({
    queryKey: ["education_entries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("education_entries").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

export const useEducationAchievements = () =>
  useQuery({
    queryKey: ["education_achievements"],
    queryFn: async () => {
      const { data, error } = await supabase.from("education_achievements").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

export const useEducationActivities = () =>
  useQuery({
    queryKey: ["education_activities"],
    queryFn: async () => {
      const { data, error } = await supabase.from("education_activities").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

export const useChildhoodEvents = () =>
  useQuery({
    queryKey: ["childhood_events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("childhood_events").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

export const useAspirations = () =>
  useQuery({
    queryKey: ["aspirations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("aspirations").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

export const useContactInfo = () =>
  useQuery({
    queryKey: ["contact_info"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_info").select("*").limit(1).single();
      if (error) throw error;
      return data;
    },
  });

export const useSiteImages = () =>
  useQuery({
    queryKey: ["site_images"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_images").select("*");
      if (error) throw error;
      return data;
    },
  });

export const useResumeFiles = () =>
  useQuery({
    queryKey: ["resume_files"],
    queryFn: async () => {
      const { data, error } = await supabase.from("resume_files").select("*");
      if (error) throw error;
      return data;
    },
  });
