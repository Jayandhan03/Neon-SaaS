"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 120 },
    },
  };

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Aurora Pastel Background */}
      <div className="absolute inset-0 -z-10 bg-hero" />

      {/* Soft Glow Layer */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,hsl(260_90%_88%_/_0.35),transparent_60%)]" />

      {/* Floating aurora highlights */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_70%)] blur-3xl -z-10" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-[radial-gradient(circle,rgba(180,140,255,0.25),transparent_70%)] blur-2xl -z-10" />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          show: {
            transition: { staggerChildren: 0.18 },
          },
        }}
        className="relative z-10 text-center px-4 max-w-3xl"
      >
        {/* Glass Highlight Behind Heading */}
        <div className="absolute inset-x-1/2 -top-10 h-40 w-[70%] -translate-x-1/2 bg-white/10 dark:bg-white/5 blur-3xl rounded-full" />

        {/* Main Heading */}
        <motion.h1
          variants={fadeIn}
          className="text-5xl md:text-7xl font-bold tracking-tight text-gradient-primary drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
        >
          Build the future of SaaS
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeIn}
          className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80 leading-relaxed"
        >
          A pastel-aurora inspired platform designed to elevate your creativity.
          Build faster, think clearer, and unleash stunning digital experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeIn}
          className="flex items-center justify-center gap-4 mt-10"
        >
          <Button variant="aurora" size="lg" className="btn-glow px-8 py-6">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button variant="glass" size="lg" className="px-8 py-6">
            Learn More
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
