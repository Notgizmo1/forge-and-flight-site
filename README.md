# forgeandflight.com — Forge & Flight Holdings, Inc.

Corporate website for Forge & Flight Holdings, Inc. Built with Hugo, deployed to Cloudflare Pages via GitHub push.

**Live site:** https://forgeandflight.com
**Entity:** Forge & Flight Holdings, Inc. — CAGE 18WR3 | UEI Z9PWMMZXJ321
**HQ:** 261 Niagara Carthage Rd, Carthage, NC 28327 (Sandhills Region, 35 miles from Fort Bragg)

---

## Stack

- Hugo 0.147.7 static site generator (hugo --minify)
- Cloudflare Pages hosting (project: forge-and-flight-holdings)
- Cloudflare Pages Functions for www redirect middleware (functions/_middleware.js)
- Google Analytics: G-4RVS5R9Z6G (configured in hugo.toml)
- Bing Webmaster: 14004303FC294B3ABCE4718C3F1E32E6 (in layouts/partials/head.html)
- IndexNow key: 7e3ded4af3298769f7d37e4fd4f55bbb (static/7e3ded4af3298769f7d37e4fd4f55bbb.txt)

---

## Content Areas

- Platforms: content/platforms/ (links out to forgeandflightlabs.com)
- Software: content/software/ (IronMesh, Nexus, AegisEye, FireWatch suite)
- Solutions: content/solutions/ (Bastion, FireWatch, FloodWatch, OverWatch)
- Services: content/services/ (Federal Services Division, Professional Services)
- Red Air Operations: content/services/red-air.md (DaaS adversary air replication for military exercises)
- Forge Flex: content/forge-flex/ (Manufacturing & Procurement as a Service retainer, CAGE 18VF2)
- Compliance: content/compliance/ (CMMC L2, SPRS 110/110, NDAA 848/889, SAM Active)
- Careers: layouts/careers/single.html (hardcoded — Perry USAR positions contingent on award)
- News: content/news/ (22 articles, staggered publish dates)

---

## SEO Notes

- Organization schema in layouts/partials/schema.html: @id, subOrganization cross-links to Labs/Academy, full hasCredential, Carthage geo (35.3504, -79.4132)
- Article schema in layouts/news/single.html
- Custom sitemap at layouts/sitemap.xml: excludes /government-systems/ (noindex) and taxonomy pages
- www.forgeandflight.com redirects 301 to forgeandflight.com via Pages Function middleware

---

## Standing Rules

- government-systems/ is noindex, nofollow — DoD-restricted, excluded from sitemap
- No prices on any public page
- DART and X-Lance deliberately excluded from public catalog
- All location references: Carthage, NC (261 Niagara Carthage Rd, 28327)
- No em dashes anywhere

---

## Local Dev

hugo server -D

## Deploy

Push to main. Cloudflare Pages auto-builds. IndexNow Action fires 2 minutes post-deploy.

Sister sites: forgeandflightlabs.com | forgeandflightacademy.com
