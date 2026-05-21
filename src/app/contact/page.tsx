"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const contactDetails = [
  { icon: Mail, label: "Email", value: "info@rotex.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 000-0000" },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Industrial Ave, Chicago, IL 60601",
  },
  { icon: Clock, label: "Hours", value: "Mon–Fri, 8 am – 6 pm CST" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-zinc-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-4">
              Get In Touch
            </Badge>
            <h1 className="text-5xl font-bold text-zinc-900 mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed">
              Have a question, need a quote, or want to discuss a custom
              solution? Our team is ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <h2 className="text-xl font-bold text-zinc-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-5 mb-8">
                {contactDetails.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-zinc-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-500 mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm text-zinc-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="mb-8" />
              <div className="bg-zinc-900 rounded-xl p-5">
                <p className="text-white font-semibold mb-1">
                  Emergency Support
                </p>
                <p className="text-zinc-400 text-sm mb-3">
                  For critical equipment failures, call our 24/7 hotline.
                </p>
                <p className="text-white font-bold text-lg">
                  +1 (555) 911-0000
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardContent className="p-8">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4">
                        <Send className="h-7 w-7 text-zinc-700" />
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-zinc-600 text-sm">
                        Thank you for reaching out. We will get back to you
                        within one business day.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className="w-full h-10 px-3 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className="w-full h-10 px-3 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                            Company
                          </label>
                          <input
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Acme Industries"
                            className="w-full h-10 px-3 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                            Subject <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full h-10 px-3 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition"
                          >
                            <option value="">Select a subject</option>
                            <option value="quote">Request a Quote</option>
                            <option value="support">Technical Support</option>
                            <option value="custom">Custom Manufacturing</option>
                            <option value="partnership">Partnership</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project or enquiry..."
                          className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-11"
                      >
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
