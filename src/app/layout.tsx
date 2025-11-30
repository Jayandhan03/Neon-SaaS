import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/footer/Footer";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Superhuman Aurora SaaS",
  description: "A pastel-aurora inspired SaaS experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        className={`
          ${inter.variable}
          font-body antialiased
          relative overflow-x-hidden
        `}
      >
        {/* Aurora Gradient Background */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-hero"></div>

        {/* Subtle iOS Glow Overlay */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,hsl(260_90%_90%_/_0.3),transparent_70%)]"></div>

        {/* Theme Provider */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          {/* Header */}
          <Header />

          {/* Floating Theme Toggle Button */}
          <div className="fixed top-4 right-4 z-50 backdrop-blur-lg bg-white/20 dark:bg-white/10 p-2 rounded-full shadow-lg ring-1 ring-white/30">
            <ThemeToggle />
          </div>

          {/* Main Content */}
          <main className="flex-1 pt-20 pb-20">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Toaster Notifications */}
          <Toaster />

        </ThemeProvider>
      </body>
    </html>
  );
}
