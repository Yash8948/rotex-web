"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 bg-neutral-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto text-center rounded-3xl overflow-hidden"
          style={{ background: "var(--gradient-bright-to-dark)" }}
        >
          {/* Inner decorative glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full blur-3xl"
            style={{ background: "var(--gradient-decorative)", opacity: 0.4 }}
          />

          <div className="relative z-10 p-12 md:p-20">
            <p className="text-caption font-bold text-brand-300 uppercase tracking-widest mb-4">
              Ready to Scale?
            </p>
            {/* H1: 48px */}
            <h2
              className="font-bold text-white mb-4"
              style={{ fontSize: "var(--font-size-h1)", lineHeight: "1.15" }}
            >
              Ready to Get Started?
            </h2>
            <p className="text-body text-white/70 mb-10 max-w-xl mx-auto font-light">
              Join hundreds of industrial companies that trust Rotex for their
              critical operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="h-12 px-8 text-small font-semibold bg-white text-brand-600 hover:bg-neutral-100 shadow-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-small font-semibold border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-200"
                >
                  View Products
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
