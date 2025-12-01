"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero-clouds.mp4" type="video/mp4" />
      </video>

      {/* Overlay Gradient for iOS Look */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/10 dark:from-black/40 dark:to-black/10 backdrop-blur-[2px]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-foreground drop-shadow-sm">
          Superpowers,<br /> everywhere you work
        </h1>

        <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
          Mail, Docs, and AI that works in every app and tab.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary Button */}
          <Link href="/reporter">
            <Button className="px-8 py-6 text-lg rounded-2xl btn-glow">
              Get Superhuman <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          {/* Secondary Button - Chat with Data */}
          <Link href="/chat">
            <Button 
              variant="outline" 
              className="px-8 py-6 text-lg rounded-2xl border-2 border-foreground/10 bg-white/20 hover:bg-white/40 dark:bg-black/20 dark:hover:bg-black/40 backdrop-blur-md transition-all"
            >
              Chat with Data <MessageSquareText className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}