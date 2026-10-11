import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { PageIntro, ServiceIcon, BookingCTA } from "@/components/content";
import { services } from "@/data/services";
import { peso } from "@/lib/utils";
export const metadata: Metadata = {
  title: "Automotive Services",
  description:
    "Explore eight automotive maintenance and repair services with sample PHP estimates and typical inclusions.",
  openGraph: {
    title: "Automotive Services | SAMPLE AUTO",
    description:
      "From routine care to a closer look. Explore our workshop services.",
  },
};
export default function Services() {
  return (
    <>
      <PageIntro
        label="WORKSHOP SERVICES"
        title="Every detail matters."
        accent="Every mile counts."
        description="Routine care or a closer look under the hood. Start with the service your car needs, and leave the guesswork behind."
      />
      <div className="container">
        <p className="notice">
          <Info size={19} /> All prices are sample starting estimates, subject
          to vehicle inspection. Parts and additional repairs may cost extra.
        </p>
        <div className="services-catalog">
          {services.map((s, i) => (
            <article className="service-detail" key={s.id}>
              <div className="service-detail-top">
                <span className="service-icon">
                  <ServiceIcon name={s.icon} size={30} />
                </span>
                <span className="service-number">0{i + 1}</span>
              </div>
              <h2>{s.title}</h2>
              <p>{s.description}</p>
              <h3>Typical inclusions</h3>
              <ul>
                {s.inclusions.map((item) => (
                  <li key={item}>
                    <Check size={15} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="service-detail-bottom">
                <div>
                  <small>Sample starting price</small>
                  <strong>{peso(s.price)}</strong>
                </div>
                <Link
                  className="button secondary small"
                  href={`/contact?service=${s.id}`}
                >
                  Book This Service <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <section className="service-process">
          <h2>Simple from the start.</h2>
          <div>
            {[
              [
                "01",
                "Tell us what’s going on",
                "Choose a service and share a few details about your vehicle.",
              ],
              [
                "02",
                "Understand your options",
                "A real workshop would inspect your car and explain the estimate.",
              ],
              [
                "03",
                "Get back to your day",
                "Approve the work with a clear understanding of the next steps.",
              ],
            ].map(([n, t, d]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
          <p className="fine-print">
            Illustrative workflow. This website does not accept actual
            appointments.
          </p>
        </section>
      </div>
      <BookingCTA />
    </>
  );
}
