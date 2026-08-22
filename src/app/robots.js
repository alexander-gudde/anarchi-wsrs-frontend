export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/intake", "/account", "/anar-core"],
    },
    sitemap: "https://anarchi-tech.com/sitemap.xml",
    host: "https://anarchi-tech.com",
  };
}
