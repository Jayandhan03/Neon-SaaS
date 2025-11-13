"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1)_0%,transparent_50%)]" />
        <style jsx>{`
          :root {
            --primary-rgb: 125 249 255;
          }
          .dark {
             --primary-rgb: 106 13 173;
          }
          .bg-\[radial-gradient\(circle_at_center\,rgba\(var\(--primary-rgb\)\,0\.1\)_0\%\,transparent_50\%\)\] {
            background-image: radial-gradient(circle at center,rgba(var(--primary-rgb),0.2) 0%,transparent_40%);
          }
        `}</style>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="relative z-10 text-center px-4"
      >
        <motion.h1
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground from-50% to-foreground/50"
        >
          Build a better SaaS
        </motion.h1>
        <motion.p
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="mt-6 max-w-2xl mx-auto text-lg text-foreground/70"
        >
          Unleash your creativity with our revolutionary platform. The future of
          SaaS is here. Stop building, start creating.
        </motion.p>
        <motion.div variants={FADE_IN_ANIMATION_VARIANTS} className="mt-8">
          <Button size="lg">
            Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
