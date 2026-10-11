export const services = [
  {
    id: "oil-change",
    title: "Oil Change & Maintenance",
    short: "A fresh start for every journey.",
    description:
      "Keep your engine running smoothly with the right oil, fresh filters, and a careful check of the essentials.",
    price: 1500,
    icon: "oil",
    inclusions: [
      "Engine oil replacement",
      "Oil filter replacement",
      "Fluid levels and leak check",
    ],
  },
  {
    id: "brakes",
    title: "Brake Inspection & Repair",
    short: "Confidence in every stop.",
    description:
      "From a subtle squeak to a softer pedal, we inspect your braking system and explain what needs attention.",
    price: 800,
    icon: "brake",
    inclusions: [
      "Pad and rotor inspection",
      "Brake fluid assessment",
      "Repair recommendations",
    ],
  },
  {
    id: "diagnostics",
    title: "Engine Diagnostics",
    short: "Find the cause. Fix it right.",
    description:
      "Understand that warning light with a diagnostic scan and a practical inspection of the underlying issue.",
    price: 1000,
    icon: "diagnostic",
    inclusions: [
      "OBD diagnostic scan",
      "Fault-code interpretation",
      "Written findings and next steps",
    ],
  },
  {
    id: "aircon",
    title: "Air Conditioning Service",
    short: "Stay cool, whatever the traffic.",
    description:
      "Restore comfort on Philippine roads with a thorough assessment of cooling performance and airflow.",
    price: 1200,
    icon: "air",
    inclusions: [
      "Cooling performance test",
      "Cabin filter inspection",
      "Leak and pressure assessment",
    ],
  },
  {
    id: "suspension",
    title: "Suspension & Steering",
    short: "A smoother, more controlled ride.",
    description:
      "Address unusual noises, uneven handling, and road vibration with a focused undercarriage inspection.",
    price: 900,
    icon: "suspension",
    inclusions: [
      "Shock and strut inspection",
      "Steering linkage check",
      "Bushing and joint assessment",
    ],
  },
  {
    id: "battery",
    title: "Battery Testing & Replacement",
    short: "Ready when you are.",
    description:
      "Check starting power and charging health before a weak battery leaves you stranded.",
    price: 350,
    icon: "battery",
    inclusions: [
      "Battery load test",
      "Terminal condition check",
      "Charging system test",
    ],
  },
  {
    id: "tires",
    title: "Tire & Wheel Services",
    short: "Good grip starts here.",
    description:
      "Give your tires the attention they deserve for better road contact, comfort, and even wear.",
    price: 500,
    icon: "tire",
    inclusions: [
      "Tire condition inspection",
      "Pressure adjustment",
      "Rotation assessment",
    ],
  },
  {
    id: "preventive",
    title: "Preventive Maintenance",
    short: "Small checks. Fewer surprises.",
    description:
      "A vehicle-specific maintenance review to help you plan ahead and keep everyday driving dependable.",
    price: 2500,
    icon: "wrench",
    inclusions: [
      "Multi-point inspection",
      "Maintenance schedule review",
      "Prioritized service recommendations",
    ],
  },
] as const;
