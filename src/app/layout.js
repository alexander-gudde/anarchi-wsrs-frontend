import "./globals.css";
import SiteNav from "./components/SiteNav";
import Script from "next/script";
export const metadata = {
  metadataBase: new URL("https://anarchi-tech.com"),
  title: {
    default: "AnarchI Technologies | Truth verified. Trust earned.",
    template: "%s | AnarchI Technologies",
  },
  description: "Deterministic software and read-only wallet evidence built with clear boundaries, visible provenance, and customer control.",
  applicationName: "AnarchI Technologies",
  authors: [{ name: "AnarchI Technologies", url: "https://anarchi-tech.com" }],
  creator: "AnarchI Technologies",
  publisher: "AnarchI Technologies",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anarchi-tech.com",
    siteName: "AnarchI Technologies",
    title: "AnarchI Technologies | Truth verified. Trust earned.",
    description: "Deterministic software, visible evidence, and customer-controlled wallet safety reports.",
    images: [{ url: "/brand/anarchi-hero-banner.png", width: 1936, height: 808, alt: "AnarchI Technologies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnarchI Technologies | Truth verified. Trust earned.",
    description: "Deterministic software, visible evidence, and customer-controlled wallet safety reports.",
    images: ["/brand/anarchi-hero-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: "/favicon.svg",
  },
};
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {MEASUREMENT_ID && (
          <> 
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${MEASUREMENT_ID}', { send_page_view: true });
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6HQFS83PH3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6HQFS83PH3');
          `}
        </Script>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}

