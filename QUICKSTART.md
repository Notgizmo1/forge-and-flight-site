# Quick Start - Forge and Flight Website

## ⚡ Fast Track Deployment (30 minutes)

### Step 1: Get the Code (2 min)
```bash
# Download and extract the project files
cd forge-and-flight-site
npm install
```

### Step 2: Cloudflare Setup (10 min)
1. Login to Cloudflare → Select forgeandflight.com
2. Copy **Account ID** from right sidebar
3. Create API Token:
   - My Profile → API Tokens → Create Token
   - Use "Edit Cloudflare Workers" template
   - Copy token immediately

### Step 3: GitHub Setup (5 min)
1. Create new GitHub repository: `forge-and-flight-site`
2. Add repository secrets (Settings → Secrets):
   - `CLOUDFLARE_API_TOKEN` = [your token]
   - `CLOUDFLARE_ACCOUNT_ID` = [your account ID]

### Step 4: Email Setup (10 min)
1. Sign up at https://resend.com
2. Add domain: `forgeandflight.com`
3. Copy DNS records to Cloudflare DNS
4. Wait 5 min → Verify domain
5. Create API key
6. Add secrets:
```bash
npx wrangler secret put RESEND_API_KEY
# Paste your Resend API key

npx wrangler secret put CONTACT_EMAIL
# Enter: info@forgeandflight.com (or your email)
```

### Step 5: Deploy (3 min)
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/forge-and-flight-site.git
git push -u origin main

# Manual deploy (or wait for GitHub Actions)
npm run deploy
```

### Step 6: Connect Domain (2 min)
1. Cloudflare Dashboard → Workers & Pages
2. Click your worker → Settings → Domains & Routes
3. Add Custom Domain: `forgeandflight.com`
4. Add Custom Domain: `www.forgeandflight.com`
5. Wait 5 minutes → Visit https://forgeandflight.com

## ✅ Verification Checklist

- [ ] Website loads at forgeandflight.com with valid SSL
- [ ] All 3 pages work (Home, About, Contact)
- [ ] Contact form submits successfully
- [ ] You receive test email at configured address
- [ ] GitHub Actions shows successful deployment

## 🎨 Next Steps

### Customize Content
- Edit `public/index.html` for homepage text
- Edit `public/about.html` for company story
- Edit `public/contact.html` for contact info
- Update email in footer: search/replace "info@forgeandflight.com"

### Add Logo & Images
- Place logo in `public/images/logo.png`
- Add hero image to `public/images/hero.jpg`
- Update HTML to reference images

### Optional Enhancements
- Add Google Analytics
- Add Cloudflare Web Analytics
- Set up Cloudflare Turnstile (better CAPTCHA)
- Add more pages (Services, Portfolio, etc.)

## 🆘 Quick Fixes

**Site not loading?**
```bash
npm run deploy
# Wait 2 minutes, check again
```

**Form not working?**
```bash
npx wrangler secret list
# Should show RESEND_API_KEY and CONTACT_EMAIL
npm run tail
# Check logs for errors
```

**Need to update content?**
```bash
# Edit files, then:
git add .
git commit -m "Update homepage"
git push
# Auto-deploys in ~2 minutes
```

## 📞 Support

- **Documentation**: See SETUP_GUIDE.md
- **Cloudflare Docs**: https://developers.cloudflare.com/workers/
- **Issues**: GitHub Issues tab
- **Email**: info@forgeandflight.com
