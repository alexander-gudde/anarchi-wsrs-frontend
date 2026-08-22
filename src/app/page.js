import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Fingerprint,
  LockKey,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import SystemsCarousel from "./components/SystemsCarousel";
import "./home.css";

export const metadata = {
  title: "Deterministic software. Verifiable evidence.",
  description:
    "AnarchI Technologies builds deterministic software, practical digital safety tools, and customer-controlled systems. Wallet Safety Reports are our first active service.",
  alternates: { canonical: "/" },
};

const principles = [
  {
    icon: ShieldCheck,
    label: "Security by principle",
    copy: "Protection is not a feature we bolt on. It is the condition for building at all.",
  },
  {
    icon: Fingerprint,
    label: "Evidence over opinion",
    copy: "Findings should be traceable to observations, provenance, and visible limits.",
  },
  {
    icon: Eye,
    label: "Transparency by default",
    copy: "Clear reasoning, clear boundaries, and no mystery about what a system actually does.",
  },
];

const futureProducts = [
  ["AnarchI Forge", "Original creation systems and developer utilities."],
  ["Cerberus", "Constrained agent runtimes with observable execution."],
  ["Project Chimera", "Long-range research into continuity, agency, and responsibility."],
];

// Reserved placements remain completely absent from the public layout until an
// approved, subject-relevant partner creative is ready.
const partnerPlacements = [];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AnarchI Technologies",
  url: "https://anarchi-tech.com",
  logo: "https://anarchi-tech.com/brand/anarchi-gilded-lockup.png",
  description: "Deterministic software, visible evidence, and customer-controlled digital safety systems.",
  email: "admin@anarchi-tech.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3850 S Meridian Ave",
    addressLocality: "Wichita",
    addressRegion: "KS",
    postalCode: "67217",
    addressCountry: "US",
  },
};

export default function Home() {
  return (
    <main className="home-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
      <section className="brand-banner" aria-labelledby="brand-banner-title">
        <Image
          src="/brand/anarchi-hero-banner.png"
          alt="AnarchI Technologies — truth verified, freedom respected, future built"
          width={2048}
          height={768}
          priority
          sizes="100vw"
        />
        <div className="brand-banner-shade" />
        <div className="brand-banner-copy">
          <p className="eyebrow">Deterministic systems · visible proof</p>
          <h1 id="brand-banner-title">We build systems that earn trust.</h1>
          <p>
            Original software for people who want clear reasoning, customer control,
            and evidence they can inspect.
          </p>
          <div className="hero-actions">
            <Link className="gold-button" href="/wallet-safety-report#start-report">
              Start a wallet report <ArrowRight weight="bold" aria-hidden="true" />
            </Link>
            <Link className="quiet-button" href="/products">Explore our systems</Link>
          </div>
        </div>
      </section>

      <section className="home-section intro-section">
        <div>
          <p className="eyebrow">AnarchI Technologies</p>
          <h2>Technology should serve people, not quietly enclose them.</h2>
        </div>
        <p className="section-lede">
          We build practical tools with explicit boundaries. Our systems should explain what
          they observed, what they changed, and where certainty ends. The first live expression
          of that principle is the Wallet Safety Report Service.
        </p>
      </section>

      <section className="principle-grid" aria-label="AnarchI operating principles">
        {principles.map(({ icon: Icon, label, copy }) => (
          <article key={label}>
            <Icon size={27} weight="duotone" aria-hidden="true" />
            <div>
              <h3>{label}</h3>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </section>

      <SystemsCarousel />

      <section className="home-section wsrs-feature">
        <div className="feature-copy">
          <p className="eyebrow">Live service</p>
          <h2>Wallet evidence, without custody.</h2>
          <p>
            A read-only analysis of a public wallet address: risk signals, approvals,
            counterparties, source provenance, and customer-controlled next steps.
          </p>
          <ul className="boundary-list">
            <li><LockKey size={20} weight="duotone" /> No seed phrase, private key, or wallet password.</li>
            <li><Fingerprint size={20} weight="duotone" /> No custody, signing, or movement of funds.</li>
            <li><Sparkle size={20} weight="duotone" /> Encrypted digital delivery after confirmed payment.</li>
          </ul>
          <Link className="text-link" href="/wallet-safety-report">
            See exactly what the report produces <ArrowRight weight="bold" />
          </Link>
        </div>
        <div className="price-constellation" aria-label="Wallet report prices">
          <article>
            <span>Basic</span>
            <strong>$5</strong>
            <p>Priority findings and immediate actions.</p>
          </article>
          <article className="featured-price">
            <span>Standard</span>
            <strong>$25</strong>
            <p>Full evidence, category map, and provenance.</p>
          </article>
          <article>
            <span>Deeper look</span>
            <strong>$30</strong>
            <p>Standard report plus deeper recommendations.</p>
          </article>
        </div>
      </section>

      <section className="home-section future-section">
        <div className="future-heading">
          <p className="eyebrow">The larger body of work</p>
          <h2>One live product. A wider horizon.</h2>
        </div>
        <div className="future-list">
          {futureProducts.map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      {partnerPlacements.length > 0 ? (
        <section className="partner-strip" aria-label="Relevant partner placements">
          {partnerPlacements.map((placement) => (
            <a key={placement.name} href={placement.href} rel="sponsored noreferrer">
              <span>Sponsored · reviewed partner</span>
              <strong>{placement.name}</strong>
              <p>{placement.copy}</p>
            </a>
          ))}
        </section>
      ) : null}

      <footer className="site-footer">
        <div>
          <strong>AnarchI Technologies</strong>
          <p>Truth verified. Trust earned.</p>
          <a href="mailto:admin@anarchi-tech.com">admin@anarchi-tech.com</a>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/privacy">Privacy</Link>
          <Link href="/data-proprietary-policy">Data & proprietary information</Link>
          <Link href="/delivery-policy">Delivery</Link>
          <Link href="/refund-policy">Refunds</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </footer>
    </main>
  );
}
