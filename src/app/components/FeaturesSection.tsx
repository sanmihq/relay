"use client";

import { MonitorSmartphone, ShieldCheck, Zap } from "lucide-react";
import fonts from "@/fonts/fonts";
import { Icon } from "./Icon";

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Real-time Sync",
      description:
        "Instantly share text, links, and code snippets across all your devices without missing a beat.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Private",
      description:
        "Create private rooms with optional password protection. Your data is yours alone.",
    },
    {
      icon: MonitorSmartphone,
      title: "Cross-Device Access",
      description:
        "Access your shared clipboard from your phone, tablet, or computer. All you need is a browser.",
    },
  ];

  return (
    <section>
      <div className="mx-auto mt-16 flex max-w-5xl flex-col items-center justify-center gap-8 md:flex-row md:items-stretch">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex flex-1 flex-col items-start gap-2 rounded border border-gray-200 p-6 text-start dark:border-gray-800 dark:bg-[#090f20]"
          >
            <div className="mb-2 flex size-10 items-center justify-center rounded-full dark:bg-[#151737]">
              <Icon icon={f.icon} size={24} strokeWidth={1.7} color="#6e4adb" />
            </div>
            <h3 className="text-md font-semibold">{f.title}</h3>
            <p className="text-sm text-black/70 dark:text-white/70">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
