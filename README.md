# ВиК Трасе

Production-oriented static website for a Bulgarian external water and sewer service.

## What is included

- Bulgarian default pages: `index.html`, `services.html`, `about.html`, `contact.html`
- English pages under `en/`
- Privacy policy, cookie policy and legal information pages in both languages
- Original SVG logo and technical route illustration
- Local CSS and JavaScript only
- No analytics, advertising cookies, tracking pixels, external fonts or third-party scripts
- Contact actions for phone, Viber and WhatsApp
- WhatsApp/Viber inquiry helper that prepares the message locally in the browser

## Before public launch

Replace the legal placeholders in these files:

- `privacy.html`
- `legal.html`
- `en/privacy.html`
- `en/legal.html`

Search for:

- `[ЮРИДИЧЕСКО ИМЕ / ИМЕ НА АДМИНИСТРАТОРА]`
- `[ЮРИДИЧЕСКО ИМЕ]`
- `[ЕИК/БУЛСТАТ]`
- `[АДРЕС]`
- `[ИМЕЙЛ]`
- `[LEGAL NAME / CONTROLLER NAME]`
- `[LEGAL NAME]`
- `[COMPANY ID]`
- `[ADDRESS]`
- `[EMAIL]`

These values cannot be safely invented. Bulgarian business websites should identify the actual service provider.

## Deployment

Upload the contents of this folder to a GitHub repository. For GitHub Pages, publish from the repository root. The site is static and does not require a build step.

## Optional SEO step after choosing a domain

After you know the real domain, update the `hreflang` links to absolute URLs and add a `sitemap.xml` with the final public URLs.
