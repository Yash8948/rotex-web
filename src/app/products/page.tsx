"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const categories = ["All", "Rotary Valves", "Airlocks", "Conveyors", "Monitoring"];

const products = [
  {
    name: "RX-500 Rotary Valve",
    category: "Rotary Valves",
    desc: "Heavy-duty rotary valve for bulk material handling in demanding environments.",
    specs: ["Capacity: 500 L/min", "Pressure: 10 bar", "Temp range: -20°C to 250°C"],
    badge: "Best Seller",
  },
  {
    name: "RX-200 Airlock",
    category: "Airlocks",
    desc: "Precision airlock for pneumatic conveying systems requiring tight pressure sealing.",
    specs: ["Capacity: 200 L/min", "Pressure: 6 bar", "IP65 rated"],
    badge: "New",
  },
  {
    name: "FlexConvey Pro",
    category: "Conveyors",
    desc: "Flexible screw conveyor designed for free-flowing and non-free-flowing materials.",
    specs: ["Length: up to 12m", "Diameter: 50–150mm", "Variable speed"],
    badge: null,
  },
  {
    name: "SentinelIQ Monitor",
    category: "Monitoring",
    desc: "IoT monitoring unit with real-time dashboards, alerts and predictive maintenance AI.",
    specs: ["Wi-Fi & LTE", "8 sensor inputs", "Cloud dashboard"],
    badge: "New",
  },
  {
    name: "RX-1000 Industrial Valve",
    category: "Rotary Valves",
    desc: "Our largest rotary valve, engineered for high-volume industrial applications.",
    specs: ["Capacity: 1000 L/min", "Pressure: 16 bar", "Stainless steel body"],
    badge: null,
  },
  {
    name: "AirLock Micro",
    category: "Airlocks",
    desc: "Compact airlock for laboratory and small-scale processing applications.",
    specs: ["Capacity: 20 L/min", "Pressure: 3 bar", "Sanitary design"],
    badge: null,
  },
];

export default function ProductsPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-zinc-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-4">
              Product Range
            </Badge>
            <h1 className="text-5xl font-bold text-zinc-900 mb-6">
              Industrial Equipment Built to Last
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed">
              Explore our comprehensive range of rotary valves, airlocks,
              conveyors, and smart monitoring systems — all engineered for
              maximum reliability and efficiency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter pills */}
      <section className="py-8 bg-white border-b border-zinc-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Badge
                  variant={cat === "All" ? "default" : "outline"}
                  className="cursor-pointer px-4 py-1.5 text-sm"
                >
                  {cat}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Product image placeholder */}
                    <div className="w-full h-40 rounded-lg bg-zinc-100 flex items-center justify-center mb-4">
                      <span className="text-zinc-400 text-sm">Product Image</span>
                    </div>

                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-semibold text-zinc-900">
                        {product.name}
                      </h3>
                      {product.badge && (
                        <Badge
                          variant={product.badge === "New" ? "default" : "secondary"}
                          className="shrink-0 text-xs"
                        >
                          {product.badge}
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-zinc-500 mb-2">{product.category}</p>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-4 flex-1">
                      {product.desc}
                    </p>

                    <ul className="space-y-1 mb-4">
                      {product.specs.map((spec) => (
                        <li key={spec} className="text-xs text-zinc-500 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                          {spec}
                        </li>
                      ))}
                    </ul>

                    <Link href="/contact">
                      <Button variant="outline" size="sm" className="w-full">
                        Request Quote
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Need a custom solution?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              We design and build bespoke equipment tailored to your exact
              specifications and operating environment.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                Enquire About Custom Build
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
