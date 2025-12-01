"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { Cpu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Superhuman glass navbar animation
  useEffect(() => {
    controls.start({
      backgroundColor: isScrolled
        ? "hsla(var(--background) / 0.55)"
        : "hsla(var(--background) / 0)",
      backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
      borderColor: isScrolled
        ? "hsl(230 60% 85% / 0.35)"
        : "hsl(230 60% 85% / 0)",
    });
  }, [isScrolled, controls]);

  return (
    <motion.header
      animate={controls}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "px-6 py-4 border-b",
        "flex items-center justify-between",
        "backdrop-blur-2xl bg-transparent"
      )}
    >
      {/* LEFT: Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Cpu className="h-8 w-8 text-primary" />
        <span className="text-xl font-semibold tracking-tight text-foreground">
          Neon SaaS
        </span>
      </Link>

      {/* CENTER: Nav Items */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        {[
          { href: "/#features", label: "Features" },
          { href: "/#workflow", label: "Workflow" },
          { href: "/reporter", label: "Reporter" },
          { href: "/visualizer", label: "Visualizer" },
          // --- ADDED CHAT AGENT LINK HERE ---
          { href: "/chat", label: "Chat Agent" }, 
          { href: "/#pricing", label: "Pricing" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-foreground/80 hover:text-foreground transition-colors duration-200 hover:opacity-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* RIGHT: Login + Button + Theme */}
      <div className="hidden md:flex items-center gap-4">

        {/* Login */}
        <Button
          variant="ghost"
          className="text-foreground/80 hover:text-foreground hover:bg-secondary/40 transition-all rounded-full px-5"
        >
          Login
        </Button>

        {/* Get Started — Superhuman style gradient */}
        <Button
          className="
            rounded-full px-6 py-2 font-semibold
            bg-gradient-to-tr from-primary to-accent
            text-primary-foreground shadow-md
            hover:opacity-90 transition
          "
        >
          Get Started
        </Button>

        {/* Theme Toggle (pastel glass circle) */}
        <div
          className="
            p-2 rounded-full ml-2
            backdrop-blur-xl bg-white/20 dark:bg-white/10
            shadow-md ring-1 ring-white/30
          "
        >
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}