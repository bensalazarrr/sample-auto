import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Droplets,
  Disc3,
  ScanLine,
  Snowflake,
  Gauge,
  BatteryCharging,
  CircleDot,
  Wrench,
} from "lucide-react";
import { services } from "@/data/services";
import { peso } from "@/lib/utils";
export function ServiceIcon({
  name,
  size = 27,
}: {
  name: string;
  size?: number;
}) {
  const Icon =
    (
      {
        oil: Droplets,
        brake: Disc3,
        diagnostic: ScanLine,
        air: Snowflake,
        suspension: Gauge,
        battery: BatteryCharging,
        tire: CircleDot,
        wrench: Wrench,
      } as const
    )[name as "oil"] || Wrench;
  return <Icon size={size} strokeWidth={1.5} />;
}
export function SectionHeading({
  label,
  title,
  description,
  href,
  link,
}: {
  label: string;
  title: string;
  description?: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span />
          {label}
        </p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {link}
          <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
export function PageIntro({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <div className="page-intro container">
      <p className="eyebrow">
        <span />
        {label}
      </p>
      <h1>
        {title}
        <br />
        <em>{accent}</em>
      </h1>
      <p>{description}</p>
    </div>
  );
}
export function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  return (
    <Link href={`/contact?service=${service.id}`} className="service-card">
      <div className="card-top">
        <ServiceIcon name={service.icon} />
        <span>0{index + 1}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.short}</p>
      <div className="card-bottom">
        <span>From {peso(service.price)}</span>
        <ArrowUpRight size={19} />
      </div>
    </Link>
  );
}
export function BookingCTA() {
  return (
    <section className="container cta-wrap">
      <div className="booking-cta">
        <div>
          <p className="eyebrow">LET’S GET YOU ROAD-READY</p>
          <h2>
            Your next journey
            <br />
            starts with good care.
          </h2>
        </div>
        <div>
          <Link href="/contact" className="button light-button">
            Book a Service <ArrowRight size={18} />
          </Link>
          <p>A little care goes a long way.</p>
        </div>
        <span className="cta-decoration" aria-hidden="true">
          ↗
        </span>
      </div>
    </section>
  );
}
