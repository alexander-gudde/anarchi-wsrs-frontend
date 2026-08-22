import "../policy.css";
export const metadata = {
  title: "Delivery Policy",
  description: "Digital delivery policy for AnarchI Wallet Safety Reports.",
  alternates: { canonical: "/delivery-policy" },
};
export default function DeliveryPolicyPage() {
  return (
    <main className="policy-page">
      <article className="policy-card">
        <p className="policy-eyebrow">AnarchI Technologies</p>
        <h1>Delivery Policy</h1>
        <p><strong>Effective Date:</strong> 8/21/2026</p>
        <p><strong>Contact:</strong> admin@anarchi-tech.com</p>
        <h2>1. Digital Delivery</h2>
        <p>
          AnarchI Wallet Safety Reports are digital services delivered electronically. We do not ship
          physical goods.
        </p>
        <h2>2. Delivery Method</h2>
        <p>
          Reports are delivered as an encrypted interactive digital report. AnarchI emails a secure viewer
          link to the email address used at checkout; the report is unlocked with the customer-created report
          password. We do not ship a physical product.
        </p>
        <h2>3. Report Password</h2>
        <p>
          Customers may be asked to create a report unlock password. You are responsible for saving this
          password. AnarchI should not need your seed phrase, private key, wallet password, or recovery phrase.
        </p>
        <h2>4. Timing</h2>
        <p>
          Analysis starts only after Stripe confirms successful payment and the required intake is complete.
          Most reports are targeted for delivery within 20 minutes. Please allow up to 60 minutes during
          high traffic, blockchain or source-provider delays, report queue conditions, or technical interruptions.
        </p>
        <h2>5. Delivery Problems</h2>
        <p>
          If you do not receive your report, contact <strong>admin@anarchi-tech.com</strong> with your email,
          payment date, and order/session ID if available.
        </p>
        <h2>6. No Physical Shipping</h2>
        <p>
          Because AnarchI provides digital services, shipping, physical returns, and physical delivery
          tracking do not apply.
        </p>
      </article>
    </main>
  );
}
