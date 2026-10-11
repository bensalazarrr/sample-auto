import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { PageIntro } from "@/components/content";
import { ContactForms } from "@/components/forms";
import { business, messengerLink } from "@/lib/config";
export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Try a local appointment request or auto parts inquiry. All contact details and submissions are demonstrations only.",
  openGraph: {
    title: "Contact & Booking | SAMPLE AUTO",
    description:
      "Start a conversation about your car. Frontend-only booking and inquiry demonstrations.",
  },
};
export default function Contact() {
  const messenger = messengerLink();
  return (
    <>
      <PageIntro
        label="LET’S TALK ABOUT YOUR CAR"
        title="Good care starts"
        accent="with a conversation."
        description="A service question, a part you’re looking for, or time for a checkup. You’re in the right place."
      />
      <section className="container contact-layout">
        <aside className="contact-info">
          <h2>Come say hello.</h2>
          <p>A neighborhood workshop concept, based in the Philippines.</p>
          <div className="contact-item">
            <Phone />
            <div>
              <h3>Give us a call</h3>
              <a href={business.phoneHref}>{business.phone}</a>
              <small>Placeholder number · not a real business line</small>
            </div>
          </div>
          <div className="contact-item">
            <Mail />
            <div>
              <h3>Drop us a line</h3>
              <a href={`mailto:${business.email}`}>{business.email}</a>
              <small>Reserved demonstration email domain</small>
            </div>
          </div>
          <div className="contact-item">
            <MapPin />
            <div>
              <h3>Our fictional location</h3>
              <p>{business.address}</p>
              <small>Illustrative address · no physical shop</small>
            </div>
          </div>
          <div className="contact-item">
            <Clock />
            <div>
              <h3>Sample opening hours</h3>
              <p>
                {business.hours}
                <br />
                Sunday: Closed
              </p>
              <small>Philippine Standard Time (UTC+8)</small>
            </div>
          </div>
          <a className="button secondary full" href={business.phoneHref}>
            <Phone size={17} />
            Call placeholder number <ArrowUpRight size={16} />
          </a>
          {messenger ? (
            <a
              className="button secondary full"
              href={messenger}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} />
              Open Messenger
            </a>
          ) : (
            <div className="messenger-placeholder">
              <MessageCircle size={19} />
              <div>
                <strong>Messenger isn’t connected</strong>
                <p>Demo placeholder · no business account configured.</p>
              </div>
            </div>
          )}
          <div
            className="location-art"
            role="img"
            aria-label="Decorative location illustration, not a real map"
          >
            <span className="map-road one" />
            <span className="map-road two" />
            <span className="map-road three" />
            <MapPin size={35} />
            <strong>SAMPLE AUTO</strong>
            <small>FICTIONAL WORKSHOP · PHILIPPINES</small>
          </div>
        </aside>
        <Suspense
          fallback={
            <div className="form-panel" role="status">
              Loading demonstration forms…
            </div>
          }
        >
          <ContactForms />
        </Suspense>
      </section>
    </>
  );
}
