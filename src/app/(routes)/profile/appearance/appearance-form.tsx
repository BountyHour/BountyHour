"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { useTheme } from "next-themes";

function ThemeOption({
  theme,
  currentTheme,
  previewTheme,
  text,
  onClick,
}: {
  theme: string;
  currentTheme: string | undefined;
  previewTheme: string | undefined;
  text: string;
  onClick: (theme: string) => void;
}) {
  const background = previewTheme === "dark" ? "bg-slate-950" : "bg-[#ecedef]";
  const area = previewTheme === "dark" ? "bg-slate-800" : "bg-white";
  const foreground = previewTheme === "dark" ? "bg-slate-400" : "bg-[#ecedef]";

  return (
    <div
      onClick={() => onClick(theme)}
      className={cn(
        "items-center rounded-md border-2 bg-popover p-1 hover:bg-accent hover:text-accent-foreground",
        currentTheme === theme ? "border-primary" : "border-muted",
      )}
    >
      <div className={`space-y-2 rounded-sm ${background} p-2`}>
        <div
          className={`flex items-center space-y-2 rounded-md ${area} p-2 shadow-sm`}
        >
          <div className={`h-2 w-[200px] rounded-lg ${foreground}`} />
        </div>
        <div
          className={`flex items-center space-x-2 rounded-md ${area} p-2 shadow-sm`}
        >
          <div className={`h-4 w-4 rounded-full ${foreground}`} />
          <div className={`h-2 w-[100px] rounded-lg ${foreground}`} />
        </div>
        <div
          className={`flex items-center space-x-2 rounded-md ${area} p-2 shadow-sm`}
        >
          <div className={`h-4 w-4 rounded-full ${foreground}`} />
          <div className={`h-2 w-[100px] rounded-lg ${foreground}`} />
        </div>
      </div>
      <span className="block w-full p-2 text-center font-normal">{text}</span>
    </div>
  );
}

export function AppearanceForm() {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <form className="grid grid-cols-1 gap-8 pt-2 sm:grid-cols-3 ">
        <ThemeOption
          theme="system"
          currentTheme={theme}
          previewTheme={systemTheme}
          text={`System (${theme}, default)`}
          onClick={setTheme}
        />
        <ThemeOption
          theme="light"
          currentTheme={theme}
          previewTheme="light"
          text="Light"
          onClick={setTheme}
        />
        <ThemeOption
          theme="dark"
          currentTheme={theme}
          previewTheme="dark"
          text="Dark"
          onClick={setTheme}
        />
      </form>
    </>
  );
}
