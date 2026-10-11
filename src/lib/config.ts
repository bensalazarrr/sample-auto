export const business = {
  name: "SAMPLE AUTO",
  siteUrl: "https://sample-auto.vercel.app",
  phone: "+63 900 000 0000",
  phoneHref: "tel:+639000000000",
  email: "hello@sampleauto.example",
  messengerUrl: "",
  address: "123 Sample Avenue, Quezon City, Philippines",
  hours: "Monday–Saturday · 8:00 AM–6:00 PM",
};
export const photos = {
  hero: "/images/hero.jpg",
  workshop: "/images/workshop.jpg",
  road: "/images/road.jpg",
};
export function messengerLink() {
  try {
    const url = new URL(business.messengerUrl);
    return url.protocol === "https:" &&
      url.hostname === "m.me" &&
      url.pathname.length > 1
      ? url.href
      : null;
  } catch {
    return null;
  }
}
