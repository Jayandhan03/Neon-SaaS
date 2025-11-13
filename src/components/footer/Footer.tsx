import Link from "next/link";
import { Cpu, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Cpu className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Neon SaaS</span>
            </Link>
            <p className="text-sm text-foreground/70">
              The future of SaaS, today.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Github">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-sm text-foreground/70 hover:text-foreground">Features</Link></li>
              <li><Link href="#workflow" className="text-sm text-foreground/70 hover:text-foreground">Workflow</Link></li>
              <li><Link href="#pricing" className="text-sm text-foreground/70 hover:text-foreground">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground">About Us</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground">Careers</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/50 pt-8 text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Neon SaaS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
