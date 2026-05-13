---
title: "CMMC Level 2 for Small UAS Manufacturers: How We Achieved a Perfect SPRS 110/110 Score"
date: 2026-05-13
description: "How a small UAS manufacturer achieved a perfect CMMC Level 2 SPRS score of 110/110 against NIST SP 800-171 Rev. 2. A practical look at what it takes and why it matters for DoD contracting."
keywords: "CMMC Level 2 small business, SPRS 110/110, NIST SP 800-171 small business, CMMC compliance UAS manufacturer, defense contractor cybersecurity, SPRS score DoD contracting, CMMC self-assessment small business, cybersecurity maturity model certification small manufacturer"
summary: "Achieving a perfect SPRS 110/110 against NIST SP 800-171 Rev. 2 as a small defense manufacturer is not common — but it is achievable with the right approach. Here is what it took and why it matters for DoD contract eligibility."
---

The Cybersecurity Maturity Model Certification Level 2 framework requires implementation of all 110 controls defined in NIST Special Publication 800-171 Revision 2. For large defense primes, this is a matter of compliance program management. For small businesses, it is a significant organizational undertaking that most treat as aspirational rather than operational.

Forge & Flight Holdings completed its CMMC Level 2 self-assessment with a SPRS score of 110/110 — all 110 controls implemented — and uploaded the score to sprs.csd.disa.mil in May 2026. Here is what that process involved and why it matters for defense acquisition.

## Why CMMC Level 2 Matters for Small Defense Companies

DoD contracts involving Controlled Unclassified Information (CUI) require CMMC Level 2 compliance. This covers a broad range of acquisition categories — UAS platform sales, software licenses, technical data packages, and many professional services contracts where sensitive program information is exchanged.

For small businesses, the practical stakes are straightforward: without a documented SPRS score above the 88-point conditional threshold, you are excluded from a significant portion of the DoD acquisition pipeline. With a 110/110 score, you are not only eligible — you are competitive against primes who may carry partial compliance records.

## The 110 Controls and What They Actually Cover

NIST SP 800-171 Rev. 2 organizes its 110 controls across 14 control families. For a small manufacturer, the domains with the most implementation work are typically:

**Access Control (22 controls):** User account management, multi-factor authentication, least privilege enforcement, and session management across all systems handling CUI.

**System and Communications Protection (24 controls):** Network segmentation, encrypted communications, boundary protection, and — historically the most common gap for small businesses — FIPS-validated cryptography for VPN and remote access.

**Audit and Accountability (9 controls):** Logging, log review, and tamper-evident audit trails for all systems touching CUI.

**Configuration Management (9 controls):** Baseline configurations, change control, and software execution policies.

For most small defense companies, the FIPS-validated cryptography requirement (SC.L2-3.13.11) is where the gap lives. Commercial VPN and remote access tools often do not use FIPS-validated modules by default. Resolving it requires either migrating to FIPS-validated alternatives or implementing compensating controls with documented rationale.

## What Closing All 110 Controls Required

The path to 110/110 involved five parallel workstreams:

**Documentation:** System Security Plan covering all 110 controls with implementation descriptions. Hardware and software inventory. CUI handling procedures. Incident response plan. This documentation alone runs several hundred pages for a full implementation.

**Technical implementation:** MFA across all systems, network segmentation separating CUI-handling environments, endpoint management, encrypted communications at all layers, and FIPS-validated cryptography for remote access.

**CI/CD pipeline security:** All repositories configured with automated security scanning — static analysis, dependency auditing, and container hardening as part of every build. This addresses several Configuration Management and Risk Assessment controls simultaneously.

**Vendor management:** Ensuring all third-party tools and platforms handling CUI also meet the baseline. Cloud infrastructure, communication platforms, and development tools all required review.

**Ongoing monitoring:** CMMC Level 2 is not a point-in-time certification — it requires continuous monitoring, periodic internal review, and maintained documentation. Building the monitoring infrastructure is part of the work.

## C3PAO Third-Party Assessment

Self-assessment and SPRS upload establishes conditional Level 2 eligibility. Full Level 2 certification requires a C3PAO (Certified Third-Party Assessor Organization) assessment. Our C3PAO engagement is scheduled for late 2026.

For procurements requiring assessed Level 2 certification rather than self-assessed, the C3PAO assessment provides the formal certification artifact. Most current DoD solicitations below the $10M threshold accept self-assessed SPRS scores for Level 2 eligibility.

## What This Means for DoD Buyers

When evaluating a small defense technology vendor, ask for:

1. Their SPRS score and upload date — verifiable at sprs.csd.disa.mil
2. Whether they have a current System Security Plan on file
3. Whether their CI/CD pipeline includes automated security scanning
4. Their C3PAO assessment timeline

Forge & Flight Holdings is fully documented on all four. [View our compliance credentials →](/compliance/)
