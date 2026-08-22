import "../policy.css";
export const metadata = {
  title: "Wallet Safety Report FAQ",
  description: "Frequently asked questions about AnarchI Wallet Safety Reports.",
  alternates: { canonical: "/faq" },
};
export default function FAQPage() {
  return (
    <main className="policy-page">
      <article className="policy-card">
        <p className="policy-eyebrow">AnarchI Technologies</p>
        <h1>FAQ</h1>
        <h2>What is a Wallet Safety Report?</h2>
        <p>
          A Wallet Safety Report is a personalized, read-only technical report based on a public wallet address,
          selected chain, customer concerns, questionnaire answers, public blockchain data, and available risk sources.
        </p>
        <h2>Do you need my seed phrase or private key?</h2>
        <p>
          No. Never send AnarchI your seed phrase, private key, recovery phrase, wallet backup file, or exchange
          password. We do not need them and do not want them.
        </p>
        <h2>Do you take custody of my funds?</h2>
        <p>
          No. AnarchI does not take custody of customer wallets, funds, tokens, NFTs, or private keys.
        </p>
        <h2>Can the report prove my wallet is safe?</h2>
        <p>
          No report can guarantee wallet safety. Reports reduce uncertainty by reviewing available signals, but
          blockchain risk changes over time and data sources can be incomplete.
        </p>
        <h2>What chains do you support?</h2>
        <p>
          The order form may list multiple chains including Ethereum, Base, Arbitrum, Optimism, Polygon, BNB Smart
          Chain, Avalanche, Solana, Bitcoin, Tron, TON, WAX, and EOS. Depth of analysis can vary by chain and available data.
        </p>
        <h2>What does optional wallet proof mean?</h2>
        <p>
          Optional wallet proof means signing a message to show control of a wallet. It should never reveal your seed
          phrase or private key. Future ownership-confirmed categories may require this proof.
        </p>
        <h2>What are action cards?</h2>
        <p>
          Action cards are customer-controlled recommendations, such as reviewing or revoking token approvals. They
          may include links, contract details, or transaction hints. You must verify everything before signing.
        </p>
        <h2>What do the three report options cost?</h2>
        <p>
          The Basic Wallet Report is $5. The Full Standard Report is $25. A Deeper Look adds $5 to the
          Standard Report, for a $30 total. Every order runs the full analysis; your selection controls
          which report view is delivered.
        </p>
        <h2>Can I upgrade a Basic report?</h2>
        <p>
          Yes. The Full Standard upgrade is $20 during the first seven days, then $15, $10, and $5 in
          successive seven-day windows. After 28 days the report is stale for current provenance and a
          new analysis is required.
        </p>
        <h2>How do I pay?</h2>
        <p>
          Payment is processed through Stripe Checkout. Stripe shows eligible methods dynamically based
          on your location, currency, device, and the methods available for the order. These may include
          cards, Apple Pay, Google Pay, Link, Cash App Pay, bank payments, and eligible regional or
          pay-later methods. Crypto and stablecoins are not currently accepted.
        </p>
        <h2>When and how is my report delivered?</h2>
        <p>
          Analysis starts after Stripe confirms payment and your intake is complete. Most reports are
          targeted within 20 minutes; allow up to 60 minutes during high traffic or source-provider delays.
          You receive an encrypted interactive digital report by secure email link, unlocked with the
          report password you created. No physical product is shipped.
        </p>
        <h2>What happens if I consent to internal research?</h2>
        <p>
          If you consent, AnarchI may create a sanitized internal research version after your report is delivered.
          This should remove personal identifiers and preserve useful generalized safety patterns.
        </p>
        <h2>What happens if I do not consent?</h2>
        <p>
          If you do not consent, AnarchI will not intentionally create a sanitized research version for internal
          knowledge-family sorting, except where limited retention is needed for payment, legal, security, accounting,
          dispute, support, or operational reasons.
        </p>
        <h2>Who do I contact for support?</h2>
        <p>
          Email <strong>admin@anarchi-tech.com</strong>. Do not include private keys, seed phrases, or recovery phrases.
        </p>
      </article>
    </main>
  );
}
