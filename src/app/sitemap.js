const base = "https://anarchi-tech.com";

const routes = [
  ["", "weekly", 1],
  ["/wallet-safety-report", "weekly", 1],
  ["/products", "weekly", 0.9],
  ["/about", "monthly", 0.8],
  ["/faq", "monthly", 0.8],
  ["/public-index", "weekly", 0.75],
  ["/contact", "monthly", 0.6],
  ["/privacy", "yearly", 0.5],
  ["/data-proprietary-policy", "yearly", 0.5],
  ["/terms", "yearly", 0.5],
  ["/delivery-policy", "yearly", 0.5],
  ["/refund-policy", "yearly", 0.5],
  ["/risk-policy", "yearly", 0.5],
  ["/legal", "yearly", 0.5],
];

export default function sitemap() {
  return routes.map(([path, changeFrequency, priority]) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-08-21T00:00:00.000Z"),
    changeFrequency,
    priority,
    ...(path === "" ? { images: [`${base}/brand/anarchi-hero-banner.png`] } : {}),
  }));
}
