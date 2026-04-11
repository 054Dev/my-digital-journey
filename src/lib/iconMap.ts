import {
  Github, Linkedin, Twitter, Mail, MapPin, Globe, Heart, Star,
  TreePine, Users, Camera, Music, Paintbrush, Code, Terminal,
  GraduationCap, Award, BookOpen, Rocket, Briefcase,
  MessageCircle, Phone, Instagram, Youtube, Facebook,
  ExternalLink, type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Github, Linkedin, Twitter, Mail, MapPin, Globe, Heart, Star,
  TreePine, Users, Camera, Music, Paintbrush, Code, Terminal,
  GraduationCap, Award, BookOpen, Rocket, Briefcase,
  MessageCircle, Phone, Instagram, Youtube, Facebook,
  ExternalLink,
};

export const getIcon = (name: string): LucideIcon => iconMap[name] || Globe;

export const iconNames = Object.keys(iconMap);
