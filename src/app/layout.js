import "./globals.css";
import SiteNav from "./components/SiteNav";
import Script from "next/script";
export const metadata = {
  title: "AnarchI Technologies",
  description: "Deterministic wallet safety reports and practical software tools.",
  icons: {
    icon: "/favicon.svg",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
        </Script><SiteNav />{children}</body>
    </html>
  );
}


