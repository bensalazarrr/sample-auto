"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Menu, Moon, Sun } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";
import { navigation } from "@/lib/navigation";
import { Brand } from "./brand";
const subscribeTheme = (callback: () => void) => {
  window.addEventListener("theme-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("theme-change", callback);
    window.removeEventListener("storage", callback);
  };
};
const getTheme = () => document.documentElement.dataset.theme === "light";
export function Header() {
  const path = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const light = useSyncExternalStore(subscribeTheme, getTheme, () => false);
  function toggle() {
    const next = !light;
    document.documentElement.dataset.theme = next ? "light" : "dark";
    try {
      localStorage.setItem("sample-auto-theme", next ? "light" : "dark");
    } catch {}
    window.dispatchEvent(new Event("theme-change"));
  }
  return (
    <header className="header">
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([title, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {title}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <motion.button
            whileTap={reduce ? undefined : { scale: 0.92 }}
            className="icon-button"
            onClick={toggle}
            aria-label={
              light ? "Switch to dark theme" : "Switch to light theme"
            }
          >
            {light ? <Moon size={18} /> : <Sun size={18} />}
          </motion.button>
          <Link href="/contact" className="button small header-book">
            Book a Service <ArrowUpRight size={16} />
          </Link>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                className="icon-button mobile-menu"
                aria-label="Open navigation"
              >
                <Menu />
              </button>
            </DialogTrigger>
            <DialogContent className="mobile-dialog">
              <DialogTitle>Explore SAMPLE AUTO</DialogTitle>
              <DialogDescription className="sr-only">
                Main navigation
              </DialogDescription>
              <motion.nav
                initial={reduce ? false : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                aria-label="Mobile navigation"
              >
                {navigation.map(([title, href]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={path === href ? "page" : undefined}
                  >
                    {title}
                    <ArrowUpRight size={20} />
                  </Link>
                ))}
              </motion.nav>
              <Link
                className="button"
                href="/contact"
                onClick={() => setOpen(false)}
              >
                Book a Service
              </Link>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
