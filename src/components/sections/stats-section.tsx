"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "40+", label: "Years Experience" },
  { value: "50+", label: "Countries Served" },
  { value: "99.9%", label: "Uptime Guarantee" },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-neutral-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              {/* H2: 36px for stat numbers */}
              <p
                className="font-bold text-gradient-linear mb-2"
                style={{ fontSize: "var(--font-size-h1)", lineHeight: "1.1" }}
              >
                {stat.value}
              </p>
              <p className="text-caption text-white/50 font-medium uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
