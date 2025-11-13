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
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Blazing Fast",
    description: "Experience unparalleled speed and performance.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Analytics",
    description: "Gain valuable insights with our advanced analytics.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Secure",
    description: "Your data is safe with our top-tier security.",
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "Developer Friendly",
    description: "Easy-to-use API for seamless integration.",
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "Scalable",
    description: "Our infrastructure grows with your business.",
  },
  {
    icon: <Layers className="h-8 w-8 text-primary" />,
    title: "Modular",
    description: "Customize and extend with modular architecture.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Why Neon SaaS?</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Everything you need to scale your business to the next level.
          </p>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={cardVariants}>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} className="h-full">
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70">{feature.description}</p>
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
