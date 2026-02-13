# Forge & Flight Holdings Website Deployment Guide

Complete deployment instructions for your corporate website using GitHub and Cloudflare Pages.

Last Updated: February 12, 2026

---

## TABLE OF CONTENTS

1. What's Included
2. Deployment to Cloudflare Pages
3. Custom Domain Setup
4. Contact Form Configuration
5. Pre-Launch Checklist
6. Customization Guide
7. Maintenance Schedule
8. Troubleshooting

---

## 1. WHAT'S INCLUDED

Your complete corporate website package contains:

**MAIN PAGES (4)**
- Homepage with hero, capabilities, markets, and differentiators
- About page with leadership, values, corporate structure, and facilities
- Operating Companies page with all 4 subsidiaries detailed
- Contact page with form including government agency and export control checkboxes

**LEGAL PAGES (5)**
- Privacy Policy (GDPR/CCPA compliant)
- Terms of Use (export control compliant)
- Cookie Policy (with auto-consent banner)
- Accessibility Statement (WCAG 2.1 AA)
- Export Control & ITAR Notice (comprehensive compliance documentation)

**DESIGN FEATURES**
- Navy (#1B2845) and Steel Blue (#5588A3) color scheme
- Bold modern aerospace aesthetic
- Fully responsive design (mobile, tablet, desktop)
- Professional typography using system fonts
- Clean, minimal design without unnecessary elements

**TECHNICAL FEATURES**
- Google Analytics integrated (GA4: G-4RVS5R9Z6G)
- Contact form with client-side validation
- Cookie consent banner (GDPR compliant)
- Mobile menu functionality
- SEO optimized structure
- Fast loading (no heavy frameworks)
- Accessibility compliant (WCAG 2.1 AA)

**CORRECT INFORMATION**
- Location: Fayetteville, North Carolina (Holdings headquarters)
- All 4 operating companies listed: Labs, Academy, Avionics, Test Systems
- Links to Labs and Academy websites (live sites)
- Avionics and Test Systems noted as "Launching 2026"
- CAGE: 18WR3, EIN: 41-3413730
- Established: January 2026

---

## 2. DEPLOYMENT TO CLOUDFLARE PAGES

### STEP 1: Push to GitHub

Navigate to your local repository folder:
```bash
cd /path/to/forge-and-flight-site
```

Delete existing contents (IMPORTANT):
```bash
# On Mac/Linux:
rm -rf *
rm -rf .*

# On Windows PowerShell:
Remove-Item * -Recurse -Force
Remove-Item .* -Recurse -Force
```

Copy all new website files from the downloaded folder into your repository.

Commit and push to GitHub:
```bash
git add .
git commit -m "Complete website rebuild with all pages and legal compliance"
git push origin main
```

### STEP 2: Connect to Cloudflare Pages

1. Log in to Cloudflare Dashboard (dash.cloudflare.com)
2. Navigate to "Workers & Pages" in left sidebar
3. Click "Create application"
4. Select "Pages" tab
5. Click "Connect to Git"

### STEP 3: Configure Repository

1. Select your GitHub repository: "forge-and-flight-site"
2. Click "Begin setup"

**Build Configuration:**
- Production branch: main
- Build command: (leave blank - static site)
- Build output directory: /
- Root directory: (leave blank)

3. Click "Save and Deploy"

### STEP 4: Deployment

Cloudflare will automatically:
- Deploy your site
- Assign a URL: yourproject.pages.dev
- Generate SSL certificate
- Configure CDN globally

Deployment typically takes 1-3 minutes.

---

## 3. CUSTOM DOMAIN SETUP

### For forgeandflight.com:

**In Cloudflare Pages Dashboard:**
1. Go to your Pages project
2. Click "Custom domains" tab
3. Click "Set up a custom domain"
4. Enter: forgeandflight.com
5. Click "Continue"

**DNS Configuration:**

If domain is already in Cloudflare (recommended):
- Cloudflare will automatically configure DNS
- No manual changes needed

If domain is NOT in Cloudflare:
1. Add domain to Cloudflare
2. Update nameservers at your registrar
3. Wait 24-48 hours for propagation

**WWW Redirect:**
To redirect www.forgeandflight.com to forgeandflight.com:
1. Add CNAME record: www -> forgeandflight.com
2. Create Page Rule in Cloudflare:
   - URL: www.forgeandflight.com/*
   - Setting: Forwarding URL (301)
   - Destination: https://forgeandflight.com/$1

---

## 4. CONTACT FORM CONFIGURATION

The contact form validates input but does NOT currently send emails. You must configure an email service.

### RECOMMENDED: Formspree (Easiest)

1. Go to https://formspree.io
2. Sign up for free account (100 submissions/month)
3. Click "New Form"
4. Copy your form endpoint URL

5. Edit contact.html and update the form tag:
```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

6. In js/main.js, comment out the submitForm function
7. Deploy updated files to Cloudflare

**First submission will require email verification**

### ALTERNATIVE: FormSubmit (No Account Needed)

1. Edit contact.html, change form action to:
```html
<form action="https://formsubmit.co/info@forgeandflight.com" method="POST">
```

2. First submission triggers verification email
3. Click verification link
4. Service is active

### ADVANCED: Custom Backend

If you have development resources:
- Deploy serverless function (Cloudflare Workers)
- Use AWS Lambda + API Gateway
- Build Node.js backend with email service
- Update submitForm() function in js/main.js

---

## 5. PRE-LAUNCH CHECKLIST

### CONTENT VERIFICATION
- [ ] Company location is correct (Fayetteville, North Carolina)
- [ ] Email addresses are active (info@forgeandflight.com)
- [ ] CAGE and EIN are displayed correctly (18WR3, 41-3413730)
- [ ] Operating company links work (Labs, Academy)
- [ ] Logo displays properly

### FUNCTIONALITY TESTING
- [ ] Submit test contact form (verify receipt)
- [ ] All internal navigation links work
- [ ] All external links open correctly
- [ ] Mobile menu opens/closes properly
- [ ] Cookie consent banner appears on first visit
- [ ] Forms validate required fields

### TECHNICAL VERIFICATION
- [ ] Google Analytics tracking code is active
- [ ] HTTPS is enabled (green lock in browser)
- [ ] Site loads in under 3 seconds
- [ ] Mobile responsive on phones and tablets
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] No console errors (press F12 to check)

### LEGAL COMPLIANCE
- [ ] All legal pages load correctly
- [ ] Privacy policy includes required disclosures
- [ ] Export control notice is prominently displayed
- [ ] Terms of use are complete
- [ ] Cookie policy explains tracking

### SEO & PERFORMANCE
- [ ] Page titles are descriptive and unique
- [ ] Meta descriptions are present
- [ ] Images have alt text
- [ ] Heading structure is logical
- [ ] No broken links

---

## 6. CUSTOMIZATION GUIDE

### UPDATING COLORS

Edit css/styles.css, find the :root section (lines 3-10):

```css
:root {
    --navy: #1B2845;           /* Primary dark color */
    --steel-blue: #5588A3;     /* Accent color */
    --white: #FFFFFF;          /* Background */
    --light-gray: #F5F7FA;     /* Secondary background */
    --text-dark: #2C3E50;      /* Body text */
    --text-medium: #5A6C7D;    /* Secondary text */
}
```

Change the hex color values as desired.

### UPDATING CONTENT

All content is in HTML files. Open with any text editor:

- Homepage content: index.html
- About page content: about.html
- Operating companies: operating-companies.html
- Contact information: contact.html
- Legal pages: privacy.html, terms.html, etc.

Find the text you want to change and edit directly. HTML tags remain the same.

### ADDING IMAGES

1. Save images to images/ folder
2. Recommended sizes:
   - Logo: 200x200px
   - Photos: 1200px wide max
   - Optimize before upload (use TinyPNG.com)

3. Reference in HTML:
```html
<img src="images/your-photo.jpg" alt="Descriptive text">
```

### UPDATING COMPANY INFORMATION

Search and replace in all HTML files:

Current values:
- Location: Fayetteville, North Carolina
- Email: info@forgeandflight.com
- CAGE: 18WR3
- EIN: 41-3413730
- Phone: (if added)

Use your text editor's "Find and Replace" function to update across all files.

---

## 7. MAINTENANCE SCHEDULE

### WEEKLY
- Check contact form submissions
- Review site accessibility
- Monitor analytics for errors

### MONTHLY
- Review Google Analytics traffic
- Test all forms and links
- Verify email deliverability
- Check for broken external links
- Review site speed (Google PageSpeed Insights)

### QUARTERLY
- Update company information if changed
- Review and refresh content
- Add news or announcements
- Check for outdated information
- Update legal pages if regulations change

### ANNUALLY
- Update copyright year in footer
- Review and update all legal pages
- Refresh "Last Updated" dates
- Security audit and review
- Check WCAG compliance
- Update Google Analytics goals

---

## 8. TROUBLESHOOTING

### SITE NOT LOADING AFTER DEPLOYMENT

**Possible causes:**
- Deployment still in progress (wait 2-3 minutes)
- Build failed (check Cloudflare Pages logs)
- DNS not propagated (wait up to 48 hours)

**Solutions:**
1. Check deployment status in Cloudflare Dashboard
2. Review build logs for errors
3. Verify files are in repository root (not subfolder)
4. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### IMAGES NOT DISPLAYING

**Possible causes:**
- Image files not uploaded
- Incorrect file path
- Case-sensitive filename mismatch

**Solutions:**
1. Verify images are in images/ folder in repository
2. Check HTML references: src="images/logo.png"
3. Ensure filenames match exactly (case-sensitive)
4. Check image file extensions (.png, .jpg, .jpeg)

### CONTACT FORM NOT WORKING

**Possible causes:**
- Email service not configured
- JavaScript errors
- Form validation issues

**Solutions:**
1. Configure Formspree or FormSubmit (see Section 4)
2. Open browser console (F12) to check for errors
3. Test with minimal data first
4. Verify export control checkbox is checked

### MOBILE MENU NOT OPENING

**Possible causes:**
- JavaScript not loading
- Browser cache issue
- Mobile viewport not detected

**Solutions:**
1. Clear browser cache
2. Check that js/main.js is loading (view page source)
3. Test in different mobile browser
4. Verify viewport meta tag in HTML head

### ANALYTICS NOT TRACKING

**Possible causes:**
- Google Analytics ID incorrect
- Tracking code blocked by ad blocker
- Not enough time passed for data collection

**Solutions:**
1. Verify GA4 ID is correct: G-4RVS5R9Z6G
2. Test in Incognito/Private mode (disables extensions)
3. Wait 24-48 hours for data to appear
4. Check Google Analytics admin panel for property status

### SSL CERTIFICATE ERRORS

**Possible causes:**
- Certificate still provisioning
- DNS not pointed correctly
- Mixed content (HTTP resources on HTTPS page)

**Solutions:**
1. Wait 15-30 minutes for certificate provisioning
2. Verify DNS settings in Cloudflare
3. Ensure all resources use HTTPS URLs
4. Check for http:// links in HTML and CSS

### SLOW LOADING SPEED

**Possible causes:**
- Large image files
- Too many external resources
- CDN not caching properly

**Solutions:**
1. Optimize images (compress, resize)
2. Enable Cloudflare caching rules
3. Minimize external scripts
4. Use lazy loading for images

---

## GOOGLE ANALYTICS SETUP

Your site includes Google Analytics tracking code:
- Measurement ID: G-4RVS5R9Z6G

**To view analytics:**
1. Go to https://analytics.google.com
2. Sign in with Google account
3. Select "Forge & Flight Holdings" property
4. Wait 24-48 hours after launch for data

**Recommended tracking:**
- Page views
- User demographics
- Traffic sources
- Conversion events (contact form submissions)
- Bounce rate
- Average session duration

---

## CLOUDFLARE FEATURES TO ENABLE

**Recommended Cloudflare settings:**

1. **Auto Minify**
   - Settings > Optimization > Auto Minify
   - Enable: JavaScript, CSS, HTML

2. **Brotli Compression**
   - Settings > Optimization > Brotli
   - Enable

3. **Browser Cache TTL**
   - Settings > Caching > Browser Cache TTL
   - Set to: 4 hours or more

4. **Security Level**
   - Settings > Security > Security Level
   - Set to: Medium or High

5. **SSL/TLS Mode**
   - Settings > SSL/TLS
   - Set to: Full (strict)

---

## CONTACT FORM FIELDS

The contact form includes:

**Required fields:**
- Full Name
- Email Address
- Company/Organization
- Message (minimum 20 characters)
- Export Control Acknowledgment (checkbox)

**Optional fields:**
- Phone Number
- Inquiry Type (dropdown)

**Special checkboxes:**
- Government Agency (identifies government customers)
- Export Control Acknowledgment (required - ITAR compliance)

---

## FILE STRUCTURE

```
forge-flight-site/
  index.html                  - Homepage
  about.html                  - About page
  operating-companies.html    - Operating companies
  contact.html                - Contact form
  privacy.html                - Privacy policy
  terms.html                  - Terms of use
  cookies.html                - Cookie policy
  accessibility.html          - Accessibility statement
  export-control.html         - Export control notice
  README.md                   - Technical documentation
  .gitignore                  - Git ignore rules
  css/
    styles.css                - All styling
  js/
    main.js                   - All JavaScript
  images/
    logo.png                  - Company logo
```

---

## SUPPORT CONTACTS

**For website technical issues:**
Email: info@forgeandflight.com
Subject: "Website Technical Support"

**For Cloudflare support:**
Cloudflare Dashboard > Support
Community: community.cloudflare.com

**For GitHub issues:**
GitHub Support: support.github.com

---

## NEXT STEPS

1. Push code to GitHub repository
2. Connect repository to Cloudflare Pages
3. Configure contact form email service
4. Setup custom domain (optional)
5. Test all functionality
6. Launch!

---

## SECURITY BEST PRACTICES

1. **HTTPS Only**
   - Always use HTTPS in production
   - Cloudflare provides free SSL certificates
   - Enable "Always Use HTTPS" in Cloudflare

2. **Form Security**
   - All forms validate input
   - Server-side validation required for email service
   - Rate limiting recommended to prevent spam

3. **Export Control**
   - Export control checkboxes are mandatory
   - Terms of Use includes ITAR compliance
   - Citizenship verification may be required for technical data

4. **Privacy Compliance**
   - Privacy Policy is GDPR/CCPA ready
   - Cookie consent banner included
   - User data handling documented

5. **Regular Updates**
   - Keep content current
   - Update legal pages annually
   - Review security settings quarterly

---

## PERFORMANCE BENCHMARKS

Expected performance with Cloudflare Pages:

- Page Load Time: Under 2 seconds
- Time to Interactive: Under 3 seconds
- First Contentful Paint: Under 1 second
- Largest Contentful Paint: Under 2.5 seconds
- Cumulative Layout Shift: Under 0.1
- First Input Delay: Under 100ms

Test with: Google PageSpeed Insights, GTmetrix, WebPageTest

---

## DEPLOYMENT VERIFICATION

After deployment, verify these URLs work:

Main pages:
- https://forgeandflight.com/
- https://forgeandflight.com/about.html
- https://forgeandflight.com/operating-companies.html
- https://forgeandflight.com/contact.html

Legal pages:
- https://forgeandflight.com/privacy.html
- https://forgeandflight.com/terms.html
- https://forgeandflight.com/cookies.html
- https://forgeandflight.com/accessibility.html
- https://forgeandflight.com/export-control.html

Resources:
- https://forgeandflight.com/css/styles.css
- https://forgeandflight.com/js/main.js
- https://forgeandflight.com/images/logo.png

---

**Forge & Flight Holdings, Inc.**
First in Flight, Innovation Limitless | American-Made | NDAA Compliant

Fayetteville, North Carolina
CAGE: 18WR3 | EIN: 41-3413730

---

END OF DEPLOYMENT GUIDE
