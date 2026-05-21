"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-800">
      {/* Decorative orange radial glow — top right */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full -translate-y-1/3 translate-x-1/3 blur-[1px]"
        style={{ background: "var(--gradient-decorative)", opacity: 0.35 }}
      />
      {/* Subtle warm glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full translate-y-1/3 -translate-x-1/3 blur-[80px]"
        style={{ background: "var(--gradient-decorative)", opacity: 0.12 }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Badge
              className="px-4 py-1.5 text-caption font-semibold border"
              style={{
                background: "rgba(239,62,35,0.12)",
                color: "#ffb875",
                borderColor: "rgba(239,62,35,0.30)",
              }}
            >
              Trusted by 500+ Industrial Companies
            </Badge>
          </motion.div>

          {/* Display size: 52px, line-height: 57px per style guide */}
          <motion.h1
            variants={itemVariants}
            className="font-bold text-white tracking-tight mb-6"
            style={{ fontSize: "52px", lineHeight: "57px" }}
          >
            Precision{" "}
            <span className="text-gradient-hero">Rotary</span>
            <br />
            Solutions
          </motion.h1>

          {/* Body: 16px, leading-standard: 24px */}
          <motion.p
            variants={itemVariants}
            className="text-body text-white/60 max-w-2xl mx-auto mb-10 font-light"
            style={{ lineHeight: "var(--line-height-standard)" }}
          >
            Rotex delivers world-class industrial rotary equipment and solutions.
            Built for performance, engineered for reliability, designed for your
            success.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="h-12 px-8 text-small font-semibold text-white shadow-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl border-0"
                style={{
                  background: "var(--gradient-orange-radial)",
                  boxShadow: "0 8px 32px rgba(239,62,35,0.35)",
                }}
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-small font-semibold text-white border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-200"
            >
              <Play className="mr-2 h-4 w-4 fill-current" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Social proof — caption: 14px */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/30"
          >
            {["ISO 9001", "40+ Years", "50+ Countries", "99.9% Uptime"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-caption font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  <span>{item}</span>
                </div>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
