import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { business } from "@/lib/config";
import { Brand } from "./brand";
import { navigation } from "@/lib/navigation";
export function DeveloperCredit() {
  return (
    <p className="developer-credit">
      Built by <span>NinjaTech Guys</span>
    </p>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Brand />
            <p>
              Care for your car.
              <br />
              Confidence for the road ahead.
            </p>
            <span className="eyebrow muted">
              A fictional automotive business
            </span>
          </div>
          <div>
            <h3>Explore</h3>
            {navigation.slice(1).map(([name, url]) => (
              <Link key={url} href={url}>
                {name} <ArrowUpRight size={13} />
              </Link>
            ))}
          </div>
          <div>
            <h3>Get in touch</h3>
            <a href={business.phoneHref}>{business.phone}</a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <p className="fine-print">Placeholder contact details</p>
          </div>
          <div>
            <h3>Workshop hours</h3>
            <p>{business.hours}</p>
            <p>Sunday · Closed</p>
            <p className="fine-print">Sample hours · Philippine time</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} SAMPLE AUTO. Portfolio demonstration.
          </p>
          <DeveloperCredit />
        </div>
      </div>
    </footer>
  );
}
