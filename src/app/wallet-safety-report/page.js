"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  AppleLogo,
  ArrowDown,
  ArrowRight,
  Bank,
  Check,
  CreditCard,
  Eye,
  FileLock,
  Fingerprint,
  GoogleLogo,
  LinkSimple,
  LockKey,
  MagnifyingGlass,
  Prohibit,
  ShieldCheck,
  Sparkle,
  StripeLogo,
  Warning,
} from "@phosphor-icons/react";
import { backendApi } from "@/lib/backend-api";
import { event as gtagEvent } from "@/lib/gtag";
import styles from "./report-order.module.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  walletAddress: "",
  chain: "ethereum",
  concerns: "",
  additionalRemarks: "",
  reportPassword: "",
  confirmReportPassword: "",
  recentSuspiciousActivity: "Not sure",
  unknownApprovals: "Not sure",
  highValueAssets: "Not sure",
  usesHardwareWallet: "Not sure",
  privacyAcknowledged: false,
  dataProprietaryAcknowledged: false,
  termsAccepted: false,
  riskPolicyAcknowledged: false,
  internalResearchConsent: false,
};

const chainOptions = [
  ["ethereum", "Ethereum"], ["base", "Base"], ["arbitrum", "Arbitrum"],
  ["optimism", "Optimism"], ["polygon", "Polygon"], ["bsc", "BNB Smart Chain"],
  ["avalanche", "Avalanche"], ["solana", "Solana"], ["bitcoin", "Bitcoin"],
  ["tron", "Tron"], ["ton", "TON"], ["wax", "WAX"], ["eos", "EOS"],
];

const tiers = [
  {
    id: "snapshot",
    label: "Basic Wallet Report",
    price: 5,
    badge: "Fast read",
    description: "Priority findings, risk posture, and immediate customer-controlled actions.",
  },
  {
    id: "standard",
    label: "Full Standard Report",
    price: 25,
    badge: "Complete view",
    description: "Full findings, category map, evidence, provenance, and retention guidance.",
  },
  {
    id: "deep",
    label: "Standard + Deeper Look",
    price: 30,
    badge: "Most context",
    description: "The complete report plus deeper, finding-linked recommendations.",
  },
];

const boundaries = [
  {
    icon: MagnifyingGlass,
    title: "What it can do",
    tone: "can",
    items: ["Read public wallet activity", "Surface approval and counterparty risk", "Trace findings to available sources"],
  },
  {
    icon: Warning,
    title: "What it cannot do",
    tone: "cannot",
    items: ["Guarantee a wallet is safe", "Predict every future threat", "Replace legal, tax, financial, or forensic advice"],
  },
  {
    icon: Prohibit,
    title: "What it refuses to do",
    tone: "never",
    items: ["Collect seed phrases or private keys", "Take custody or move assets", "Sign transactions or hide wallet actions"],
  },
];

const staleWindows = [
  ["Days 0–6", "$20", "Same evidence, newest context", 100],
  ["Days 7–13", "$15", "One week older", 75],
  ["Days 14–20", "$10", "Two weeks older", 50],
  ["Days 21–27", "$5", "Final upgrade window", 25],
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AnarchI Wallet Safety Report Service",
  serviceType: "Read-only public wallet safety analysis",
  provider: { "@type": "Organization", name: "AnarchI Technologies", url: "https://anarchi-tech.com" },
  areaServed: "Worldwide",
  url: "https://anarchi-tech.com/wallet-safety-report",
  offers: [
    { "@type": "Offer", name: "Basic Wallet Report", price: "5.00", priceCurrency: "USD" },
    { "@type": "Offer", name: "Full Standard Report", price: "25.00", priceCurrency: "USD" },
    { "@type": "Offer", name: "Standard Report with Deeper Look", price: "30.00", priceCurrency: "USD" },
  ],
};

function PolicyAcknowledgements({ form, updateField, compact = false }) {
  return (
    <div className={compact ? styles.acknowledgementsCompact : styles.acknowledgements}>
      <label>
        <input
          type="checkbox"
          checked={form.privacyAcknowledged}
          onChange={(event) => updateField("privacyAcknowledged", event.target.checked)}
        />
        <span>I acknowledge the <Link href="/privacy" target="_blank">Privacy Policy</Link> was provided. *</span>
      </label>
      <label>
        <input
          type="checkbox"
          checked={form.dataProprietaryAcknowledged}
          onChange={(event) => updateField("dataProprietaryAcknowledged", event.target.checked)}
        />
        <span>I acknowledge the <Link href="/data-proprietary-policy" target="_blank">Data & Proprietary Information Policy</Link> was provided. *</span>
      </label>
    </div>
  );
}

export default function WalletSafetyReportPage() {
  const [form, setForm] = useState(initialForm);
  const [tier, setTier] = useState("snapshot");
  const [reportStarted, setReportStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const intakeRef = useRef(null);

  const total = tiers.find((item) => item.id === tier)?.price || 5;
  const policyReady = form.privacyAcknowledged && form.dataProprietaryAcknowledged;
  const walletReady = form.walletAddress.trim().length >= 8;
  const canStart = policyReady && walletReady;
  const canCheckout = useMemo(() => (
    canStart &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim().includes("@") &&
    form.reportPassword.length >= 8 &&
    form.reportPassword === form.confirmReportPassword &&
    form.termsAccepted &&
    form.riskPolicyAcknowledged
  ), [canStart, form]);

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function beginReport() {
    if (!canStart) return;
    setReportStarted(true);
    setTimeout(() => intakeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  function buildPayload() {
    return {
      provider: "stripe",
      product: tier === "snapshot" ? "snapshot" : "full",
      recommendations: tier === "deep",
      email: form.email.trim().toLowerCase(),
      customer: {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
      },
      wallet: { chain: form.chain, walletAddress: form.walletAddress.trim() },
      intake: {
        concerns: form.concerns.trim(),
        additionalRemarks: form.additionalRemarks.trim(),
        questionnaire: {
          recentSuspiciousActivity: form.recentSuspiciousActivity,
          unknownApprovals: form.unknownApprovals,
          highValueAssets: form.highValueAssets,
          usesHardwareWallet: form.usesHardwareWallet,
        },
      },
      proof: { requested: false, message: null, signature: null },
      consent: {
        privacyPolicyAcknowledged: form.privacyAcknowledged,
        dataProprietaryAcknowledged: form.dataProprietaryAcknowledged,
        termsAccepted: form.termsAccepted,
        riskPolicyAcknowledged: form.riskPolicyAcknowledged,
        internalResearch: form.internalResearchConsent,
      },
      password: form.reportPassword,
    };
  }

  async function startCheckout() {
    setError("");
    if (!canCheckout) {
      setError("Complete the required intake fields and acknowledgements before continuing to Stripe.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(backendApi("/api/checkout"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Checkout could not be started.");
      if (!data?.url) throw new Error("Stripe Checkout did not return a payment link.");
      try {
        gtagEvent({ action: "checkout_started", category: "purchase", label: tier, params: { provider: "stripe", tier } });
      } catch {}
      try {
        fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source: "checkout_start", email: form.email, payload: { tier, wallet: form.walletAddress } }),
        });
      } catch {}
      window.location.href = data.url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Checkout failed.");
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c") }} />
      <section className={styles.hero} id="start-report">
        <div className={styles.heroEntry}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Wallet Safety Report Service</p>
            <h1>See the wallet.<br />See the evidence.</h1>
            <p className={styles.lede}>
              A read-only analysis of a public wallet address, designed to show what was observed,
              what it may mean, and where certainty stops.
            </p>
          </div>
          <div className={styles.startCard}>
            <div className={styles.startHeading}>
              <span>Start here</span>
              <strong>Public address only</strong>
            </div>
            <label className={styles.walletField}>
              <span>Public wallet address</span>
              <div>
                <Fingerprint size={23} weight="duotone" aria-hidden="true" />
                <input
                  value={form.walletAddress}
                  onChange={(event) => updateField("walletAddress", event.target.value)}
                  placeholder="0x… or supported public address"
                  autoComplete="off"
                />
              </div>
            </label>
            <PolicyAcknowledgements form={form} updateField={updateField} />
            <button type="button" className={styles.startButton} disabled={!canStart} onClick={beginReport}>
              Start a report <ArrowDown weight="bold" aria-hidden="true" />
            </button>
            <p className={styles.gateNote}>Both policy acknowledgements and a public address are required to begin.</p>
          </div>
        </div>
        <aside className={styles.heroPreview} aria-label="Sanitized Basic Wallet Report example">
          <header><span>Basic preview · sanitized</span><small>Illustrative only</small></header>
          <div className={styles.previewAddress}><span>Address</span><strong>0x3a7f…9c2d</strong><span>Network</span><strong>Ethereum</strong></div>
          <div className={styles.previewColumns}>
            <div><span>Executive summary</span><dl><div><dt>Overall risk</dt><dd data-risk="elevated">Elevated</dd></div><div><dt>Exposure events</dt><dd>7</dd></div><div><dt>High-risk approvals</dt><dd>2</dd></div><div><dt>Known counterparties</dt><dd>1</dd></div></dl></div>
            <div><span>Top signals</span><ul><li><i data-risk="high" />Unlimited approval <b>High</b></li><li><i data-risk="high" />Flagged domain <b>High</b></li><li><i data-risk="medium" />Unverified sender <b>Medium</b></li></ul></div>
          </div>
          <footer>This preview shows format and density. Purchased reports include evidence limits and provenance.</footer>
        </aside>
      </section>

      <section className={styles.truthStrip} aria-label="Service safety boundaries">
        <span><Eye weight="duotone" /> Read-only</span>
        <span><LockKey weight="duotone" /> No secrets</span>
        <span><ShieldCheck weight="duotone" /> No custody</span>
        <span><Fingerprint weight="duotone" /> Customer-controlled</span>
      </section>

      <section className={styles.definitionSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The exact promise</p>
          <h2>What this report produces.</h2>
          <p>
            Every purchase runs the complete analysis pipeline. The selected tier controls how much
            of the compiled report is unlocked and delivered—not how carefully the wallet is examined.
          </p>
        </div>
        <div className={styles.producesGrid}>
          <article><span>01</span><h3>Risk posture</h3><p>Prioritized findings with visible confidence and limitations.</p></article>
          <article><span>02</span><h3>Evidence map</h3><p>Observed activity, approvals, counterparties, and source provenance.</p></article>
          <article><span>03</span><h3>Action map</h3><p>Customer-controlled next steps tied back to individual findings.</p></article>
          <article><span>04</span><h3>Freshness record</h3><p>Compilation time and a clear 28-day provenance boundary.</p></article>
        </div>
      </section>

      <section className={styles.boundaryGrid}>
        {boundaries.map(({ icon: Icon, title, items, tone }) => (
          <article key={title} data-tone={tone}>
            <div className={styles.boundaryTitle}><Icon size={24} weight="duotone" /><h3>{title}</h3></div>
            <ul>{items.map((item) => <li key={item}><Check size={15} weight="bold" /> {item}</li>)}</ul>
          </article>
        ))}
      </section>

      <section className={styles.pricingSection} id="pricing">
        <div className={styles.sectionIntroCompact}>
          <div>
            <p className={styles.eyebrow}>Choose the delivered view</p>
            <h2>Three report formats.</h2>
          </div>
          <p>USD · one-time purchase · no subscription</p>
        </div>
        <div className={styles.tierGrid}>
          {tiers.map((item) => (
            <label key={item.id} className={tier === item.id ? styles.tierSelected : styles.tierCard}>
              <input type="radio" name="tier" value={item.id} checked={tier === item.id} onChange={() => setTier(item.id)} />
              <span className={styles.tierBadge}>{item.badge}</span>
              <strong>{item.label}</strong>
              <b>${item.price}</b>
              <p>{item.description}</p>
              <span className={styles.selectTier}>{tier === item.id ? "Selected" : "Select format"}</span>
            </label>
          ))}
        </div>
      </section>

      <section className={styles.examplesSection}>
        <div className={styles.sectionIntroCompact}>
          <div><p className={styles.eyebrow}>Sanitized examples</p><h2>See the shape before you buy.</h2></div>
          <p>Illustrative formats only. No real customer or wallet data.</p>
        </div>
        <div className={styles.exampleGrid}>
          <details>
            <summary><span>Basic · $5</span><strong>Priority snapshot</strong><small>Open example</small></summary>
            <div className={styles.sampleReport}>
              <p>Illustrative wallet · Ethereum</p><h3>Elevated attention</h3>
              <ul><li>2 approvals need review</li><li>No public sanctions match observed</li><li>One recent interaction lacks strong provenance</li></ul>
              <b>First action: review the two exposed token allowances.</b>
            </div>
          </details>
          <details>
            <summary><span>Standard · $25</span><strong>Full evidence report</strong><small>Open example</small></summary>
            <div className={styles.sampleReport}>
              <p>Illustrative wallet · Base + Ethereum</p><h3>Full category map</h3>
              <ul><li>Approval exposure · moderate</li><li>Counterparty history · mixed confidence</li><li>Wallet hygiene · 3 improvements</li><li>Source ledger · 12 observations</li></ul>
              <b>Includes provenance, limitations, and finding-level actions.</b>
            </div>
          </details>
          <details>
            <summary><span>Deeper look · $30</span><strong>Recommendation layer</strong><small>Open example</small></summary>
            <div className={styles.sampleReport}>
              <p>Illustrative wallet · Ethereum</p><h3>Sequenced remediation</h3>
              <ol><li>Verify spender addresses against evidence.</li><li>Revoke only allowances you confirm are obsolete.</li><li>Separate daily-use activity from long-term holdings.</li></ol>
              <b>Each recommendation explains rationale, uncertainty, and customer control.</b>
            </div>
          </details>
        </div>
      </section>

      <section className={styles.staleSection}>
        <div className={styles.staleCopy}>
          <p className={styles.eyebrow}>Basic-to-standard upgrade</p>
          <h2>The upgrade gets cheaper as the evidence gets older.</h2>
          <p>
            If you like the $5 Basic report, the already-compiled Standard view can be unlocked later.
            The upgrade price drops by $5 each seven days. On day 28, the analysis is stale and a new
            report is required for current provenance.
          </p>
        </div>
        <div className={styles.staleDiagram} aria-label="Upgrade price by report age">
          {staleWindows.map(([days, price, note, width]) => (
            <div key={days}>
              <span>{days}</span><div><i style={{ width: `${width}%` }} /></div><strong>{price}</strong><small>{note}</small>
            </div>
          ))}
          <div className={styles.staleStop}><span>Day 28+</span><Prohibit size={21} weight="duotone" /><strong>Stale</strong><small>Fresh analysis required</small></div>
        </div>
      </section>

      <section className={styles.paymentDisclosure}>
        <div className={styles.providerRow}>
          <div className={styles.providerTitle}><StripeLogo size={28} weight="fill" /><span><small>Payment provider</small><strong>Stripe Checkout</strong></span></div>
          <div className={styles.paymentMethods} aria-label="Examples of eligible payment methods">
            <span><CreditCard weight="duotone" /> Cards</span>
            <span><AppleLogo weight="fill" /> Apple Pay</span>
            <span><GoogleLogo weight="bold" /> Google Pay</span>
            <span><LinkSimple weight="bold" /> Link</span>
            <span><Bank weight="duotone" /> Bank options</span>
          </div>
        </div>
        <p>
          Stripe dynamically shows eligible methods for your location, currency, device, and order.
          Cash App Pay and eligible regional or pay-later methods may also appear. Crypto and stablecoins
          are not currently accepted. AnarchI does not receive or store your full card or bank credentials.
        </p>
        <div className={styles.deliveryRow}>
          <article><Sparkle size={24} weight="duotone" /><div><strong>When work starts</strong><p>After Stripe confirms payment and intake is complete.</p></div></article>
          <article><FileLock size={24} weight="duotone" /><div><strong>Delivery format</strong><p>Encrypted interactive digital report by secure email link.</p></div></article>
          <article><Eye size={24} weight="duotone" /><div><strong>Delivery target</strong><p>Usually within 20 minutes; allow up to 60 during delays.</p></div></article>
        </div>
      </section>

      <section className={styles.intakeSection} ref={intakeRef} aria-hidden={!reportStarted}>
        {!reportStarted ? (
          <div className={styles.intakeLocked}>
            <LockKey size={28} weight="duotone" />
            <div><strong>Intake is locked.</strong><p>Enter a public address and acknowledge both linked policies above to start.</p></div>
          </div>
        ) : (
          <div className={styles.intakeLayout}>
            <form className={styles.intakeForm} onSubmit={(event) => event.preventDefault()}>
              <div className={styles.formHeading}>
                <div><p className={styles.eyebrow}>Secure intake</p><h2>Tell the report what matters.</h2></div>
                <span>{tiers.find((item) => item.id === tier)?.label} · ${total}</span>
              </div>
              <div className={styles.formGrid}>
                <label>First name *<input value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} autoComplete="given-name" /></label>
                <label>Last name *<input value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} autoComplete="family-name" /></label>
                <label>Email for secure delivery *<input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} autoComplete="email" /></label>
                <label>Phone (optional)<input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} autoComplete="tel" /></label>
                <label>Network *<select value={form.chain} onChange={(event) => updateField("chain", event.target.value)}>{chainOptions.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
                <label>Public wallet address *<input value={form.walletAddress} onChange={(event) => updateField("walletAddress", event.target.value)} /></label>
              </div>
              <label className={styles.fullField}>What worries you most about this wallet?<textarea value={form.concerns} onChange={(event) => updateField("concerns", event.target.value)} placeholder="Optional context helps prioritize the report." /></label>

              <details className={styles.tuningDetails}>
                <summary>Optional report-tuning questions</summary>
                <div className={styles.formGrid}>
                  {[
                    ["recentSuspiciousActivity", "Recent suspicious activity?"],
                    ["unknownApprovals", "Unknown token approvals?"],
                    ["highValueAssets", "High-value assets present?"],
                    ["usesHardwareWallet", "Uses a hardware wallet?"],
                  ].map(([name, label]) => (
                    <label key={name}>{label}<select value={form[name]} onChange={(event) => updateField(name, event.target.value)}><option>Yes</option><option>No</option><option>Not sure</option></select></label>
                  ))}
                  <label className={styles.fullField}>Additional context<textarea value={form.additionalRemarks} onChange={(event) => updateField("additionalRemarks", event.target.value)} /></label>
                </div>
              </details>

              <div className={styles.passwordBox}>
                <div><LockKey size={23} weight="duotone" /><span><strong>Create a report password</strong><small>Used to unlock the encrypted report. At least 8 characters.</small></span></div>
                <div className={styles.formGrid}>
                  <label>Report password *<input type="password" value={form.reportPassword} onChange={(event) => updateField("reportPassword", event.target.value)} autoComplete="new-password" /></label>
                  <label>Confirm password *<input type="password" value={form.confirmReportPassword} onChange={(event) => updateField("confirmReportPassword", event.target.value)} autoComplete="new-password" /></label>
                </div>
              </div>

              <div className={styles.finalConsent}>
                <PolicyAcknowledgements form={form} updateField={updateField} compact />
                <label><input type="checkbox" checked={form.termsAccepted} onChange={(event) => updateField("termsAccepted", event.target.checked)} /><span>I agree to the <Link href="/terms" target="_blank">Terms of Service</Link>. *</span></label>
                <label><input type="checkbox" checked={form.riskPolicyAcknowledged} onChange={(event) => updateField("riskPolicyAcknowledged", event.target.checked)} /><span>I acknowledge the <Link href="/risk-policy" target="_blank">Safety & Risk Policy</Link> and the report&apos;s limits. *</span></label>
                <label><input type="checkbox" checked={form.internalResearchConsent} onChange={(event) => updateField("internalResearchConsent", event.target.checked)} /><span>Optional: AnarchI may retain a sanitized, de-identified research version after delivery.</span></label>
              </div>
            </form>

            <aside className={styles.checkoutCard}>
              <p className={styles.eyebrow}>Final review</p>
              <h2>{tiers.find((item) => item.id === tier)?.label}</h2>
              <strong className={styles.checkoutTotal}>${total}<small> USD</small></strong>
              <ul>
                <li><Check weight="bold" /> Full analysis generated</li>
                <li><Check weight="bold" /> Encrypted interactive delivery</li>
                <li><Check weight="bold" /> Secure link emailed after fulfillment</li>
                <li><Check weight="bold" /> No subscription</li>
              </ul>
              {error ? <div className={styles.error} role="alert">{error}</div> : null}
              <button type="button" disabled={!canCheckout || loading} onClick={startCheckout}>
                {loading ? "Opening Stripe…" : `Continue to Stripe · $${total}`} <ArrowRight weight="bold" />
              </button>
              <p className={styles.checkoutGate}>
                {!canCheckout ? "Complete all required fields and acknowledgements to enable payment." : "You will review the final amount and eligible method in Stripe Checkout."}
              </p>
              <div className={styles.secureNote}><ShieldCheck size={19} weight="duotone" /><span>Payment processed by Stripe. Report delivered digitally by AnarchI.</span></div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
