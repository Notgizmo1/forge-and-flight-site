# forgeandflight.com — Hugo Site

Forge & Flight Holdings, Inc. corporate website. Built with Hugo SSG, deployed to Cloudflare Pages via GitHub Actions.

## Stack
- Hugo (static site generator)
- Cloudflare Pages (hosting)
- GitHub Actions (CI/CD — auto-deploys on push to main)

## Credentials
- Cloudflare Account ID: 91fbd2ec539a1f2ab4696f69ab566c3b
- Cloudflare Project Name: forge-and-flight-holdings
- Google Analytics ID: G-4RVS5R9Z6G (configured in hugo.toml)
- Bing Webmaster: CBB3DDC3738AE030F4107D4B0869525F

## Setup
1. Add GitHub Actions secrets: `CLOUDFLARE_API_TOKEN`
2. Create Cloudflare Pages project named `forge-and-flight-holdings`
3. Connect to this repo, build command: `hugo --minify`, output: `public`

## Development
```bash
hugo server -D
```

## Content
- All pages in `content/`
- Layouts in `layouts/`
- CSS/JS/images in `static/`
- Config in `hugo.toml`
