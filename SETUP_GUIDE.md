# Forge and Flight Website Setup Guide

## Step-by-Step Setup for forgeandflight.com

### Phase 1: Repository Setup (15 minutes)

1. **Create GitHub repository**
   ```bash
   # On your local machine
   mkdir forge-and-flight-site
   cd forge-and-flight-site
   git init
   ```

2. **Create folder structure**
   ```bash
   mkdir -p public/css public/images public/js worker .github/workflows
   ```

3. **Copy configuration files**
   - `wrangler.toml` → Root directory
   - `package.json` → Root directory
   - `worker-index.js` → `worker/index.js`
   - `deploy.yml` → `.github/workflows/deploy.yml`

4. **Initialize npm and install Wrangler**
   ```bash
   npm install
   ```

5. **Create initial commit**
   ```bash
   git add .
   git commit -m "Initial commit: project structure"
   ```

6. **Push to GitHub**
   - Create a new repository on GitHub (name: forge-and-flight-site)
   - Don't initialize with README/license/gitignore
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/forge-and-flight-site.git
   git branch -M main
   git push -u origin main
   ```

### Phase 2: Cloudflare Configuration (10 minutes)

1. **Get your Cloudflare Account ID**
   - Log into Cloudflare dashboard
   - Select your forgeandflight.com domain
   - Scroll down right sidebar → Copy "Account ID"

2. **Create API Token**
   - Dashboard → My Profile → API Tokens → Create Token
   - Use "Edit Cloudflare Workers" template
   - Account Resources: Include → Your account
   - Zone Resources: Include → forgeandflight.com
   - Click "Continue to summary" → Create Token
   - **IMPORTANT**: Copy this token immediately (you won't see it again)

3. **Add GitHub Secrets**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions → New repository secret
   - Add two secrets:
     - `CLOUDFLARE_API_TOKEN`: Paste the API token from step 2
     - `CLOUDFLARE_ACCOUNT_ID`: Paste the Account ID from step 1

### Phase 3: Email Service Setup (10 minutes)

We'll use Resend because it's specifically built for transactional emails and has a generous free tier (100 emails/day).

1. **Sign up for Resend**
   - Go to https://resend.com/
   - Sign up with your email
   - Verify your email address

2. **Add your domain**
   - Dashboard → Domains → Add Domain
   - Enter: forgeandflight.com
   - Copy the DNS records provided (TXT, MX, CNAME)

3. **Configure DNS in Cloudflare**
   - Go to Cloudflare dashboard → forgeandflight.com → DNS → Records
   - Add each DNS record from Resend:
     - Type: TXT, Name: @ or _resend, Value: (from Resend)
     - Type: MX, Name: @, Value: (from Resend)
     - Type: CNAME, Name: (from Resend), Value: (from Resend)
   - Wait 5-10 minutes for DNS propagation

4. **Verify domain in Resend**
   - Return to Resend dashboard → Click "Verify" on your domain
   - Should show "Verified" status

5. **Create API key**
   - Resend dashboard → API Keys → Create API Key
   - Name: "Forge and Flight Contact Form"
   - Permission: Sending access
   - Copy the API key

6. **Add Worker secrets**
   ```bash
   # In your project directory
   npx wrangler secret put RESEND_API_KEY
   # Paste the API key when prompted
   
   npx wrangler secret put CONTACT_EMAIL
   # Enter the email where you want to receive contact form submissions
   # Example: info@forgeandflight.com or your personal email
   ```

### Phase 4: Local Development (5 minutes)

1. **Test locally**
   ```bash
   npm run dev
   ```
   This starts a local server at http://localhost:8787

2. **Create a simple test page**
   Create `public/index.html`:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Forge and Flight Holdings</title>
   </head>
   <body>
       <h1>Forge and Flight Holdings, Inc.</h1>
       <p>Vertically Integrated Aerospace Manufacturing</p>
   </body>
   </html>
   ```

3. **Visit http://localhost:8787 to confirm it works**

### Phase 5: Deploy to Production (5 minutes)

1. **Deploy manually first time**
   ```bash
   npm run deploy
   ```
   This deploys your Worker to Cloudflare

2. **Connect custom domain**
   - Go to Cloudflare dashboard → Workers & Pages
   - Click your worker (forge-and-flight-site)
   - Settings → Domains & Routes → Add
   - Select "Custom Domain"
   - Enter: forgeandflight.com
   - Click Add Domain
   - Cloudflare automatically creates DNS records and provisions SSL

3. **Add www subdomain** (recommended)
   - Same process, enter: www.forgeandflight.com
   - Cloudflare will handle redirects

4. **Wait for DNS propagation** (1-5 minutes)
   - Visit https://forgeandflight.com
   - You should see your test page with valid SSL

### Phase 6: Automatic Deployments (Already configured!)

Every time you push to the `main` branch, GitHub Actions will automatically deploy to production. For testing changes:

```bash
# Create a new branch
git checkout -b feature/new-homepage

# Make changes to your files
# Commit and push
git add .
git commit -m "Update homepage design"
git push origin feature/new-homepage

# Create pull request on GitHub
# This triggers a staging deployment
# Review the preview URL in the GitHub Actions output

# Merge to main when ready
# This triggers production deployment
```

## Next Steps

1. **Build your pages** - Create index.html, about.html, contact.html in public/
2. **Add CSS** - Create public/css/styles.css with the aerospace color palette
3. **Test contact form** - Create contact.html with form that POSTs to /api/contact
4. **Add images** - Place logo and photos in public/images/
5. **Configure 404 page** - Create public/404.html

## Useful Commands

```bash
# Start local development server
npm run dev

# Deploy to production
npm run deploy

# View real-time Worker logs
npm run tail

# Test contact form locally
curl -X POST http://localhost:8787/api/contact \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "message=Test message"
```

## Troubleshooting

**"Worker not found" error**
- Make sure you've run `npm run deploy` at least once
- Check wrangler.toml is in root directory

**Contact form not working**
- Verify secrets are set: `npx wrangler secret list`
- Check Resend domain is verified
- Review Worker logs: `npm run tail`

**Custom domain not working**
- DNS propagation can take up to 24 hours (usually 5 minutes)
- Verify domain is added in Workers dashboard
- Check Cloudflare DNS records exist

**Build fails in GitHub Actions**
- Verify secrets are added to GitHub repository
- Check that wrangler.toml is committed to repo
- Review Actions tab for specific error messages

## Security Notes

- Never commit API keys to git
- Use Worker secrets for sensitive data
- Honeypot field prevents most spam
- Consider adding Cloudflare Turnstile for additional protection
- HTTPS is automatic via Cloudflare

## Cost Estimate

- Cloudflare Workers: **Free** (100,000 requests/day)
- Resend: **Free** (100 emails/day)
- Domain: **Already owned**
- GitHub: **Free** (public repository)

**Total monthly cost: $0**
