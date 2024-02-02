"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownAZ } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useTheme } from "next-themes";

const appearanceFormSchema = z.object({
  theme: z.enum(["system", "light", "dark"], {
    required_error: "Please select a theme.",
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AppearanceFormValues> = {};

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
  if (previewTheme === "dark") {
    return (
      <div
        onClick={() => onClick(theme)}
        className={cn(
          "items-center rounded-md border-2 bg-popover p-1 hover:bg-accent hover:text-accent-foreground",
          currentTheme === theme ? "border-primary" : "border-muted",
        )}
      >
        <div className="space-y-2 rounded-sm bg-slate-950 p-2">
          <div className="flex items-center space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
            <div className="h-2 w-[200px] rounded-lg bg-slate-400" />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
            <div className="h-4 w-4 rounded-full bg-slate-400" />
            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
            <div className="h-4 w-4 rounded-full bg-slate-400" />
            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
          </div>
        </div>
        <span className="block w-full p-2 text-center font-normal">{text}</span>
      </div>
    );
  } else {
    return (
      <div
        onClick={() => onClick(theme)}
        className={cn(
          "items-center rounded-md border-2 bg-popover p-1 hover:bg-accent hover:text-accent-foreground",
          currentTheme === theme ? "border-primary" : "border-muted",
        )}
      >
        <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
          <div className="flex items-center space-y-2 rounded-md bg-white p-2 shadow-sm">
            <div className="h-2 w-[200px] rounded-lg bg-[#ecedef]" />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
          </div>
        </div>
        <span className="block w-full p-2 text-center font-normal">{text}</span>
      </div>
    );
  }
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
      <form className="grid grid-cols-1 gap-8 pt-2 sm:grid-cols-3 sm:space-y-8">
        <ThemeOption
          theme="system"
          currentTheme={theme}
          previewTheme={systemTheme}
          text="System"
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
