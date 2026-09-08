# Stable Channels Website

Modern, responsive web presence for [Stable Channels](https://stablechannels.com), built with Next.js 15, TypeScript, Tailwind CSS, and Motion.

## Tech Stack
- **Framework:** Next.js 15 (App Router, Static HTML Export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, custom design tokens
- **Animations & 3D:** Motion (`motion/react`), Three.js
- **Package Manager / Runtime:** Bun (or Node.js / npm)

## Quick Start

Run the local development server:

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview the site.

## Building for Production & Deployment

This project is pre-configured with static HTML export (`output: 'export'`).

To compile the production bundle:

```bash
bun run build
```

This exports pure static HTML, CSS, JS, and media assets into the `out/` directory.

### Deployment Options
- **Apache / Nginx / Ubuntu:** Copy the contents of the `out/` directory directly into your web server's `DocumentRoot`. All existing backend `/api/*` reverse-proxy rules remain completely intact.
- **AWS S3 & CloudFront:** Sync the `out/` folder to your target S3 bucket configured for static website hosting.
- **Cloudflare Pages / Vercel:** Point the project to the repository root with build command `bun run build` and output directory `out`.
