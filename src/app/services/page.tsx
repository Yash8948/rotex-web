"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Wrench,
  RefreshCw,
  BarChart3,
  BookOpen,
  Truck,
  Headphones,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Wrench,
    title: "Custom Manufacturing",
    desc: "Bespoke rotary equipment designed and built to your exact specifications. From prototype to full production runs.",
    features: ["CAD/CAM design", "CNC machining", "Quality testing", "Certification"],
  },
  {
    icon: RefreshCw,
    title: "Maintenance & Repair",
    desc: "Expert maintenance programs and rapid repair services to minimise downtime and extend equipment lifespan.",
    features: ["Preventive maintenance", "Emergency repair", "Parts supply", "On-site service"],
  },
  {
    icon: BarChart3,
    title: "Performance Monitoring",
    desc: "IoT-enabled monitoring systems that provide real-time data and predictive maintenance alerts.",
    features: ["24/7 monitoring", "Predictive analytics", "Dashboard reporting", "Alert systems"],
  },
  {
    icon: BookOpen,
    title: "Engineering Consulting",
    desc: "Expert consultation to optimise your existing systems or design new industrial processes from the ground up.",
    features: ["Process analysis", "System design", "ROI modelling", "Implementation support"],
  },
  {
    icon: Truck,
    title: "Global Logistics",
    desc: "Reliable worldwide delivery of equipment and spare parts, with local warehousing in key regions.",
    features: ["Express shipping", "Customs handling", "Local warehousing", "Track & trace"],
  },
  {
    icon: Headphones,
    title: "Technical Support",
    desc: "Round-the-clock access to our certified engineers via phone, video, or on-site visits.",
    features: ["24/7 helpdesk", "Remote diagnostics", "On-site callout", "Training programmes"],
  },
];

export default function ServicesPage() {
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
              What We Offer
            </Badge>
            <h1 className="text-5xl font-bold text-zinc-900 mb-6">
              End-to-End Industrial Services
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed">
              From custom manufacturing to ongoing support, Rotex provides a
              complete suite of services designed to keep your operations
              performing at their best.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-zinc-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                      {service.desc}
                    </p>
                    <ul className="space-y-1">
                      {service.features.map((f) => (
                        <li
                          key={f}
                          className="text-xs text-zinc-500 flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">
              Not sure which service you need?
            </h2>
            <p className="text-zinc-600 mb-8 max-w-xl mx-auto">
              Our engineers are happy to assess your requirements and recommend
              the best solution for your operation.
            </p>
            <Link href="/contact">
              <Button size="lg" className="h-12 px-8">
                Talk to an Engineer
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
