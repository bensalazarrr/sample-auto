export const categories = [
  "Engine Parts",
  "Brake Components",
  "Filters & Fluids",
  "Batteries",
  "Suspension Parts",
  "Electrical Components",
  "Tires & Accessories",
] as const;
export type Category = (typeof categories)[number];
export type Product = {
  id: string;
  name: string;
  category: Category;
  brand: string;
  image: string;
  price: number;
  description: string;
  availability: "Sample in stock" | "Sample low stock" | "Sample on request";
};
const entries: [string, Category, string, number, string, string][] = [
  [
    "Iridium Spark Plug Set",
    "Engine Parts",
    "Ignis",
    1850,
    "Four precision spark plugs for consistent ignition. Confirm thread and heat range for your engine.",
    "spark",
  ],
  [
    "Serpentine Drive Belt",
    "Engine Parts",
    "Roadline",
    950,
    "Durable multi-rib accessory belt. Length and rib count depend on your vehicle.",
    "belt",
  ],
  [
    "Engine Water Pump",
    "Engine Parts",
    "Motora",
    2850,
    "Replacement coolant circulation pump. Gasket and application matching required.",
    "pump",
  ],
  [
    "Ceramic Brake Pads",
    "Brake Components",
    "Stopform",
    2400,
    "Low-dust front brake pad set for comfortable everyday stopping.",
    "brake",
  ],
  [
    "Ventilated Brake Rotor",
    "Brake Components",
    "Stopform",
    3200,
    "Single ventilated front disc. Diameter and mounting pattern vary by application.",
    "rotor",
  ],
  [
    "DOT 4 Brake Fluid",
    "Brake Components",
    "Roadline",
    480,
    "500 mL brake fluid for compatible hydraulic braking systems.",
    "fluid",
  ],
  [
    "Full Synthetic 5W-30",
    "Filters & Fluids",
    "Motora",
    2200,
    "Four-liter synthetic engine oil. Always check the manufacturer specification.",
    "oil",
  ],
  [
    "Engine Oil Filter",
    "Filters & Fluids",
    "Pureflow",
    350,
    "Spin-on filter designed to capture contaminants during oil circulation.",
    "filter",
  ],
  [
    "Cabin Air Filter",
    "Filters & Fluids",
    "Pureflow",
    650,
    "Replacement cabin filter for cleaner airflow inside your vehicle.",
    "airfilter",
  ],
  [
    "Long-life Coolant",
    "Filters & Fluids",
    "Motora",
    720,
    "One-liter ready-mix coolant. Check compatibility before mixing products.",
    "fluid",
  ],
  [
    "Maintenance-free Battery 45Ah",
    "Batteries",
    "Voltcore",
    4800,
    "12 V starting battery. Verify terminal layout and tray dimensions.",
    "battery",
  ],
  [
    "AGM Battery 70Ah",
    "Batteries",
    "Voltcore",
    9800,
    "12 V AGM replacement for compatible vehicles and charging systems.",
    "battery",
  ],
  [
    "Front Shock Absorber",
    "Suspension Parts",
    "Ridewell",
    3600,
    "Single replacement damper to help restore controlled suspension movement.",
    "shock",
  ],
  [
    "Stabilizer Link Pair",
    "Suspension Parts",
    "Ridewell",
    1250,
    "Two anti-roll bar links. Fitment varies by chassis and model year.",
    "link",
  ],
  [
    "Lower Control Arm",
    "Suspension Parts",
    "Ridewell",
    2800,
    "Replacement suspension arm with bushings for matched vehicle applications.",
    "arm",
  ],
  [
    "LED Headlight Pair",
    "Electrical Components",
    "LumaDrive",
    1950,
    "Sample LED bulb pair. Confirm housing compatibility and road-use requirements.",
    "bulb",
  ],
  [
    "Alternator Assembly",
    "Electrical Components",
    "Voltcore",
    6500,
    "Replacement charging unit. Output rating and mounts require verification.",
    "pump",
  ],
  [
    "All-season Tire 195/65 R15",
    "Tires & Accessories",
    "Roadline",
    3450,
    "Single touring tire for compatible wheels. Confirm load and speed ratings.",
    "tire",
  ],
  [
    "Beam Wiper Pair",
    "Tires & Accessories",
    "Clearpath",
    750,
    "Flexible replacement wipers for a clean sweep. Select vehicle-specific lengths.",
    "wiper",
  ],
  [
    "Digital Tire Gauge",
    "Tires & Accessories",
    "Roadline",
    450,
    "Compact pressure gauge for convenient routine tire checks.",
    "gauge",
  ],
];
export const products: Product[] = entries.map(
  ([name, category, brand, price, description, art], i) => ({
    id: `SA-${String(i + 1).padStart(3, "0")}`,
    name,
    category,
    brand,
    price,
    description,
    image: `/images/parts/${art}.svg`,
    availability:
      i % 7 === 6
        ? "Sample on request"
        : i % 5 === 4
          ? "Sample low stock"
          : "Sample in stock",
  }),
);
