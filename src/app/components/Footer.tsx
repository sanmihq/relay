import { appConfig } from "@/config/appConfig";
import Link from "next/link";
import React from "react";

type SocialLink = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

export default function Footer() {
  const socialLinks: SocialLink[] = appConfig.links;

  return (
    <footer>
      <div className="px-4 py-8 text-center">
        <p className="mb-2 text-sm">
          Developed by{" "}
          <span className="underline text-[#7333fa]">
            <Link
              href={
                appConfig.links.find((link) => link.label === "GitHub")?.href ??
                "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              sanmihq
            </Link>
          </span>
        </p>
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                href={link.href}
                className="flex items-center gap-2 text-sm transition-colors hover:text-[#7333fa]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={16} />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
