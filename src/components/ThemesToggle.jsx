import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { ArrowBigDown, Moon, Sun } from "lucide-react";
import { useAppStore } from "../lib/zustand";
import { useEffect, useState } from "react";

export default function ThemesToggle() {
  const { themes } = useAppStore();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "default"
  );

  function handleTheme(type, mode) {
    const html = document.documentElement;
    const isDark = html.dataset.theme.startsWith("dark-");

    if (mode === "theme") {
      if (isDark) {
        html.dataset.theme = `dark-${type}`;
        setTheme(`dark-${type}`);
      } else {
        html.dataset.theme = type;
        setTheme(type);
      }
    } else if (mode === "dark") {
      if (type.startsWith("dark-")) {
        html.dataset.theme = type.replace("dark-", "");
        setTheme(type.replace("dark-", ""));
      } else {
        html.dataset.theme = `dark-${type}`;
        setTheme(`dark-${type}`);
      }
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, []);

  return (
    <div className="flex gap-5 md:gap-50 md:flex-col md:items-start">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <ArrowBigDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto bg-blue-950  p-2 rounded-2xl">
          <DropdownMenuLabel className="text-neutral-50 font-extrabold ml-2.5">
            Themes
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col">
            {themes.map((el, index) => (
              <Button
                key={index}
                onClick={() => handleTheme(el, "theme")}
                className="justify-start"
                variant="ghost"
              >
                {el}
              </Button>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button size={"icon"} onClick={() => handleTheme(theme, "dark")}>
        {theme.startsWith("dark-") ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
