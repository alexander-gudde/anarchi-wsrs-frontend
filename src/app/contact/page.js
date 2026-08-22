import "../policy.css";
export const metadata = {
  title: "Contact",
  description: "Contact AnarchI Technologies for support, privacy, billing, and Wallet Safety Report questions.",
  alternates: { canonical: "/contact" },
};
export default function ContactPage() {
  return (
    <main className="policy-page">
      <article className="policy-card">
        <p className="policy-eyebrow">AnarchI Technologies</p>
        <h1>Contact</h1>
        <p>
          For support, privacy questions, billing questions, report delivery issues, refund requests,
          or safety concerns, contact AnarchI Technologies.
        </p>
        <h2>Email</h2>
        <p><a href="mailto:admin@anarchi-tech.com"><strong>admin@anarchi-tech.com</strong></a></p>
        <p>For now, email is our customer support channel.</p>
        <h2>Support Notes</h2>
        <ul>
          <li>Do not email seed phrases, private keys, recovery phrases, or wallet backup files.</li>
          <li>For report support, include the email used at checkout and order/session ID if available.</li>
          <li>For refund requests, include payment date, provider used, and reason for the request.</li>
          <li>For privacy requests, state whether you are requesting access, correction, deletion, or consent withdrawal.</li>
        </ul>
        <h2>Response Time</h2>
        <p>
          We aim to respond as soon as reasonably possible. Response times may vary based on workload,
          queue status, and the nature of the request.
        </p>
      </article>
    </main>
  );
}
