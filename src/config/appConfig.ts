import { Github, Linkedin, X } from "lucide-react";
export const appConfig = {
  name: "Relay",
  title: "Relay – Realtime Clipboard & Text Sync",
  url: "https://relay.vercel.app",
  ogImage: "https://relay.vercel.app/og.png",
  description:
    "Relay lets you instantly sync text across devices and people with secure, password-protected rooms. Copy, share, and collaborate in real-time with zero friction.",

  links: [
    {
      label: "X",
      href: "https://x.com/sanmi_hq",
      icon: X,
    },
    {
      label: "GitHub",
      href: "https://github.com/sanmihq/relay",
      icon: Github,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sanmihq/",
      icon: Linkedin,
    },
  ],
};

export type AppConfig = typeof appConfig;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#0a0a0a",
};
