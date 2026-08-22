import Link from "next/link";
import {
  ArrowRight,
  Binoculars,
  BracketsCurly,
  CheckCircle,
  Cloud,
  Eye,
  Fingerprint,
  GitBranch,
  LockKey,
  Pulse,
  ShieldCheck,
  Sparkle,
  Stack,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./products.module.css";

export const metadata = {
  title: "Products, production systems, and research",
  description:
    "Explore AnarchI Technologies production systems, in-development products, and research tracks: Wallet Safety Reports, Anar-Core, Cloud Spine, Pulse, Chronicle, Switchboard, Forge, Cerberus, Watchtower, and Project Chimera.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "AnarchI Technologies systems and product roadmap",
    description: "Canonical production facts, clear development status, and the deeper product horizon.",
    url: "https://anarchi-tech.com/products",
    type: "website",
  },
};

const production = [
  {
    id: "wsrs",
    icon: ShieldCheck,
    status: "Public production",
    name: "Wallet Safety Report Service",
    summary: "Read-only public-wallet analysis with tiered delivery, encrypted fulfillment, and evidence-aware freshness.",
    facts: [
      "The full analysis pipeline runs for every order; the purchased tier controls the delivered projection.",
      "Basic, Standard, and Deeper Look formats are $5, $25, and $30 with no subscription.",
      "Customer reports are encrypted and delivered as an interactive digital report through a secure email link.",
      "A report records compilation-time evidence and becomes stale for current provenance after 28 days.",
    ],
    boundary: "No seed phrase, private key, custody, signing, asset transfer, or guaranteed safety finding.",
    href: "/wallet-safety-report",
    cta: "Explore the report",
  },
  {
    id: "anar-core",
    icon: Fingerprint,
    status: "Production authority runtime",
    name: "Anar-Core",
    summary: "The canonical identity, organization, tenant, membership, entitlement, and session authority layer.",
    facts: [
      "Typed identifiers distinguish identities, accounts, organizations, tenants, memberships, sessions, and authority definitions.",
      "Roles and entitlements are versioned; grants are resolved through explicit assignments rather than loose labels.",
      "Adapter bindings narrow an entitlement to an operation, resource scope, policy version, and exact authorization state.",
      "Sessions bind identity, personal account, membership, organization, tenant, authorization version, and entitlement version.",
    ],
    boundary: "The runtime is live; its public profile and credential-enrollment surface will follow the frozen authority contract.",
    href: "/about",
    cta: "Read the principles",
  },
  {
    id: "spine",
    icon: Cloud,
    status: "Production capability boundary",
    name: "Cloud Spine + Switchboard",
    summary: "A fail-closed boundary between authenticated subjects and the specific operations a service may perform.",
    facts: [
      "Cloud Spine consumes normalized Anar-Core authority rather than inventing a second identity model.",
      "Boundary agreement checks identity, account, organization, tenant, session, versions, operation, entitlement, policy, and resource scope.",
      "Switchboard provides secured ingress and routes only to explicitly configured service destinations.",
      "Production and staging boundaries are isolated and independently health-checked.",
    ],
    boundary: "A valid identity alone is never treated as permission; the exact active binding must agree at the boundary.",
  },
  {
    id: "pulse-chronicle",
    icon: Pulse,
    status: "Production lifecycle + evidence",
    name: "Pulse + Chronicle",
    summary: "A canonical runtime pair for lifecycle signals and durable operational evidence.",
    facts: [
      "Pulse coordinates bounded lifecycle signals through a dedicated runtime channel.",
      "Chronicle preserves durable evidence separately from transient process state.",
      "The services communicate through constrained local interfaces rather than public administrative endpoints.",
      "Service isolation, dedicated users, restricted write paths, and restart policies are part of the production frame.",
    ],
    boundary: "Operational evidence is designed for traceability; it is not a public activity feed or customer-data marketplace.",
  },
];

const development = [
  {
    icon: BracketsCurly,
    status: "In development",
    name: "AnarchI Forge",
    pitch: "An original creation environment for software, media, workflows, and deterministic tools with less rented-rail dependence.",
    detail: "Forge is intended to unify project framing, repeatable build stages, provenance, release evidence, and customer-owned output without obscuring which component changed what.",
    next: "Current focus: contract-driven build execution, release evidence, and safe composition of bounded capabilities.",
  },
  {
    icon: Stack,
    status: "In development",
    name: "Cerberus Agent Systems",
    pitch: "Constrained agent runtimes built around explicit scope, observable decisions, and a reliable stop condition.",
    detail: "Cerberus separates identity, authority, capability requirements, runtime state, and evidence so an agent cannot silently turn a broad goal into unlimited permission.",
    next: "Current focus: adapter contracts, policy-enforced operations, runtime flightline, and bounded deployment controls.",
  },
  {
    icon: Eye,
    status: "In development",
    name: "Watchtower",
    pitch: "A bounded observer that watches declared health and evidence signals without becoming a hidden control plane.",
    detail: "Watchtower is framed to detect drift, missed heartbeats, stale proof, and policy-relevant changes while keeping observation separate from authority to act.",
    next: "Current focus: observation contracts, health summaries, alert evidence, and low-noise escalation paths.",
  },
  {
    icon: UsersThree,
    status: "Concept architecture",
    name: "Founder Second Brain",
    pitch: "A founder-operations layer for inbox triage, customer context, decisions, follow-through, and durable institutional memory.",
    detail: "The goal is not a chat wrapper. It is a verifiable operating surface where messages, commitments, tasks, and decisions keep their source context and responsible owner.",
    next: "Current focus: identity-aware context, permission boundaries, evidence-linked decisions, and exportable memory.",
  },
  {
    icon: GitBranch,
    status: "Concept architecture",
    name: "Deterministic Social Runtime",
    pitch: "Consistent persona and behavior systems for creators, games, brands, and agents without relying on an unconstrained live model for every decision.",
    detail: "The runtime is intended to make voice, memory cues, allowed behavior, prohibited behavior, and state transitions explicit enough to inspect and version.",
    next: "Current focus: authored behavior packs, continuity rules, deterministic transitions, and safe external adapters.",
  },
];

const research = [
  {
    icon: Sparkle,
    name: "Project Chimera",
    copy: "Long-range research into agency, continuity, responsibility, non-biological intelligence, and the moral weight of systems that may become more than tools.",
  },
  {
    icon: Binoculars,
    name: "DeFi Safety Lab",
    copy: "Simulation-first protocol research, public-risk source study, read-only spread observation, and educational tooling that does not imply custody or automated trading authority.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AnarchI Technologies products and systems",
  itemListElement: [...production, ...development, ...research].map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": item.id === "wsrs" ? "Service" : "SoftwareApplication",
      name: item.name,
      description: item.summary || item.pitch || item.copy,
      provider: { "@type": "Organization", name: "AnarchI Technologies", url: "https://anarchi-tech.com" },
    },
  })),
};

export default function ProductsPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className={styles.hero}>
        <p>Systems, products, and research</p>
        <h1>A deeper body of work.</h1>
        <span>
          Explore what is running now, what is being built, and what remains a research direction.
          Status is explicit. Production claims are limited to systems that are actually deployed.
        </span>
      </section>

      <nav className={styles.jumpNav} aria-label="Product page sections">
        <a href="#production">Production</a>
        <a href="#development">In development</a>
        <a href="#research">Research</a>
        <a href="#method">How we build</a>
      </nav>

      <section className={styles.section} id="production">
        <header><div><p>Canonical facts</p><h2>In production now.</h2></div><span>{production.length} deployed system families</span></header>
        <div className={styles.productionList}>
          {production.map(({ icon: Icon, ...item }) => (
            <article key={item.name} id={item.id}>
              <div className={styles.productIdentity}><Icon size={31} weight="duotone" /><span><small>{item.status}</small><h3>{item.name}</h3></span></div>
              <p className={styles.summary}>{item.summary}</p>
              <ul>{item.facts.map((fact) => <li key={fact}><CheckCircle size={17} weight="fill" />{fact}</li>)}</ul>
              <div className={styles.boundary}><LockKey size={18} weight="duotone" /><p><strong>Boundary:</strong> {item.boundary}</p></div>
              {item.href ? <Link href={item.href}>{item.cta} <ArrowRight weight="bold" /></Link> : null}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="development">
        <header><div><p>Active product horizon</p><h2>In development.</h2></div><span>Descriptions are directional, not release promises</span></header>
        <div className={styles.developmentGrid}>
          {development.map(({ icon: Icon, ...item }) => (
            <article key={item.name}>
              <div className={styles.productIdentity}><Icon size={27} weight="duotone" /><span><small>{item.status}</small><h3>{item.name}</h3></span></div>
              <strong>{item.pitch}</strong>
              <p>{item.detail}</p>
              <div className={styles.nextLine}>{item.next}</div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="research">
        <header><div><p>Research tracks</p><h2>Questions worth carrying.</h2></div><span>Not public checkout products</span></header>
        <div className={styles.researchGrid}>
          {research.map(({ icon: Icon, name, copy }) => (
            <article key={name}><Icon size={29} weight="duotone" /><div><h3>{name}</h3><p>{copy}</p></div></article>
          ))}
        </div>
      </section>

      <section className={styles.method} id="method">
        <div><p>How AnarchI builds</p><h2>Identity → authority → execution → evidence.</h2></div>
        <ol>
          <li><span>01</span><div><strong>Name the subject.</strong><p>Know which identity, account, organization, tenant, and membership are in scope.</p></div></li>
          <li><span>02</span><div><strong>Bound the authority.</strong><p>Resolve versioned roles, entitlements, operations, prohibitions, and resource scope.</p></div></li>
          <li><span>03</span><div><strong>Execute visibly.</strong><p>Keep the capability narrow, deterministic where possible, and stoppable when reality diverges.</p></div></li>
          <li><span>04</span><div><strong>Preserve evidence.</strong><p>Record what happened, why it was allowed, what changed, and where the result came from.</p></div></li>
        </ol>
      </section>
    </main>
  );
}
