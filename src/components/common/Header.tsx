"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { Cpu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isScrolled) {
      controls.start({
        backgroundColor: "hsla(var(--background) / 0.8)",
        backdropFilter: "blur(8px)",
        borderColor: "hsla(var(--border) / 0.5)",
      });
    } else {
      controls.start({
        backgroundColor: "hsla(var(--background) / 0)",
        backdropFilter: "blur(0px)",
        borderColor: "hsla(var(--border) / 0)",
      });
    }
  }, [isScrolled, controls]);

  return (
    <motion.header
      animate={controls}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 border-b"
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <Cpu className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold">Neon SaaS</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link
          href="#features"
          className="text-foreground/80 hover:text-foreground transition-colors"
        >
          Features
        </Link>
        <Link
          href="#workflow"
          className="text-foreground/80 hover:text-foreground transition-colors"
        >
          Workflow
        </Link>
        <Link
          href="#pricing"
          className="text-foreground/80 hover:text-foreground transition-colors"
        >
          Pricing
        </Link>
      </nav>
      <div className="w-[115px]"></div>
    </motion.header>
  );
}
