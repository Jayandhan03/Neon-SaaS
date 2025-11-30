import Link from "next/link";
import { Cpu, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer
      className="
        relative mt-20
        bg-white/10 dark:bg-white/5
        backdrop-blur-xl
        border-t border-white/20 dark:border-white/10
        shadow-[0_-10px_40px_rgba(0,0,0,0.06)]
      "
    >
      {/* Soft Aurora Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,rgba(180,160,255,0.18),transparent_70%)]"></div>

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Cpu className="h-8 w-8 text-accent" />
              <span className="text-2xl font-semibold tracking-tight">
                Neon SaaS
              </span>
            </Link>

            <p className="text-sm text-foreground/70 leading-relaxed max-w-xs">
              The next generation of pastel-aurora SaaS experiences.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-2">
              {[
                { Icon: Github, label: "Github" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }, i) => (
                <Button
                  key={i}
                  variant="icon-soft"
                  size="icon"
                  asChild
                  className="
                    hover:scale-105 transition-all duration-200
                    shadow-[0_4px_15px_rgba(120,90,255,0.25)]
                  "
                >
                  <a href="#" aria-label={label}>
                    <Icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-foreground/70 hover:text-accent transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#workflow"
                  className="text-sm text-foreground/70 hover:text-accent transition-colors"
                >
                  Workflow
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm text-foreground/70 hover:text-accent transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-foreground/70 hover:text-accent transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-foreground/70 hover:text-accent transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-foreground/70 hover:text-accent transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-foreground/70 hover:text-accent transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-foreground/70 hover:text-accent transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="mt-10 pt-8 text-center text-sm text-foreground/60 border-t border-white/10">
          <p>&copy; {new Date().getFullYear()} Neon SaaS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
