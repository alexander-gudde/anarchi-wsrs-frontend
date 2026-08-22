import Link from "next/link";
import "../policy.css";

export const metadata = {
  title: "Data & Proprietary Information Policy",
  description: "How AnarchI Technologies handles customer data, public wallet evidence, reports, and proprietary methods.",
  alternates: { canonical: "/data-proprietary-policy" },
};

export default function DataProprietaryPolicyPage() {
  return (
    <main className="policy-page">
      <article className="policy-card">
        <p className="policy-eyebrow">AnarchI Technologies</p>
        <h1>Data & Proprietary Information Policy</h1>
        <p><strong>Effective date:</strong> August 21, 2026</p>
        <p className="policy-callout">
          Your customer information remains yours. Public blockchain data remains public. Your
          purchased report is licensed for your personal or internal business use. AnarchI&apos;s
          authored software, scoring methods, templates, and report-generation systems remain AnarchI property.
        </p>

        <h2>1. The four kinds of information in a wallet report</h2>
        <ol>
          <li><strong>Customer information:</strong> your name, delivery email, optional phone number, concerns, questionnaire answers, consent records, and support communications.</li>
          <li><strong>Customer-submitted public identifiers:</strong> public wallet addresses and selected networks. These are public identifiers, but we treat their connection to you as sensitive.</li>
          <li><strong>Public-source evidence:</strong> blockchain transactions, approvals, contract interactions, public labels, public threat sources, and related provenance.</li>
          <li><strong>AnarchI-authored material:</strong> software, selection and weighting methods, normalization logic, risk models, report structure, explanatory language, and delivery systems.</li>
        </ol>

        <h2>2. What you may do with a purchased report</h2>
        <p>
          You may save, print, share, or rely on your report for your own personal security work or
          within your organization. You may provide it to a lawyer, insurer, exchange, investigator,
          auditor, business partner, or other advisor when you choose.
        </p>
        <p>
          A purchase does not transfer ownership of AnarchI&apos;s underlying software, algorithms,
          templates, or source-selection methods. You may not resell reports as your own service,
          remove attribution and present AnarchI-authored material as your work, systematically scrape
          report outputs, or reverse engineer the service for a competing product.
        </p>

        <h2>3. What AnarchI does with customer data</h2>
        <p>
          We use customer information to confirm payment, compile and deliver the purchased report,
          provide support, prevent abuse, maintain security and audit records, handle refunds or disputes,
          and meet legal, tax, or accounting duties. We do not sell customer report data.
        </p>

        <h2>4. Optional sanitized research</h2>
        <p>
          Sanitized internal research is optional. If you separately consent, we may retain generalized
          patterns after removing direct customer identifiers, private notes, delivery details, payment
          information, and report passwords. Declining this optional consent does not prevent purchase.
        </p>

        <h2>5. Secrets and prohibited submissions</h2>
        <p>
          Never submit a seed phrase, private key, recovery phrase, wallet password, exchange password,
          banking credential, secret backup, or information you are not authorized to provide. AnarchI
          does not need these items and will never make them a condition of a report.
        </p>

        <h2>6. Report freshness and evidentiary limits</h2>
        <p>
          A report records observations available at compilation time. Wallet activity, approvals,
          counterparties, labels, and public sources can change. Upgrade pricing declines as a report
          ages, and after 28 days a new analysis is required because the prior report is stale for current
          provenance.
        </p>

        <h2>7. Access, correction, deletion, and questions</h2>
        <p>
          Subject to operational and legal retention requirements, you may request access, correction,
          or deletion by emailing <strong>admin@anarchi-tech.com</strong>. See the full <Link href="/privacy">Privacy Policy</Link>
          {" "}for additional privacy rights and service-provider disclosures.
        </p>
      </article>
    </main>
  );
}
