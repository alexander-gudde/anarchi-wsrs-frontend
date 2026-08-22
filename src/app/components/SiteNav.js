import Image from "next/image";
import Link from "next/link";
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
        <Link className={styles.login} href="/account#login">Log in</Link>
        <Link className={styles.signup} href="/account#signup">Create account</Link>
        <Link className={styles.cta} href="/wallet-safety-report#start-report">
          Start a report
        </Link>
      </nav>
    </header>
  );
}
