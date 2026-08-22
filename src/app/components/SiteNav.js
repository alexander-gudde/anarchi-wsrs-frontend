import Image from "next/image";
import Link from "next/link";
import {
  CaretDown,
  Fingerprint,
  SignIn,
  UserCirclePlus,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./site-nav.module.css";

const navLinks = [
  ["/products", "Products"],
  ["/wallet-safety-report", "Wallet report"],
  ["/about", "Principles"],
  ["/faq", "FAQ"],
  ["/legal", "Policies"],
];

export default function SiteNav() {
  return (
    <header className={styles.navWrap}>
      <Link className={styles.brand} href="/" aria-label="AnarchI Technologies home">
        <Image
          src="/brand/anarchi-gilded-lockup-dark.png"
          alt="AnarchI Technologies"
          width={2048}
          height={771}
          priority
        />
      </Link>
      <nav className={styles.links} aria-label="Primary navigation">
        {navLinks.map(([href, label]) => (
          <Link key={href} href={href}>{label}</Link>
        ))}
        <details className={styles.accountMenu}>
          <summary>
            <Fingerprint size={19} weight="duotone" aria-hidden="true" />
            <span><small>Anar-Core</small><strong>Account</strong></span>
            <CaretDown className={styles.accountCaret} size={14} weight="bold" aria-hidden="true" />
          </summary>
          <div className={styles.accountPanel}>
            <div>
              <small>Anar-Core identity</small>
              <strong>Customer access</strong>
              <p>Public credentials open after the authority contract is frozen.</p>
            </div>
            <Link href="/account#login">
              <SignIn size={19} weight="duotone" aria-hidden="true" />
              <span><strong>Log in</strong><small>Pre-launch</small></span>
            </Link>
            <Link href="/account#signup">
              <UserCirclePlus size={19} weight="duotone" aria-hidden="true" />
              <span><strong>Create account</strong><small>Pre-launch</small></span>
            </Link>
            <Link className={styles.recoveryLink} href="/account#forgot-password">
              Forgot password? <small>Pre-launch</small>
            </Link>
            <Link className={styles.profileLink} href="/anar-core">
              Preview the Anar-Core profile frame
            </Link>
          </div>
        </details>
        <Link className={styles.cta} href="/wallet-safety-report#start-report">
          Start a report
        </Link>
      </nav>
    </header>
  );
}
