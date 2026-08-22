"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  Fingerprint,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react";
import styles from "./systems-carousel.module.css";

const systems = [
  {
    icon: ShieldCheck,
    status: "Public production",
    name: "Wallet Safety Report Service",
    copy: "Read-only public-wallet evidence with explicit limits, encrypted delivery, and a freshness model that does not pretend old observations are current truth.",
    detail: "$5 Basic · $25 Standard · $30 Deeper Look",
    href: "/wallet-safety-report",
    cta: "Explore the live service",
  },
  {
    icon: Fingerprint,
    status: "Production authority runtime",
    name: "Anar-Core",
    copy: "Typed identity, organization, tenant, membership, role, entitlement, session, invitation, and hydration records for authority that can be inspected instead of implied.",
    detail: "Live runtime · Public enrollment follows contract freeze",
    href: "/anar-core",
    cta: "Preview the profile projection",
  },
  {
    icon: Cloud,
    status: "Production capability boundary",
    name: "Cloud Spine + Switchboard",
    copy: "Fail-closed routing between an authenticated subject and the exact operation, resource scope, policy version, and entitlement that permit an action.",
    detail: "Production and staging isolated · Independently health-checked",
    href: "/products#spine",
    cta: "Read the canonical facts",
  },
  {
    icon: Sparkle,
    status: "In development",
    name: "AnarchI Forge",
    copy: "A creation environment for deterministic tools, release evidence, provenance, and customer-owned output—with ambition that remains accountable to explicit contracts.",
    detail: "Contract-driven builds · Evidence-aware releases",
    href: "/products#development",
    cta: "See the product horizon",
  },
];

export default function SystemsCarousel() {
  const [active, setActive] = useState(0);
  const item = systems[active];
  const Icon = item.icon;
  const show = (index) => setActive((index + systems.length) % systems.length);

  return (
    <section className={styles.shell} aria-roledescription="carousel" aria-label="AnarchI systems">
      <header className={styles.heading}>
        <div>
          <p>Systems in motion</p>
          <h2>Serious architecture. A little spark.</h2>
        </div>
        <div className={styles.controls}>
          <button type="button" onClick={() => show(active - 1)} aria-label="Previous system">
            <ArrowLeft weight="bold" aria-hidden="true" />
          </button>
          <span aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(systems.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => show(active + 1)} aria-label="Next system">
            <ArrowRight weight="bold" aria-hidden="true" />
          </button>
        </div>
      </header>

      <article className={styles.slide} aria-live="polite">
        <div className={styles.mark}><Icon size={40} weight="duotone" aria-hidden="true" /></div>
        <div className={styles.copy}>
          <small>{item.status}</small>
          <h3>{item.name}</h3>
          <p>{item.copy}</p>
          <strong>{item.detail}</strong>
        </div>
        <Link href={item.href}>{item.cta} <ArrowRight weight="bold" aria-hidden="true" /></Link>
      </article>

      <div className={styles.dots} aria-label="Choose a system">
        {systems.map((system, index) => (
          <button
            key={system.name}
            type="button"
            onClick={() => show(index)}
            aria-label={`Show ${system.name}`}
            aria-current={index === active ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
