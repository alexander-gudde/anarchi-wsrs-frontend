import Link from "next/link";
import { ArrowRight, EnvelopeSimple, Fingerprint, LockKey, ShieldCheck, UserCirclePlus } from "@phosphor-icons/react/dist/ssr";
import styles from "./account.module.css";

export const metadata = {
  title: "Account access",
  description: "Log in or create an Anar-Core identity for AnarchI Technologies services.",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <p>Anar-Core identity</p>
        <h1>One identity. Explicit boundaries.</h1>
        <span>
          The Anar-Core authority runtime is live. This public surface will become the account
          frame for people, organizations, memberships, permissions, wallet reports, and evidence.
        </span>
      </section>

      <section className={styles.accessGrid}>
        <form id="login" className={styles.accessCard}>
          <div className={styles.cardTitle}><LockKey size={25} weight="duotone" /><div><small>Existing Anar-Core</small><h2>Log in</h2></div></div>
          <label>Email address<input type="email" autoComplete="email" placeholder="you@example.com" disabled /></label>
          <label>Password<input type="password" autoComplete="current-password" placeholder="••••••••" disabled /></label>
          <button type="button" disabled>Public enrollment opens after contract freeze</button>
          <p>The authority runtime is live; public credential enrollment remains closed until the frozen contract, recovery, rate limiting, session, and audit controls land together.</p>
        </form>

        <form id="signup" className={styles.accessCard}>
          <div className={styles.cardTitle}><UserCirclePlus size={25} weight="duotone" /><div><small>New Anar-Core</small><h2>Create account</h2></div></div>
          <label>Display name<input autoComplete="name" placeholder="Your name" disabled /></label>
          <label>Email address<input type="email" autoComplete="email" placeholder="you@example.com" disabled /></label>
          <button type="button" disabled>Signup opens after contract freeze</button>
          <p>No wallet connection, seed phrase, or public profile is required to create an Anar-Core identity.</p>
        </form>
      </section>

      <form id="forgot-password" className={`${styles.accessCard} ${styles.recoveryCard}`}>
        <div className={styles.cardTitle}><EnvelopeSimple size={25} weight="duotone" /><div><small>Account recovery</small><h2>Forgot password?</h2></div></div>
        <label>Email address<input type="email" autoComplete="email" placeholder="you@example.com" disabled /></label>
        <button type="button" disabled>Recovery opens with public enrollment</button>
        <p>The recovery entry point is reserved and linkable now. Email verification, reset-token expiry, session revocation, and audit controls will be wired before it accepts customer requests.</p>
      </form>

      <section className={styles.previewCard}>
        <div><Fingerprint size={32} weight="duotone" /><span><small>Profile architecture preview</small><strong>Anar-Core / Organization / Membership</strong></span></div>
        <p>
          Preview the identity, organization, role, permission, security, and report-access framing
          now. This is a replaceable public projection of the live 0.1.0 authority vocabulary,
          pending the final Anar-Core freeze.
        </p>
        <Link href="/anar-core">Open Anar-Core profile design <ArrowRight weight="bold" /></Link>
      </section>

      <aside className={styles.honestyNote}>
        <ShieldCheck size={21} weight="duotone" />
        <p><strong>No pretend security.</strong> The authority runtime is operating; password acceptance stays off here until public verification, recovery, rate limiting, secure sessions, and audit controls are ready as one complete customer surface.</p>
      </aside>
    </main>
  );
}
