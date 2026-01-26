# Forge and Flight Holdings Corporate Website

Professional aerospace manufacturing website built with Cloudflare Workers and deployed via GitHub Actions.

## 🚀 Tech Stack

- **Hosting**: Cloudflare Workers
- **Deployment**: GitHub Actions CI/CD
- **Email Service**: Resend API
- **Frontend**: Pure HTML/CSS/JavaScript (no build step)
- **Domain**: forgeandflight.com

## 📁 Project Structure

```
forge-and-flight-site/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions deployment workflow
├── public/
│   ├── index.html          # Homepage
│   ├── about.html          # About page
│   ├── contact.html        # Contact page with form
│   ├── 404.html            # Error page
│   └── css/
│       └── styles.css      # Main stylesheet
├── worker/
│   └── index.js            # Cloudflare Worker (contact form handler)
├── wrangler.toml           # Cloudflare configuration
├── package.json            # Node.js dependencies
├── .gitignore
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 20+ installed
- Cloudflare account with forgeandflight.com domain
- GitHub account
- Resend account (free tier)

### 1. Clone and Install

```bash
git clone https://github.com/YOUR_USERNAME/forge-and-flight-site.git
cd forge-and-flight-site
npm install
```

### 2. Configure Cloudflare

1. Get your Cloudflare Account ID from the dashboard
2. Create API token (use "Edit Cloudflare Workers" template)
3. Add secrets to GitHub:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

### 3. Set Up Email Service

1. Sign up at [resend.com](https://resend.com)
2. Add and verify forgeandflight.com domain
3. Create API key
4. Add Worker secrets:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_EMAIL
```

### 4. Deploy

```bash
# Deploy to production
npm run deploy

# Or push to main branch for automatic deployment
git push origin main
```

## 💻 Local Development

```bash
# Start local dev server
npm run dev

# Open http://localhost:8787
```

## 🎨 Design System

### Color Palette

- **Primary Navy**: `#0A1628` - Headers, footer
- **Aerospace Blue**: `#003366` - Navigation, UI elements
- **Metallic Silver**: `#A8A9AD` - Borders, accents
- **Charcoal**: `#36454F` - Body text
- **Off-White**: `#F8F9FA` - Backgrounds
- **Industrial Orange**: `#FF6B35` - CTAs, highlights

### Typography

- **Font**: Inter (Google Fonts)
- **H1**: 48px (32px mobile) / 700
- **H2**: 36px (26px mobile) / 600
- **Body**: 16-18px / 1.6 line-height

## 📧 Contact Form

The contact form is handled by a Cloudflare Worker that:

1. Validates form data
2. Checks honeypot field for spam
3. Sends email via Resend API
4. Returns JSON response

### Testing the Form

```bash
curl -X POST http://localhost:8787/api/contact \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "company=Test Corp" \
  -F "message=This is a test message"
```

## 🔒 Security Features

- **Honeypot spam prevention** - Hidden field catches bots
- **Email validation** - Server-side regex validation
- **CORS headers** - Controlled cross-origin requests
- **Rate limiting** - (Add Cloudflare rate limiting rules if needed)
- **HTTPS only** - Automatic via Cloudflare

## 📊 Analytics (Optional)

Add Cloudflare Web Analytics or Google Analytics by adding tracking code to each HTML file before `</head>`:

```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' 
        data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

## 🚢 Deployment

### Automatic (Recommended)

Push to `main` branch → GitHub Actions → Deploy to production

### Manual

```bash
npm run deploy
```

### Preview Deployments

Create a pull request → GitHub Actions → Deploy to staging environment

## 📝 Content Management

To update content:

1. Edit HTML files in `public/`
2. Update CSS in `public/css/styles.css`
3. Commit and push to trigger deployment

### Adding New Pages

1. Create new HTML file in `public/` (e.g., `services.html`)
2. Add navigation link to all pages
3. Follow existing page structure and styling
4. Deploy

## 🐛 Troubleshooting

### Worker not found
- Run `npm run deploy` at least once
- Verify wrangler.toml is configured correctly

### Contact form not working
- Check secrets are set: `npx wrangler secret list`
- Verify Resend domain is verified
- Review logs: `npm run tail`

### Custom domain not working
- Wait 5-10 minutes for DNS propagation
- Verify domain in Workers dashboard
- Check Cloudflare DNS records

### Build fails in GitHub Actions
- Verify GitHub secrets are added
- Check wrangler.toml is committed
- Review Actions tab for errors

## 💰 Cost

- **Cloudflare Workers**: Free (100,000 requests/day)
- **Resend**: Free (100 emails/day)
- **GitHub Actions**: Free for public repositories
- **Total**: $0/month

## 📚 Useful Commands

```bash
# Development
npm run dev              # Start local server

# Deployment
npm run deploy           # Deploy to production
npm run deploy:staging   # Deploy to staging

# Monitoring
npm run tail             # View real-time logs

# Secrets Management
npx wrangler secret list           # List all secrets
npx wrangler secret put KEY_NAME   # Add/update secret
npx wrangler secret delete KEY     # Delete secret
```

## 🔗 Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Resend Documentation](https://resend.com/docs)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

## 📄 License

Copyright © 2025 Forge and Flight Holdings, Inc. All rights reserved.

## 🤝 Support

For questions or issues, contact: info@forgeandflight.com
