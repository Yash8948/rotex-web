export type Industry = {
  slug: string;
  name: string;
  description: string;
  bgKey?: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    bgKey: "oil",
    description:
      "Flow intelligence that performs where pressure, precision, and uptime are non-negotiable. From upstream volatility to downstream complexity, Rotex enables control that adapts, responds, and delivers.",
  },
  {
    slug: "power-generation",
    name: "Power Generation",
    bgKey: "power",
    description:
      "High-cycle, high-reliability valve and actuator solutions engineered for the continuous demands of thermal, hydro, and renewable power plants.",
  },
  {
    slug: "automotive",
    name: "Automotive",
    bgKey: "automative",
    description:
      "Precision flow control built for the fast-paced demands of automotive manufacturing — from paint booths to powertrain assembly lines.",
  },
  {
    slug: "rail",
    name: "Rail",
    bgKey: "rail",
    description:
      "Robust valve solutions designed for the rigorous safety and reliability standards of rail traction, braking, and pneumatic control systems.",
  },
  {
    slug: "aerospace",
    name: "Aerospace",
    bgKey: "aerospace",
    description:
      "Ultra-precise, lightweight flow control for aerospace ground support, fuel handling, and hydraulic test rigs where failure is not an option.",
  },
  {
    slug: "industrial-machinery",
    name: "Industrial Machinery",
    bgKey: "machine",
    description:
      "Versatile solenoid and angle seat valve solutions for OEM machinery builders who need consistent performance across diverse process conditions.",
  },
];
