# EmDash Blog Template (Cloudflare)

A clean, minimal blog built with [EmDash](https://github.com/emdash-cms/emdash) and deployed on Cloudflare Workers with D1 and R2.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/emdash-cms/templates/tree/main/blog-cloudflare)

![Blog template homepage](https://raw.githubusercontent.com/emdash-cms/emdash/main/assets/templates/blog/latest/homepage-light-desktop.jpg)

## What's Included

- Featured post hero on the homepage
- Post archive with reading time estimates
- Category and tag archives
- Full-text search
- RSS feed
- SEO metadata and JSON-LD
- Dark/light mode
- Forms plugin and webhook notifier

## Pages

| Page | Route |
|---|---|
| Homepage | `/` |
| All posts | `/posts` |
| Single post | `/posts/:slug` |
| Category archive | `/category/:slug` |
| Tag archive | `/tag/:slug` |
| Search | `/search` |
| Static pages | `/pages/:slug` |
| 404 | fallback |

## Screenshots

| | Desktop | Mobile |
|---|---|---|
| Light | ![homepage light desktop](https://raw.githubusercontent.com/emdash-cms/emdash/main/assets/templates/blog/latest/homepage-light-desktop.jpg) | ![homepage light mobile](https://raw.githubusercontent.com/emdash-cms/emdash/main/assets/templates/blog/latest/homepage-light-mobile.jpg) |
| Dark | ![homepage dark desktop](https://raw.githubusercontent.com/emdash-cms/emdash/main/assets/templates/blog/latest/homepage-dark-desktop.jpg) | ![homepage dark mobile](https://raw.githubusercontent.com/emdash-cms/emdash/main/assets/templates/blog/latest/homepage-dark-mobile.jpg) |

## Infrastructure

- **Runtime:** Cloudflare Workers
- **Database:** D1
- **Storage:** R2
- **Framework:** Astro with `@astrojs/cloudflare`

## Local Development

```bash
pnpm install
pnpm bootstrap
pnpm dev
```

## Deploying

```bash
pnpm deploy
```

Or click the deploy button above to set up the project in your Cloudflare account.

## Transactional email with Resend

The native `sinlc-resend` plugin delivers EmDash invitations, magic links,
account recovery, and other CMS emails from `Long Ching Sin <noreply@sin.lc>`.
The sender is configured in `src/plugins/resend/index.mjs`.

1. Verify `sin.lc` for **Sending** in Resend. Leave Receiving disabled and keep
   the existing root-domain MX records for your mailbox provider.
2. Create a Resend API key and add it to **Workers & Pages → my-emdash-site →
   Settings → Variables and Secrets** as a **Secret** named `RESEND_API_KEY`.
   Use the runtime section, not **Build → Variables and Secrets**. Save/deploy
   the secret. It is read only at runtime and must never be committed to Git.
   CLI alternative, from this repository: `pnpm exec wrangler secret put RESEND_API_KEY`.
3. Deploy the code. In EmDash, ensure `sinlc-resend` is enabled under Plugins.
   Open **Settings → Email**, confirm the provider is active, and send a test
   to your own inbox. Then test **Sign in with email** in a private window while
   keeping your existing admin session open.

Local development uses an ignored `.dev.vars` file containing `RESEND_API_KEY`.
Do not put the key in `astro.config.mjs`, `wrangler.jsonc`, or client-side code.
The plugin does not require the Dynamic Worker Loader binding.

Run `node --test tests/resend.test.ts` (Node 22.18+ or 24+) for mocked delivery
tests; these never send real emails. API acceptance is not proof of inbox
delivery—check Resend delivery events and your inbox after deployment.

References: [Resend DNS setup](https://resend.com/docs/knowledge-base/cloudflare),
[Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/).

## See Also

- [Node.js variant](../blog) -- same template using SQLite and local file storage
- [All templates](../)
- [EmDash documentation](https://github.com/emdash-cms/emdash/tree/main/docs)
