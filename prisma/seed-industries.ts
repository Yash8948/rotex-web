import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!.replace(/^file:/, ""),
});
const prisma = new PrismaClient({ adapter });

type CustomerStorySeed = { quote: string; author: string; company: string; image: string };

type SubIndustrySeed = {
  slug: string;
  name: string;
  description: string;
  challengesTitle: string;
  solutionsTitle: string;
  solutionsIntro: string;
  challenges: string[];
  solutions: string[];
  recommendedProducts: string[];
  customerStories: CustomerStorySeed[];
};

type IndustrySeed = {
  slug: string;
  name: string;
  bgKey?: string;
  image: string;
  description: string;
  sectionTitle: string;
  overview: string;
  stats: { value: string; suffix?: string; label: string }[];
  whyChoose: { title: string; highlight: string; cards: { title: string; description: string }[] };
  subIndustries: SubIndustrySeed[];
};

const INDUSTRIES: IndustrySeed[] = [
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    bgKey: "oil",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80",
    description:
      "Flow intelligence that performs where pressure, precision, and uptime are non-negotiable. From upstream volatility to downstream complexity, Rotex enables control that adapts, responds, and delivers.",
    sectionTitle: "Redefining Flow Control in Oil & Gas",
    overview:
      "Oil and gas operations run in some of the world's most demanding and safety-critical environments across upstream wellheads, midstream pipelines, and downstream refineries. The volatile nature of hydrocarbons, combined with complex extraction and processing systems, creates conditions where even minor deviations can lead to severe operational, environmental, and financial consequences. From offshore platforms to remote drilling sites, operations face constant challenges including extreme pressures, high temperatures, and limited accessibility. These conditions place immense stress on equipment and demand systems that can perform reliably without interruption. Downtime is not a delay — it is a direct loss of safety, output, and revenue. At the same time, stringent regulatory requirements and increasing environmental scrutiny require continuous improvements in safety, control, and operational efficiency. Rotex addresses these challenges through a systems-led approach to flow control, purpose-engineered for the demands of oil and gas. Solenoid valves, actuators, positioners, and electrohydraulic systems work together as an integrated intelligence layer within the process. This enables faster response, precise control, and fail-safe operation across upstream, midstream, and downstream environments. The result is safer operations, improved reliability, and consistent performance — helping operators run critical assets safely, efficiently, and without compromise across every stage of oil and gas production and processing.",
    stats: [
      { value: "23", label: "Refineries in India" },
      { value: "57", suffix: "+", label: "Years of Reliability" },
    ],
    whyChoose: {
      title: "Why Choose Rotex for",
      highlight: "Oil & Gas",
      cards: [
        { title: "Precision Under Pressure", description: "Engineered for high-pressure, high-temperature applications where even the smallest deviation can have significant consequences." },
        { title: "Fail-Safe by Design", description: "With advanced EHF actuator systems and intelligent control mechanisms, safety isn't an add-on. It's embedded into every operation." },
        { title: "System-Level Responsiveness", description: "Our solutions sense, adjust, and respond dynamically to changing process conditions." },
        { title: "Relentless Customization", description: "No two flow environments are identical. Rotex solutions are tailored to your exact process, ensuring optimal performance in real-world conditions." },
        { title: "High-Cycle Reliability", description: "Built to withstand continuous operations with minimal wear, reducing downtime and extending system life." },
        { title: "Global Standards Compliance", description: "Every component meets API, ATEX, IECEx, and SIL safety standards, ensuring seamless deployment across global oil and gas operations." },
        { title: "Single-Supplier Integration", description: "From solenoid valves to full EHF actuator packages, Rotex simplifies your supply chain with fully integrated, pre-engineered solutions." },
        { title: "Field-Proven Heritage", description: "Decades of deployment across Indian and international refineries, pipelines, and offshore platforms validate our engineering approach in the most demanding environments." },
      ],
    },
    subIndustries: [
      {
        slug: "upstream",
        name: "Upstream",
        description: "Upstream oil & gas operations take place in some of the harshest and most safety-critical environments, from onshore wellheads and gathering systems to offshore platforms and remote production facilities. Reliable process automation is essential to keep production running and operators safe.",
        challengesTitle: "Process Challenges in Upstream Operation",
        solutionsTitle: "Rotex Solutions for Upstream Applications",
        solutionsIntro: "Rotex offers reliable process automation engineered for the harshest and most safety-critical operating environments, delivering:",
        challenges: [
          "Reliable performance in extreme temperatures, pressures, and hazardous atmospheres",
          "Accurate process control under variable well conditions",
          "Safe and dependable emergency shutdown (ESD) performance across remote and offshore locations",
          "Compliance with strict environmental and safety standards",
        ],
        solutions: [
          "Rugged construction for harsh upstream environments",
          "Fast, reliable response for ESD and process safety duty",
          "Accurate, repeatable control across production and gathering systems",
          "Safety-certified components with complete documentation",
          "Engineering expertise built on decades of upstream experience",
        ],
        recommendedProducts: ["Solenoid Valve", "Angle Seat Valve", "Actuators", "Positioners", "Automotive Solutions"],
        customerStories: [
          { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&q=80", quote: "Rotex solenoid valves have been instrumental in maintaining fail-safe shutdown integrity across our offshore wellheads. Zero unplanned trips in two years.", author: "Rajesh Mehta", company: "Plant Head, Aarti Industries Ltd." },
          { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=640&q=80", quote: "The ESD actuator systems from Rotex gave us the confidence to extend our inspection intervals. Reliability has been outstanding in extreme conditions.", author: "Sunil Varma", company: "Operations Manager, ONGC" },
          { image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=640&q=80", quote: "From initial specification to commissioning, the Rotex team understood our upstream requirements and delivered exactly what our process demanded.", author: "Priya Nair", company: "Instrumentation Engineer, Cairn India" },
          { image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=640&q=80", quote: "We've standardised on Rotex valves across all our upstream platforms. The consistency of performance and documentation support is unmatched.", author: "Amir Khan", company: "Procurement Head, Reliance Industries" },
        ],
      },
      {
        slug: "midstream",
        name: "Midstream",
        description: "Midstream operations handle transportation, storage, and processing of oil, gas, and NGLs across thousands of kilometres of pipelines and compressor stations. Precision control and zero-leak integrity are non-negotiable throughout the network.",
        challengesTitle: "Process Challenges in Midstream Operation",
        solutionsTitle: "Rotex Solutions for Midstream Applications",
        solutionsIntro: "Rotex delivers proven flow control solutions for the demanding midstream environment:",
        challenges: [
          "Managing high-pressure pipeline integrity over long distances",
          "Reliable compressor station valve control with minimal downtime",
          "Leak-free performance in hydrocarbon transfer and storage",
          "Meeting safety and environmental compliance across unmanned facilities",
        ],
        solutions: [
          "High-pressure solenoid and actuated valves for pipeline control",
          "Remote-operable actuator systems for unmanned stations",
          "Bi-directional, zero-leak seat designs for custody transfer",
          "ATEX/IECEx-certified components for hazardous area compliance",
          "Proven performance in gas compression and metering applications",
        ],
        recommendedProducts: ["Solenoid Valve", "Actuators", "Positioners", "Angle Seat Valve"],
        customerStories: [
          { image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=640&q=80", quote: "Rotex's high-pressure actuated valves have held up flawlessly across 1,200 km of our gas pipeline network. Leak-free performance since day one.", author: "Deepak Sharma", company: "Pipeline Integrity Manager, GAIL India" },
          { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&q=80", quote: "Remote operability was our biggest challenge at unmanned compressor stations. Rotex delivered a solution that simply works — every time.", author: "Meena Pillai", company: "Automation Lead, Petronet LNG" },
          { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=640&q=80", quote: "The ATEX certification and documentation package from Rotex streamlined our hazardous area compliance approval by weeks.", author: "Vikram Singh", company: "HSE Director, Indian Oil Corporation" },
          { image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=640&q=80", quote: "We evaluated five valve suppliers for our custody transfer metering stations. Rotex won on both technical merit and post-sales support.", author: "Anita Desai", company: "Project Engineer, BPCL" },
        ],
      },
      {
        slug: "downstream",
        name: "Downstream",
        description: "Downstream facilities — refineries, petrochemical plants, and distribution terminals — operate under strict process requirements. Continuous operation, precise control, and safety are critical to meeting output targets and regulatory standards.",
        challengesTitle: "Process Challenges in Downstream Operation",
        solutionsTitle: "Rotex Solutions for Downstream Applications",
        solutionsIntro: "Rotex provides precision-engineered flow control solutions purpose-built for downstream environments:",
        challenges: [
          "High-cycle operation demands across refinery process units",
          "Handling aggressive and corrosive media at elevated temperatures",
          "Maintaining uptime in continuous process plant operations",
          "Stringent regulatory and safety standards for refinery environments",
        ],
        solutions: [
          "High-cycle solenoid valves rated for continuous duty refinery service",
          "Corrosion-resistant materials and coatings for aggressive media",
          "Integrated positioner and actuator solutions for precise control",
          "Full SIL certification and documentation for safety-instrumented systems",
          "Dedicated application engineering support for complex process requirements",
        ],
        recommendedProducts: ["Solenoid Valve", "Angle Seat Valve", "Actuators", "Positioners", "Automotive Solutions"],
        customerStories: [
          { image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=640&q=80", quote: "Rotex high-cycle solenoid valves have run continuously in our refinery CDU for 18 months without a single failure. Exceptional uptime in a demanding environment.", author: "Sanjay Kapoor", company: "Plant Manager, Nayara Energy" },
          { image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=640&q=80", quote: "The SIL-certified documentation Rotex provided allowed us to pass our safety case audit without any corrective actions. A rare outcome.", author: "Lakshmi Iyer", company: "Safety Systems Engineer, HPCL" },
          { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&q=80", quote: "Corrosion was destroying our previous valve stock within six months. The Rotex coated series has exceeded 24 months with no visible degradation.", author: "Ravi Kumar", company: "Maintenance Head, MRPL" },
          { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=640&q=80", quote: "The integrated positioner and actuator solution from Rotex gave us the precise control we needed for our cat cracker slide valves.", author: "Fiona D'Souza", company: "Process Engineer, Bharat Petroleum" },
        ],
      },
    ],
  },
  {
    slug: "power-generation",
    name: "Power Generation",
    bgKey: "power",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
    description:
      "High-cycle, high-reliability valve and actuator solutions engineered for the continuous demands of thermal, hydro, and renewable power plants.",
    sectionTitle: "Enabling Reliable Power Generation",
    overview:
      "Power generation plants operate around the clock under extreme thermal and mechanical loads. Whether thermal, hydro, or renewable, every facility depends on precise flow control to regulate steam, cooling water, and fuel. Rotex delivers high-cycle solenoid valves and actuators built for the continuous, unforgiving demands of power infrastructure — ensuring uptime, safety, and grid reliability.",
    stats: [
      { value: "40", suffix: "+", label: "Power Plants Served" },
      { value: "57", suffix: "+", label: "Years of Reliability" },
    ],
    whyChoose: {
      title: "Why Choose Rotex for",
      highlight: "Power Generation",
      cards: [
        { title: "High-Cycle Endurance", description: "Built for millions of cycles without degradation in steam, water, and fuel service." },
        { title: "Thermal Stability", description: "Operates reliably across extreme temperature ranges in boiler and turbine control applications." },
        { title: "Grid-Critical Reliability", description: "Zero-compromise uptime for facilities where every minute of downtime has grid-wide consequences." },
        { title: "Rapid Response", description: "Fast-acting solenoid and actuator systems ensure immediate response to turbine trip and safety demands." },
      ],
    },
    subIndustries: [
      {
        slug: "thermal",
        name: "Thermal",
        description: "Thermal power stations require uninterrupted steam and fuel control across boilers, turbines, and condensers operating at extreme temperatures and pressures.",
        challengesTitle: "Challenges in Thermal Power",
        solutionsTitle: "Rotex Solutions for Thermal Power",
        solutionsIntro: "Rotex delivers reliable flow control for thermal power environments:",
        challenges: [
          "High-temperature steam control in boiler and turbine systems",
          "Rapid-response ESD valves for turbine trip protection",
          "Long-service-life components in continuous duty cycles",
          "Tight shutoff requirements for fuel and condensate lines",
        ],
        solutions: [
          "High-temperature solenoid valves for steam and condensate service",
          "Fast-acting ESD actuators for turbine protection systems",
          "Long-life design rated for millions of cycles",
          "Full SIL-compliant solutions for safety-critical loops",
        ],
        recommendedProducts: ["Solenoid Valve", "Actuators", "Positioners"],
        customerStories: [
          { image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=640&q=80", quote: "Rotex ESD actuators respond within milliseconds on turbine trip. In thermal power, that speed is the difference between a controlled shutdown and a catastrophe.", author: "Arun Joshi", company: "Turbine Engineer, NTPC" },
          { image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=640&q=80", quote: "We've been running Rotex steam solenoid valves on our boiler feed systems for over three years. Not a single unplanned outage attributable to the valves.", author: "Kavita Menon", company: "Plant Operations Lead, Adani Power" },
          { image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=640&q=80", quote: "The SIL compliance package was thorough and accepted by our third-party safety assessor without revision. Saved us significant time during certification.", author: "Harish Rao", company: "Safety Engineer, Tata Power" },
          { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&q=80", quote: "Rotex offered the widest operating temperature range we found for steam service. That headroom gives us confidence across seasonal load variations.", author: "Sunita Patil", company: "Instrumentation Manager, CESC" },
        ],
      },
      {
        slug: "hydro",
        name: "Hydro",
        description: "Hydroelectric plants demand precision water flow control and fast-response safety systems to protect turbines and manage water gates reliably.",
        challengesTitle: "Challenges in Hydro Power",
        solutionsTitle: "Rotex Solutions for Hydro Power",
        solutionsIntro: "Rotex delivers reliable flow control for hydroelectric environments:",
        challenges: [
          "Precise water flow and gate control for turbine protection",
          "Corrosion-resistant performance in wet, submerged environments",
          "Emergency shutdown reliability for dam safety compliance",
          "Low-maintenance performance in remote locations",
        ],
        solutions: [
          "Corrosion-resistant actuated valves for water control",
          "Reliable ESD and gate actuator systems",
          "Remote monitoring-compatible positioner solutions",
          "Low-maintenance design for remote hydroelectric sites",
        ],
        recommendedProducts: ["Solenoid Valve", "Actuators", "Angle Seat Valve"],
        customerStories: [
          { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=640&q=80", quote: "Our hydro plant is in a remote Himalayan location with no easy maintenance access. Rotex actuators have operated for two full seasons without intervention.", author: "Neeraj Bhat", company: "Site Manager, NHPC" },
          { image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=640&q=80", quote: "The corrosion-resistant valve bodies Rotex supplied for our submerged gate systems have performed beyond specification in continuous wet service.", author: "Asha Krishnan", company: "Civil & Mechanical Lead, THDC India" },
          { image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=640&q=80", quote: "Remote monitoring integration was seamless. We can now track gate actuator health from our control room 200 km away with full confidence.", author: "Rakesh Pandey", company: "SCADA Engineer, SJVN" },
          { image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=640&q=80", quote: "Rotex understood the specific challenges of run-of-river hydro applications. Their application engineering team helped us select the right solution first time.", author: "Meera Iyer", company: "Projects Director, GMR Energy" },
        ],
      },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    bgKey: "automative",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
    description:
      "Precision flow control built for the fast-paced demands of automotive manufacturing — from paint booths to powertrain assembly lines.",
    sectionTitle: "Powering Automotive Manufacturing",
    overview:
      "Automotive manufacturing requires split-second precision and zero tolerance for deviation. From paint shop humidity control to powertrain assembly pneumatics, Rotex solenoid valves and actuators deliver consistent, repeatable performance. Our solutions integrate seamlessly into robotic assembly lines, test rigs, and clean rooms — keeping production moving without interruption.",
    stats: [
      { value: "500", suffix: "+", label: "OEM Installations" },
      { value: "57", suffix: "+", label: "Years of Reliability" },
    ],
    whyChoose: {
      title: "Why Choose Rotex for",
      highlight: "Automotive",
      cards: [
        { title: "Line-Speed Precision", description: "Millisecond-accurate valve response keeps pace with high-speed robotic assembly lines." },
        { title: "OEM Integration Ready", description: "Compact form factors and standard interfaces for seamless machine builder integration." },
        { title: "Consistent Repeatability", description: "Zero-drift performance across millions of cycles for defect-free manufacturing." },
        { title: "Clean Environment Compatible", description: "Low-emission and clean-room compatible valve designs for paint and trim operations." },
      ],
    },
    subIndustries: [
      {
        slug: "assembly",
        name: "Assembly",
        description: "Assembly line operations require fast, repeatable pneumatic and hydraulic control for robotic tools, fixtures, and material handling systems.",
        challengesTitle: "Challenges in Assembly Operations",
        solutionsTitle: "Rotex Solutions for Assembly",
        solutionsIntro: "Rotex provides reliable automation for assembly line environments:",
        challenges: [
          "High-speed, high-cycle valve control for robotic tooling",
          "Consistent pressure regulation across multiple workstations",
          "Minimal downtime in continuous production environments",
          "Integration with PLC and fieldbus control systems",
        ],
        solutions: [
          "High-cycle solenoid manifolds for pneumatic tooling",
          "Fast-response directional control valves",
          "Fieldbus-compatible valve islands for system integration",
          "Long-service-life design for 24/7 assembly environments",
        ],
        recommendedProducts: ["Solenoid Valve", "Actuators"],
        customerStories: [
          { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&q=80", quote: "Rotex solenoid manifolds integrated into our robotic welding cells without any modification. The fast response improved our cycle time by 4%.", author: "Suresh Rao", company: "Manufacturing Engineering Head, Maruti Suzuki" },
          { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=640&q=80", quote: "We run 24/7 assembly lines with zero tolerance for downtime. Rotex valves have not caused a single line stop in 18 months of operation.", author: "Prabhavati Nair", company: "Production Manager, Tata Motors" },
          { image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=640&q=80", quote: "The fieldbus-compatible valve islands from Rotex reduced our wiring effort by over 60% on our new BIW assembly line.", author: "Anand Kulkarni", company: "Automation Engineer, Mahindra & Mahindra" },
          { image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=640&q=80", quote: "Rotex gave us OEM pricing with tier-1 application support. That combination is rare, and it's why they're our standard valve supplier.", author: "Vijay Hegde", company: "Supply Chain Director, Bosch India" },
        ],
      },
      {
        slug: "paint-shop",
        name: "Paint Shop",
        description: "Paint shop environments require clean, consistent air and fluid control with explosion-proof components to handle flammable media safely.",
        challengesTitle: "Challenges in Paint Shop Operations",
        solutionsTitle: "Rotex Solutions for Paint Shop",
        solutionsIntro: "Rotex delivers safe, clean flow control for paint shop environments:",
        challenges: [
          "Explosion-proof control in solvent-laden environments",
          "Precise fluid and air regulation for consistent finish quality",
          "Easy cleaning and maintenance in high-contamination areas",
          "Compatibility with robotic spray systems",
        ],
        solutions: [
          "ATEX-certified solenoid valves for hazardous zones",
          "Precision proportional valves for spray quality control",
          "Easy-clean stainless steel body options",
          "Integrated manifolds for compact robotic spray cell installation",
        ],
        recommendedProducts: ["Solenoid Valve", "Angle Seat Valve"],
        customerStories: [
          { image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=640&q=80", quote: "The ATEX-certified Rotex valves handled our solvent zones without a single safety incident across three paint shop expansions.", author: "Gaurav Mehta", company: "Paint Shop Manager, Honda Cars India" },
          { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&q=80", quote: "Consistent finish quality depends on consistent fluid and air pressure. Rotex proportional valves delivered the repeatability our spray robots needed.", author: "Nalini Chandran", company: "Quality Head, TVS Motor Company" },
          { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=640&q=80", quote: "Cleaning and maintenance in our paint booth is critical. The stainless Rotex bodies clean in place without any degradation of the seals.", author: "Vikrant Sinha", company: "Maintenance Lead, Hyundai India" },
          { image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=640&q=80", quote: "Integration into our robotic spray cells took one day. Rotex supplied all the connection diagrams and commissioning support we needed.", author: "Divya Pillai", company: "Robotics Engineer, Toyota Kirloskar" },
        ],
      },
    ],
  },
  {
    slug: "rail",
    name: "Rail",
    bgKey: "rail",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80",
    description:
      "Robust valve solutions designed for the rigorous safety and reliability standards of rail traction, braking, and pneumatic control systems.",
    sectionTitle: "Dependable Flow Control for Rail Systems",
    overview:
      "Rail systems demand the highest levels of safety and reliability. From pneumatic braking to HVAC and door control, Rotex valves are engineered to perform across thousands of cycles without failure. Our rail-grade components meet international railway standards and are trusted by rolling stock manufacturers and rail operators worldwide.",
    stats: [
      { value: "200", suffix: "+", label: "Rail Projects" },
      { value: "57", suffix: "+", label: "Years of Reliability" },
    ],
    whyChoose: {
      title: "Why Choose Rotex for",
      highlight: "Rail",
      cards: [
        { title: "Safety-First Engineering", description: "All rail-grade components meet EN 50155 and relevant railway safety standards as standard." },
        { title: "Vibration Resistance", description: "Designed and tested to withstand the constant shock and vibration of rolling stock operation." },
        { title: "Wide Temperature Range", description: "Reliable performance from -40°C to +85°C for all climate zones and operating conditions." },
        { title: "Compact & Lightweight", description: "Space-optimised designs to meet the tight installation constraints of rail vehicles." },
      ],
    },
    subIndustries: [
      {
        slug: "rolling-stock",
        name: "Rolling Stock",
        description: "Rolling stock requires compact, vibration-resistant valve solutions for braking, HVAC, door control, and suspension systems.",
        challengesTitle: "Challenges in Rolling Stock",
        solutionsTitle: "Rotex Solutions for Rolling Stock",
        solutionsIntro: "Rotex provides certified valve solutions for rolling stock applications:",
        challenges: [
          "Vibration and shock resistance in continuous motion environments",
          "Compact installation in space-constrained rail vehicles",
          "Wide temperature range performance across all climate zones",
          "Certification to EN 50155 and railway safety standards",
        ],
        solutions: [
          "EN 50155 compliant solenoid valves for rolling stock",
          "Compact manifold designs for brake and door systems",
          "Wide temperature range certified valve assemblies",
          "Shock and vibration tested to railway test specifications",
        ],
        recommendedProducts: ["Solenoid Valve", "Actuators"],
        customerStories: [
          { image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=640&q=80", quote: "Rotex solenoid valves met EN 50155 and passed our rolling stock qualification tests on the first submission. That saved us three months of re-testing.", author: "Ramesh Iyer", company: "Rolling Stock Engineer, BEML" },
          { image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=640&q=80", quote: "Vibration resistance is non-negotiable on our metro carbodies. Rotex valves have operated through years of high-frequency vibration without loosening or degradation.", author: "Pooja Shah", company: "Systems Engineer, Alstom India" },
          { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&q=80", quote: "The compact manifold design from Rotex fit perfectly into our limited brake control cabinet space. Installation was straightforward.", author: "Dinesh Kumar", company: "Bogey Design Lead, Wabtec India" },
          { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=640&q=80", quote: "We extended Rotex's valve specifications across our entire fleet after a successful pilot on one fleet type. Consistency across platforms has simplified our maintenance programme.", author: "Neeta Bose", company: "Fleet Manager, Delhi Metro Rail" },
        ],
      },
      {
        slug: "infrastructure",
        name: "Infrastructure",
        description: "Rail infrastructure including signalling, track-side systems, and depot equipment requires robust, weatherproof automation components.",
        challengesTitle: "Challenges in Rail Infrastructure",
        solutionsTitle: "Rotex Solutions for Rail Infrastructure",
        solutionsIntro: "Rotex provides weatherproof flow control for rail infrastructure:",
        challenges: [
          "Outdoor weatherproof performance across all seasons",
          "Long service life with minimal maintenance access",
          "Reliable operation in track-side signalling systems",
          "Corrosion resistance in exposed infrastructure environments",
        ],
        solutions: [
          "IP65/IP67 rated solenoid valves for outdoor installation",
          "Corrosion-resistant stainless steel and coated body options",
          "High MTBF designs for low-maintenance infrastructure service",
          "Proven performance in track-side and depot applications",
        ],
        recommendedProducts: ["Solenoid Valve", "Angle Seat Valve"],
        customerStories: [
          { image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=640&q=80", quote: "Our trackside systems are exposed to monsoon rains, dust, and extreme summer heat. Rotex IP67-rated valves have required zero maintenance interventions in two years.", author: "Sanjay Gupta", company: "Infrastructure Manager, Indian Railways" },
          { image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=640&q=80", quote: "Corrosion was our biggest challenge for outdoor rail installations. The Rotex stainless and coated range solved it completely within budget.", author: "Mala Krishnamurthy", company: "Civil & Mechanical Head, RVNL" },
          { image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=640&q=80", quote: "We manage 50+ depot valve assets across the network. The high MTBF of Rotex units has drastically reduced our unplanned maintenance callouts.", author: "Aditya Verma", company: "Depot Maintenance Head, Knorr-Bremse India" },
          { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&q=80", quote: "Rotex's technical team visited our depot and specified the right valve for each trackside application. That level of support is why we chose them.", author: "Sunita Reddy", company: "Asset Manager, Pune Metro" },
        ],
      },
    ],
  },
  {
    slug: "aerospace",
    name: "Aerospace",
    bgKey: "aerospace",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200&q=80",
    description:
      "Ultra-precise, lightweight flow control for aerospace ground support, fuel handling, and hydraulic test rigs where failure is not an option.",
    sectionTitle: "Precision Flow Control for Aerospace",
    overview:
      "Aerospace applications leave no room for error. Ground support equipment, fuel handling systems, and hydraulic test rigs require valves that are precise, lightweight, and absolutely reliable. Rotex delivers aerospace-grade flow control solutions engineered to meet the stringent traceability and performance requirements of aviation and defence applications.",
    stats: [
      { value: "100", suffix: "+", label: "Aerospace Clients" },
      { value: "57", suffix: "+", label: "Years of Reliability" },
    ],
    whyChoose: {
      title: "Why Choose Rotex for",
      highlight: "Aerospace",
      cards: [
        { title: "Traceability & Documentation", description: "Full material traceability and test documentation for every component supplied to aerospace clients." },
        { title: "Lightweight Design", description: "Optimised material selection minimises weight without compromising structural or functional integrity." },
        { title: "Zero-Leak Performance", description: "Class VI shutoff ensures zero contamination in fuel, hydraulic, and pneumatic systems." },
        { title: "Custom Engineering", description: "Application-specific solutions engineered to meet unique aerospace performance requirements." },
      ],
    },
    subIndustries: [
      {
        slug: "ground-support",
        name: "Ground Support",
        description: "Ground support equipment for fuelling, hydraulic testing, and pneumatic systems requires precise, traceable valve solutions.",
        challengesTitle: "Challenges in Ground Support",
        solutionsTitle: "Rotex Solutions for Ground Support",
        solutionsIntro: "Rotex provides traceable, precision flow control for aerospace ground support:",
        challenges: [
          "Zero-leak performance in fuel transfer and defuelling systems",
          "Traceability requirements for all components in aerospace service",
          "High-pressure hydraulic fluid control in test rigs",
          "Rapid-cycle performance in fast-turnaround ground operations",
        ],
        solutions: [
          "Class VI zero-leak valves for fuel and hydraulic service",
          "Full material traceability certificates supplied as standard",
          "High-pressure rated body and trim configurations",
          "Fast-cycle solenoid valves for high-throughput ground operations",
        ],
        recommendedProducts: ["Solenoid Valve", "Angle Seat Valve", "Actuators"],
        customerStories: [
          { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=640&q=80", quote: "Full material traceability from Rotex meant our aerospace GSE qualified for defence procurement without any material verification re-runs. Significant time savings.", author: "Wing Cdr. (Retd.) Arjun Nair", company: "GSE Manager, HAL" },
          { image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=640&q=80", quote: "Zero-leak performance in our fuel transfer rigs is mandatory. Rotex Class VI valves have held to specification through thousands of defuelling cycles.", author: "Prashant Mehta", company: "Ground Equipment Engineer, Air India" },
          { image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=640&q=80", quote: "The lightweight Rotex valve bodies reduced our GSE cart weight below our certification limit without any compromise on pressure rating.", author: "Kavita Rao", company: "Structures & Systems Lead, DRDO" },
          { image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=640&q=80", quote: "Rotex responded to our custom hydraulic test rig specification within a week and delivered a fully tested assembly in four weeks. Exceptional turnaround.", author: "Suresh Nambiar", company: "Test Equipment Head, ISRO" },
        ],
      },
    ],
  },
  {
    slug: "industrial-machinery",
    name: "Industrial Machinery",
    bgKey: "machine",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80",
    description:
      "Versatile solenoid and angle seat valve solutions for OEM machinery builders who need consistent performance across diverse process conditions.",
    sectionTitle: "Flow Intelligence for Industrial Machinery",
    overview:
      "Industrial machinery OEMs need flow control components that perform reliably across diverse media, pressures, and temperatures. Rotex solenoid valves and actuators are designed for easy integration into custom machine builds — offering broad compatibility, long service life, and the technical support to get every application right from day one.",
    stats: [
      { value: "1000", suffix: "+", label: "OEM Partners" },
      { value: "57", suffix: "+", label: "Years of Reliability" },
    ],
    whyChoose: {
      title: "Why Choose Rotex for",
      highlight: "Industrial Machinery",
      cards: [
        { title: "OEM Partnership Model", description: "Dedicated OEM pricing, application support, and fast delivery programs for machine builders." },
        { title: "Broad Media Compatibility", description: "Valve materials and seals certified for water, air, steam, oil, and chemical media." },
        { title: "Integration Flexibility", description: "Available in manifold, sub-base, and inline configurations to suit any machine architecture." },
        { title: "Local Technical Support", description: "Application engineers available to solve sizing, selection, and installation challenges." },
      ],
    },
    subIndustries: [
      {
        slug: "process-machinery",
        name: "Process Machinery",
        description: "Process machinery for food, beverage, chemical, and pharmaceutical applications requires hygienic, chemically resistant valve solutions.",
        challengesTitle: "Challenges in Process Machinery",
        solutionsTitle: "Rotex Solutions for Process Machinery",
        solutionsIntro: "Rotex provides versatile flow control for process machinery OEMs:",
        challenges: [
          "Hygienic and CIP-compatible valve design for food and pharma",
          "Chemical resistance for aggressive media in process equipment",
          "Compact integration into machine frames and panels",
          "Wide voltage and pressure range compatibility",
        ],
        solutions: [
          "Stainless steel hygienic valve bodies for food and pharma service",
          "EPDM and PTFE seal options for chemical media compatibility",
          "DIN rail and panel-mount solenoid valve assemblies",
          "Wide voltage range coil options for global machine compatibility",
        ],
        recommendedProducts: ["Solenoid Valve", "Angle Seat Valve", "Actuators"],
        customerStories: [
          { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&q=80", quote: "Rotex stainless hygienic valves passed our CIP validation on the first run. No seal degradation after 500 cleaning cycles — exactly what our pharma customer required.", author: "Anil Gaikwad", company: "Project Director, ACG Engineering" },
          { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=640&q=80", quote: "Chemical resistance was the hardest specification to meet. Rotex PTFE-seated valves have held up perfectly in our aggressive solvent dosing process.", author: "Rekha Iyengar", company: "Process Engineer, Thermax" },
          { image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=640&q=80", quote: "Compact DIN rail mounting helped us pack more valve stations into our machine frame. Rotex gave us configurations no other supplier could match.", author: "Hemant Jadhav", company: "Machine Design Lead, Bajaj Process Equipment" },
          { image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=640&q=80", quote: "Wide voltage compatibility meant we could ship the same machine variant to Europe and the Middle East without any valve changes. Simplified our BOM significantly.", author: "Shilpa Gokhale", company: "Export Business Head, Forbes Marshall" },
        ],
      },
      {
        slug: "packaging-machinery",
        name: "Packaging Machinery",
        description: "Packaging lines require fast, precise pneumatic control for filling, sealing, labelling, and conveying operations at high production speeds.",
        challengesTitle: "Challenges in Packaging Machinery",
        solutionsTitle: "Rotex Solutions for Packaging Machinery",
        solutionsIntro: "Rotex delivers fast, reliable flow control for packaging applications:",
        challenges: [
          "High-speed, high-cycle pneumatic control for packaging operations",
          "Precise dosing and filling control for consistent product weight",
          "Compact manifold design for space-constrained machine frames",
          "Low power consumption for energy-efficient machine design",
        ],
        solutions: [
          "High-cycle solenoid valves rated for packaging line speeds",
          "Proportional valves for precise fill and dose control",
          "Compact manifold assemblies for multi-station packaging machines",
          "Low-wattage coil options for energy-efficient operation",
        ],
        recommendedProducts: ["Solenoid Valve", "Actuators", "Positioners"],
        customerStories: [
          { image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=640&q=80", quote: "Rotex high-cycle valves kept pace with our 120-pack-per-minute filling line without a single jam or misfire. Production efficiency improved immediately.", author: "Nikhil Patil", company: "Production Engineer, Piramal Enterprises" },
          { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&q=80", quote: "Precise dose control was our biggest quality challenge. Rotex proportional valves brought our fill weight variance within 0.2g — well inside specification.", author: "Smita Kulkarni", company: "Quality Assurance Manager, Marico" },
          { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=640&q=80", quote: "The compact manifold assembly from Rotex saved 40% of our panel space on our new multi-lane sealing machine.", author: "Rahul Desai", company: "Machine Design Engineer, IMA Group India" },
          { image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=640&q=80", quote: "Low-wattage coil options from Rotex helped us hit our energy-efficiency target for the machine without any functional compromise.", author: "Varsha Tendulkar", company: "Sustainability Lead, Hindustan Unilever" },
        ],
      },
    ],
  },
];

async function main() {
  for (const industry of INDUSTRIES) {
    const { subIndustries, ...industryFields } = industry;

    const industryRow = await prisma.industry.upsert({
      where: { slug: industry.slug },
      update: industryFields,
      create: industryFields,
    });

    for (const sub of subIndustries) {
      const { customerStories, ...subFields } = sub;

      const storyIds: string[] = [];
      for (const story of customerStories) {
        const created = await prisma.customerStory.create({ data: story });
        storyIds.push(created.id);
      }

      await prisma.subIndustry.upsert({
        where: { industryId_slug: { industryId: industryRow.id, slug: sub.slug } },
        update: { ...subFields, storyIds },
        create: { ...subFields, storyIds, industryId: industryRow.id },
      });
    }
  }

  console.log(`Seeded ${INDUSTRIES.length} industries with sub-industries and customer stories.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
