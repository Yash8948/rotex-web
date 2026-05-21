"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const milestones = [
  { year: "1985", event: "Rotex founded in Chicago, IL" },
  { year: "1995", event: "Expanded to 10 countries across North America and Europe" },
  { year: "2005", event: "Achieved ISO 9001 certification" },
  { year: "2015", event: "Launched smart monitoring product line" },
  { year: "2024", event: "Serving 500+ clients across 50+ countries" },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-zinc-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <Badge variant="secondary">Our Story</Badge>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-bold text-zinc-900 mb-6"
            >
              40 Years of Industrial Excellence
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-zinc-600 leading-relaxed"
            >
              Since 1985, Rotex has been at the forefront of industrial rotary
              technology. We combine decades of engineering expertise with
              cutting-edge innovation to deliver solutions that keep the world
              moving.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                Our Mission
              </p>
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">
                Engineering a Better Industrial Future
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-4">
                We believe that precision engineering and technological
                innovation are the cornerstones of sustainable industrial
                progress. Every product we manufacture is a testament to our
                commitment to quality.
              </p>
              <p className="text-zinc-600 leading-relaxed">
                Our team of 800+ engineers and technicians work tirelessly to
                push the boundaries of what is possible in rotary technology,
                ensuring our clients always have a competitive advantage.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-zinc-900 rounded-2xl p-8"
            >
              <p className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">
                Our Values
              </p>
              {[
                { title: "Precision", desc: "Every component meets exact specifications." },
                { title: "Reliability", desc: "Trusted performance in mission-critical environments." },
                { title: "Innovation", desc: "Continuous R&D investment drives our roadmap." },
                { title: "Partnership", desc: "Long-term client success is our measure of achievement." },
              ].map((v) => (
                <div key={v.title} className="mb-5 last:mb-0">
                  <p className="text-white font-semibold mb-1">{v.title}</p>
                  <p className="text-zinc-400 text-sm">{v.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-zinc-900">Our Journey</h2>
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="w-16 shrink-0 text-right">
                  <span className="text-sm font-bold text-zinc-900">{m.year}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-zinc-900 mt-0.5" />
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-zinc-300 mt-1 min-h-[2rem]" />
                  )}
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed pb-6">{m.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
