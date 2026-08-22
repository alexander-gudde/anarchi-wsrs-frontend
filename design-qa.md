# Design QA — AnarchI website makeover

## Source and target

- Selected source visual: `C:\Users\alexg\.codex\generated_images\01a0264d-67d8-7763-8a02-a89ffc8d1832\exec-9ff2017b-2a2a-466c-a6a1-31e57a7e995f.png`
- Source dimensions: 909 × 1731
- Final WSRS implementation capture: `qa-wallet-desktop-v3.jpg`
- Final source/implementation comparison: `qa-wallet-comparison-v1.jpg`
- Desktop viewport: 1280 × 720
- Narrow QA viewport: 910 × 900
- Mobile viewport: 390 × 844
- State: local production-ready implementation; no checkout submitted

## Comparison result

The implementation preserves the selected source's compact evidence-led layout, high-contrast ink/gold/violet palette, prominent wallet-address gate, three clearly priced formats, expandable sanitized examples, evidence-freshness diagram, and payment/delivery disclosure. It deliberately uses a more editorial headline and softer card framing to match the requested mature, mysterious, sophisticated direction.

## Iteration history

1. Initial implementation exposed a white/checkerboard logo background and allowed the desktop navigation to overflow at the narrow QA viewport.
2. Replaced the failed transparent asset with a seamless dark-background gilded lockup, constrained its crop, moved the navigation to a two-row/scrollable presentation before overflow, and hid the scrollbar.
3. Rebuilt the WSRS first screen as a compact two-column blend: headline and address/policy gate on the left, sanitized Basic report preview on the right.
4. Reduced desktop hero height from 954px to 642px, tightened type and form spacing, and reduced total desktop page height from 4260px to 3948px to better match the compact reference.
5. Brightened the homepage banner so the supplied long-form AnarchI artwork reads as the hero instead of disappearing behind its overlay.
6. Added and tested the manual systems carousel. Empty ad inventory is omitted from the DOM and layout until an approved placement exists.

## Focused captures

- `qa-wallet-top-v4.jpg` — narrow desktop hero and start gate
- `qa-wallet-desktop-v3.jpg` — final 1280 desktop hero
- `qa-wallet-pricing-v2.jpg` — three report formats
- `qa-wallet-example-open-v1.jpg` — working sanitized example disclosure
- `qa-wallet-stale-payment-v1.jpg` — staleoff diagram
- `qa-wallet-payment-v1.jpg` — Stripe, accepted methods, work start, delivery format, and timing
- `qa-wallet-mobile-v1.jpg` — 390px responsive state
- `qa-home-top-v2.jpg` — homepage artwork banner
- `qa-home-carousel-v1.jpg` — working systems carousel
- `qa-products-top-v1.jpg` — product catalog and sticky jump navigation

## Functional verification

- Initial Start button is disabled.
- Public address plus both policy acknowledgements enable Start.
- Start reveals secure intake; no payment is taken.
- Standard selection updates the review action to `Continue to Stripe · $25`.
- Payment remains disabled until required identity, delivery, password, Terms, and Safety & Risk acknowledgements are complete.
- After required intake is complete, the Stripe action becomes enabled; it was not clicked during QA.
- Sanitized examples open and close correctly.
- Systems carousel previous, next, and direct-position controls change the active system.
- Empty partner/ad placements render no element and reserve no space.
- Desktop and mobile page widths remain within the viewport.
- Browser console: zero errors and zero warnings; development-only informational logs were present.

## Build verification

- Frontend lint: passed
- Frontend tests: 3/3 passed
- Frontend production build: passed; 22 routes generated
- WSRS runtime tests: 47/47 passed
- WSRS runtime production build: passed
- Public canonical routes, sitemap, robots rules, and noindex account/projection routes: passed

## Final result

passed
