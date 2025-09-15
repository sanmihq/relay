import { appConfig } from "@/config/appConfig";
import React from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Header() {
  return (
    <header>
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <span className="text-xl font-bold">{appConfig.name}</span>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
