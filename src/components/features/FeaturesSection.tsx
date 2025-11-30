"use client";

import { motion } from "framer-motion";
import {
  Zap,
  BarChart,
  ShieldCheck,
  Code,
  Rocket,
  Layers,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: "Blazing Fast",
    description: "Experience unparalleled speed and performance.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-accent" />,
    title: "Analytics",
    description: "Gain valuable insights with our advanced analytics.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent" />,
    title: "Secure",
    description: "Your data is safe with our top-tier security.",
  },
  {
    icon: <Code className="h-8 w-8 text-accent" />,
    title: "Developer Friendly",
    description: "Easy-to-use API for seamless integration.",
  },
  {
    icon: <Rocket className="h-8 w-8 text-accent" />,
    title: "Scalable",
    description: "Our infrastructure grows with your business.",
  },
  {
    icon: <Layers className="h-8 w-8 text-accent" />,
    title: "Modular",
    description: "Customize and extend with modular architecture.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-20 sm:py-32"
    >
      {/* Soft Section Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_top,rgba(200,170,255,0.15),transparent_70%)]" />

      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-gradient-primary text-4xl md:text-5xl font-bold">
            Why Choose Us?
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-xl mx-auto">
            Experience a beautifully crafted platform inspired by pastel aurora
            gradients and next-gen UX.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={cardVariants}>
              <motion.div
                whileHover={{ scale: 1.04, y: -6 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <Card
                  className="
                    h-full overflow-hidden
                    bg-white/20 dark:bg-white/10
                    backdrop-blur-xl
                    border border-white/30 dark:border-white/10
                    shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                    rounded-2xl
                    transition-all
                    hover:shadow-[0_12px_40px_rgba(130,100,255,0.25)]
                    hover:border-[hsl(260_80%_75%)]
                  "
                >
                  <CardHeader>
                    {/* Icon with glowing gradient bubble */}
                    <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-[hsl(260_80%_85%)] to-[hsl(220_90%_85%)] shadow-inner shadow-white/30">
                      {feature.icon}
                    </div>

                    <CardTitle className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-foreground/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
