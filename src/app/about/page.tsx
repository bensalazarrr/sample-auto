import type { Metadata } from "next";
import { ShieldCheck, HeartHandshake, Wrench } from "lucide-react";
import { PageIntro, BookingCTA, SectionHeading } from "@/components/content";
import { Photo } from "@/components/photo";
import { photos } from "@/lib/config";
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the fictional people and values behind SAMPLE AUTO, a Philippine automotive workshop concept.",
  openGraph: {
    title: "Our Story | SAMPLE AUTO",
    description:
      "Built around cars. Centered on people. Meet our fictional workshop.",
  },
};
export default function About() {
  return (
    <>
      <PageIntro
        label="THE PEOPLE BEHIND THE WORK"
        title="Built around cars."
        accent="Centered on people."
        description="SAMPLE AUTO imagines a better neighborhood workshop: skilled hands, honest conversations, and care that carries you forward."
      />
      <section className="container about-story">
        <Photo
          src={photos.workshop}
          alt="Detailed view of an engine belt and pulleys under an open hood"
          className="about-photo"
        />
        <div>
          <p className="eyebrow">
            <span />
            OUR FICTIONAL STORY
          </p>
          <h2>
            A familiar place.
            <br />A higher standard of care.
          </h2>
          <p>
            The idea for SAMPLE AUTO began with a simple question: what if
            taking care of your car felt as comfortable as talking to a
            neighbor?
          </p>
          <p>
            In our imagined workshop in Quezon City, the answer is a team that
            listens first. We make time to explain a strange noise, help you
            understand a replacement part, and distinguish what needs attention
            today from what can wait.
          </p>
          <p>
            From busy weekday commutes to family trips out of town, we’re here
            for the journeys that make up everyday life.
          </p>
          <p className="fine-print">
            SAMPLE AUTO is a fictional business created for a frontend
            portfolio. Its story, team, location, and service claims are
            illustrative.
          </p>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          label="WHAT DRIVES US"
          title="Good work starts with good values."
        />
        <div className="values-grid">
          {[
            [
              Wrench,
              "Care in the craft",
              "Our mission is to make dependable automotive care feel simple, understandable, and personal.",
            ],
            [
              ShieldCheck,
              "Clarity at every step",
              "Explain the findings. Discuss the options. Make sure the customer understands before any work begins.",
            ],
            [
              HeartHandshake,
              "Respect for your journey",
              "Treat every vehicle with attention and every customer’s time, questions, and budget with respect.",
            ],
          ].map(([Icon, title, body]) => {
            const I = Icon as typeof Wrench;
            return (
              <article key={title as string}>
                <I size={30} />
                <h3>{title as string}</h3>
                <p>{body as string}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="about-banner">
        <Photo
          src={photos.road}
          alt="White performance car inside an automotive workshop"
          sizes="100vw"
        />
        <div className="container">
          <p className="eyebrow">OUR COMMITMENT</p>
          <h2>
            Do the work with care.
            <br />
            Stand behind the conversation.
          </h2>
          <p>
            Thoughtful workmanship. Clear recommendations.
            <br />A customer experience built on mutual trust.
          </p>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          label="MEET THE WORKSHOP"
          title="Real care starts with people."
          description="Meet the fictional team behind our workshop concept."
        />
        <div className="team-grid">
          {[
            [
              "MR",
              "Miguel Reyes",
              "Workshop Lead",
              "A methodical problem solver who believes a careful inspection is the start of every good repair.",
            ],
            [
              "AT",
              "Andrea Tan",
              "Service Advisor",
              "A clear communicator who turns technical findings into practical, understandable next steps.",
            ],
            [
              "JC",
              "Jules Cruz",
              "Parts Specialist",
              "A detail-focused guide to matching the right component with the right vehicle.",
            ],
          ].map(([initials, name, role, bio]) => (
            <article key={name}>
              <div className="team-portrait">
                <span>{initials}</span>
                <Wrench size={120} strokeWidth={0.6} aria-hidden="true" />
              </div>
              <p className="eyebrow">{role}</p>
              <h3>{name}</h3>
              <p>{bio}</p>
              <small className="fine-print">Fictional team profile</small>
            </article>
          ))}
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
