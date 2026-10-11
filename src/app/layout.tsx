import { business } from "@/lib/config";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";
import "@fontsource-variable/manrope";
export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "SAMPLE AUTO — Care for your car. Confidence for your journey.",
    template: "%s | SAMPLE AUTO",
  },
  description:
    "A premium fictional Philippine automotive workshop. Explore services, replacement parts, and a frontend-only booking demonstration.",
  openGraph: {
    title: "SAMPLE AUTO — Service. Parts. Peace of mind.",
    description:
      "Thoughtful car care and quality parts. A fictional automotive portfolio website.",
    type: "website",
    locale: "en_PH",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "SAMPLE AUTO automotive services and parts",
      },
    ],
  },
  robots: { index: false, follow: false },
};
const themeScript = `(function(){try{document.documentElement.dataset.theme=localStorage.getItem('sample-auto-theme')==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}})()`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
