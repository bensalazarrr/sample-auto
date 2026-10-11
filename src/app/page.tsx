import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  ShieldCheck,
  Wrench,
  MessageCircle,
  Star,
} from "lucide-react";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/motion";
import { BookingCTA, SectionHeading, ServiceCard } from "@/components/content";
import { ProductCard } from "@/components/product-card";
import { services } from "@/data/services";
import { products } from "@/data/products";
import { photos } from "@/lib/config";
export default function Home() {
  return (
    <>
      <section className="hero">
        <Photo
          src={photos.hero}
          alt="Dark sports sedan traveling along a highway"
          priority
          sizes="100vw"
          className="hero-photo"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <Reveal>
            <p className="eyebrow">
              <span />
              YOUR CAR. OUR COMMITMENT.
            </p>
            <h1>
              Built for the road.
              <br />
              Cared for <em>here.</em>
            </h1>
            <p className="hero-description">
              Expert care. Quality parts. Honest service.
              <br />
              Everything your car needs, from people who care.
            </p>
            <div className="button-row">
              <Link href="/contact" className="button">
                Book a Service <ArrowUpRight size={18} />
              </Link>
              <Link href="/parts" className="button hero-outline">
                Explore Parts <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-assurance">
              <span>
                <Check size={14} /> Thoughtful workmanship
              </span>
              <span>
                <Check size={14} /> Clear, upfront estimates
              </span>
            </div>
          </Reveal>
        </div>
        <div className="hero-foot container">
          <span>PHILIPPINES · YOUR NEIGHBORHOOD WORKSHOP</span>
          <span>
            GOOD CARE. EVERY MILE. <span className="red">↘</span>
          </span>
        </div>
      </section>
      <section className="trust-strip">
        <div className="container trust-grid">
          <div>
            <strong>
              10<span>+</span>
            </strong>
            <p>Years of care</p>
          </div>
          <div>
            <strong>
              2,500<span>+</span>
            </strong>
            <p>Vehicles looked after</p>
          </div>
          <div>
            <strong>
              98<span>%</span>
            </strong>
            <p>Customer satisfaction</p>
          </div>
          <div className="trust-note">
            <ShieldCheck size={28} />
            <p>
              Small details.
              <br />A big difference.
            </p>
            <small>Illustrative sample statistics</small>
          </div>
        </div>
      </section>
      <section className="section container">
        <Reveal>
          <SectionHeading
            label="WHAT WE DO"
            title="Good care. Down to the details."
            description="From everyday maintenance to the unexpected, we help you move forward with confidence."
            href="/services"
            link="All services"
          />
          <div className="service-grid">
            {services.slice(0, 4).map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
          <p className="fine-print section-note">
            Sample starting prices. Final estimates depend on vehicle
            inspection.
          </p>
        </Reveal>
      </section>
      <section className="section parts-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              label="THE RIGHT PARTS. THE RIGHT FIT."
              title="Quality you can put into drive."
              description="Explore everyday essentials selected for the way you drive."
              href="/parts"
              link="Browse all parts"
            />
            <div className="product-grid">
              {[products[6], products[3], products[10], products[7]].map(
                (p) => (
                  <ProductCard key={p.id} product={p} />
                ),
              )}
            </div>
            <p className="fine-print section-note">
              Demonstration catalog · Fictional brands, sample availability and
              PHP prices.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section container why-section">
        <Photo
          src={photos.workshop}
          alt="Close-up of an engine belt, pulleys, and mechanical components"
          className="workshop-photo"
        />
        <div>
          <p className="eyebrow">
            <span />
            MORE THAN A QUICK FIX
          </p>
          <h2>
            Your car deserves
            <br />a little more care.
          </h2>
          <p className="section-description">
            We believe a great workshop experience is about more than what
            happens under the hood. It’s about feeling heard, informed, and
            ready for the road.
          </p>
          <div className="values-list">
            {[
              [
                Wrench,
                "Work done with purpose",
                "Careful checks and attention to the details that matter.",
              ],
              [
                ShieldCheck,
                "No guesswork. No surprises.",
                "Clear explanations and estimates before work begins.",
              ],
              [
                MessageCircle,
                "People-first service",
                "Friendly advice, honest conversations, and time for your questions.",
              ],
            ].map(([Icon, title, body]) => {
              const I = Icon as typeof Wrench;
              return (
                <div key={title as string}>
                  <I size={23} />
                  <div>
                    <h3>{title as string}</h3>
                    <p>{body as string}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/about" className="text-link">
            Get to know SAMPLE AUTO <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section testimonials">
        <div className="container">
          <SectionHeading
            label="THE CUSTOMER EXPERIENCE"
            title="Care that speaks for itself."
            description="Fictional stories that illustrate the experience we aim to create."
          />
          <div className="testimonial-grid">
            {[
              [
                "They explained what my car needed in a way I could actually understand. No pressure, just helpful advice.",
                "Marco D.",
                "Routine maintenance",
              ],
              [
                "From the first question to finding the right part, everything felt straightforward and well thought out.",
                "Bea R.",
                "Parts inquiry",
              ],
              [
                "A workshop that makes the small details count. I left feeling confident about my next long drive.",
                "Paolo S.",
                "Brake inspection",
              ],
            ].map(([quote, name, service]) => (
              <article key={name}>
                <div
                  className="stars"
                  role="img"
                  aria-label="Fictional five-star review"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <blockquote>“{quote}”</blockquote>
                <div className="reviewer">
                  <span>{name[0]}</span>
                  <div>
                    <strong>{name}</strong>
                    <small>{service}</small>
                  </div>
                </div>
                <p className="fine-print">
                  Fictional demonstration testimonial
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
