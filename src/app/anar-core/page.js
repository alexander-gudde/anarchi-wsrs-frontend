import {
  Buildings,
  CheckCircle,
  Fingerprint,
  Key,
  LockKey,
  ShieldCheck,
  UserCircle,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./anar-core.module.css";

export const metadata = {
  title: "Anar-Core profile architecture",
  description: "Anar-Core profile, organization, membership, permission, security, and audit framing.",
  robots: { index: false, follow: false },
};

const roles = [
  ["Role definition", "A versioned definition of named responsibility; it is not authority by itself."],
  ["Role assignment", "The explicit link from a membership to a particular role definition and version."],
  ["Entitlement definition", "A versioned capability statement describing what may be authorized."],
  ["Entitlement grant", "The narrow grant of an entitlement through an active authority relationship."],
  ["Resource-scope binding", "The operation, adapter, resource scope, policy version, and exact conditions that must agree."],
];

const contracts = [
  ["Identity + personal account", "Typed person-level identity and its customer-facing personal account projection."],
  ["Organization + tenant", "A bounded organization and its service-specific tenant context."],
  ["Membership", "The explicit relationship among an identity, personal account, organization, tenant, and authority versions."],
  ["Session + invitation", "Short-lived authenticated context and the bounded path by which a membership may be invited."],
  ["Hydration + authorized subject", "The normalized authority projection consumed by a service boundary before an operation can run."],
];

export default function AnarCorePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div><p>Anar-Core / live 0.1.0 vocabulary</p><h1>Identity without ambiguity.</h1><span>One identity can participate in many organizations and tenants. Every membership, role, entitlement, session, and resource scope remains explicit and versioned.</span></div>
        <div className={styles.profileSummary}>
          <div className={styles.avatar}><Fingerprint size={48} weight="duotone" /></div>
          <div><small>Projection specimen · not a live account</small><strong>idn_sample_01</strong><p>act_sample_01 · active projection</p></div>
          <span><CheckCircle weight="fill" /> Typed identity frame</span>
        </div>
      </section>

      <section className={styles.metrics}>
        <article><Buildings weight="duotone" /><span><strong>org</strong><small>Organization record</small></span></article>
        <article><UsersThree weight="duotone" /><span><strong>mbr</strong><small>Membership record</small></span></article>
        <article><ShieldCheck weight="duotone" /><span><strong>bnd</strong><small>Scoped binding</small></span></article>
        <article><LockKey weight="duotone" /><span><strong>ses</strong><small>Bounded session</small></span></article>
      </section>

      <section className={styles.layout}>
        <div className={styles.mainColumn}>
          <article className={styles.panel}>
            <header><div><p>Framing</p><h2>Core contracts</h2></div><Fingerprint size={26} weight="duotone" /></header>
            <div className={styles.contractList}>{contracts.map(([title, copy], index) => <div key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{copy}</p></div></div>)}</div>
          </article>

          <article className={styles.panel}>
            <header><div><p>Authority model</p><h2>Roles, grants, and scope</h2></div><UsersThree size={27} weight="duotone" /></header>
            <div className={styles.roleList}>{roles.map(([role, copy]) => <div key={role}><strong>{role}</strong><p>{copy}</p></div>)}</div>
          </article>
        </div>

        <aside className={styles.sideColumn}>
          <article className={styles.panel}>
            <header><div><p>Sample organization projection</p><h2>Blackglass Studio</h2></div><Buildings size={25} weight="duotone" /></header>
            <dl><div><dt>Organization ID</dt><dd>org_sample_01</dd></div><div><dt>Tenant ID</dt><dd>tnt_sample_01</dd></div><div><dt>Membership</dt><dd>mbr_sample_01 · active</dd></div><div><dt>Report visibility</dt><dd>Binding-scoped</dd></div></dl>
          </article>
          <article className={styles.panel}>
            <header><div><p>Security frame</p><h2>Core assurance</h2></div><Key size={25} weight="duotone" /></header>
            <ul><li><CheckCircle weight="fill" /> Verified delivery email</li><li><CheckCircle weight="fill" /> MFA field and org requirement</li><li><CheckCircle weight="fill" /> Recovery configuration state</li><li><CheckCircle weight="fill" /> Credential-change timestamp</li><li><CheckCircle weight="fill" /> Session assurance and expiry</li></ul>
          </article>
        </aside>
      </section>

      <section className={styles.schemaNote}>
        <UserCircle size={27} weight="duotone" />
        <div><strong>Runtime mirror: anar_core 0.1.0 · draft public projection</strong><p>The live vocabulary includes typed identity, personal account, organization, tenant, membership, versioned role and entitlement records, adapters, operations, bindings, sessions, invitations, hydration, and authorized-subject projections. This page will be regenerated from the frozen contract before public enrollment opens.</p></div>
      </section>
    </main>
  );
}
