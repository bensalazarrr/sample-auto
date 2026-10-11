import type { Metadata } from "next";
import { PageIntro } from "@/components/content";
import { Catalog } from "@/components/catalog";
export const metadata: Metadata = {
  title: "Auto Parts",
  description:
    "Explore 20 demonstration automotive parts with PHP prices, search, filters, and vehicle-fitment inquiries.",
  openGraph: {
    title: "Auto Parts | SAMPLE AUTO",
    description:
      "The right parts for the road ahead. Explore our demonstration catalog.",
  },
};
export default function Parts() {
  return (
    <>
      <PageIntro
        label="THE PARTS COUNTER"
        title="The right part."
        accent="A better drive."
        description="Everyday essentials to keep your car at its best. Explore the catalog, check the details, and ask us about the right fit."
      />
      <Catalog />
    </>
  );
}
