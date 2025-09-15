"use client";

import { Button } from "@heroui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Theme: {theme}</span>
      <Button
        isIconOnly
        size="sm"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <Icon icon={theme === "light" ? Moon : Sun} />
      </Button>
    </div>
  );
}
