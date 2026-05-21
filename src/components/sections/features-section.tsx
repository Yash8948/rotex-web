"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Settings,
  Shield,
  Zap,
  Globe,
  BarChart3,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Settings,
    title: "Precision Engineering",
    desc: "Manufactured to exact tolerances for maximum performance and longevity.",
  },
  {
    icon: Shield,
    title: "Quality Certified",
    desc: "ISO 9001 certified manufacturing with rigorous quality control at every stage.",
  },
  {
    icon: Zap,
    title: "High Performance",
    desc: "Industry-leading efficiency ratings that reduce energy consumption by up to 30%.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Serving clients in over 50 countries with local support and fast delivery.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    desc: "Smart monitoring systems for real-time performance insights and predictive maintenance.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Round-the-clock technical support from our team of certified engineers.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-neutral-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-caption font-bold text-brand-500 uppercase tracking-widest mb-3">
            Why Rotex
          </p>
          <h2
            className="font-bold text-neutral-800 mb-4"
            style={{ fontSize: "var(--font-size-h2)", lineHeight: "1.2" }}
          >
            Built for Industrial Excellence
          </h2>
          <p className="text-body text-neutral-500 font-light">
            Everything you need to keep your operations running smoothly,
            efficiently, and reliably.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white border-neutral-200 hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  {/* Icon box: neutral bg → brand-500 gradient on hover */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 bg-neutral-100 group-hover:bg-brand-500"
                  >
                    <feature.icon className="h-6 w-6 text-neutral-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3
                    className="font-semibold text-neutral-800 mb-2"
                    style={{ fontSize: "var(--font-size-h4)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-body text-neutral-500 font-light">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
