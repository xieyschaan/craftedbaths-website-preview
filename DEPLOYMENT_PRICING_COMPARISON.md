# Deployment Platform Pricing & Options Comparison

This document compares deployment options for the Crafted Bathrooms website, focusing on pricing transparency and scalability.

---

## Current Issue

**Problem:** Cloudflare Pages deployment fails because the Worker bundle (~18.8 MB) exceeds the **3 MB free tier limit**.

**Root Cause:** `@cloudflare/next-on-pages` bundles all routes into a single Worker, and with 13 pages, the bundle exceeds the free tier.

---

## Option 1: Cloudflare Workers Paid Plan

### Pricing Structure

**Base Subscription:** $5/month minimum

**Included Monthly:**
- ✅ 10 million requests
- ✅ 30 million CPU milliseconds
- ✅ 10 MB Worker size limit (vs 3 MB free)
- ✅ **Unlimited bandwidth** (no egress charges)
- ✅ Unlimited static assets

**Additional Usage Costs:**
- Requests: $0.30 per million (after 10M included)
- CPU time: $0.02 per million CPU milliseconds (after 30M included)

### Cost Examples

| Monthly Traffic | Requests | CPU Time | Monthly Cost |
|----------------|----------|----------|--------------|
| Small site | 2M | 5M ms | **$5** (base only) |
| Medium site | 15M | 7ms avg | **~$8** ($5 + $1.50 + $1.50) |
| Large site | 50M | 10ms avg | **~$20** ($5 + $12 + $3) |
| Very large | 100M | 15ms avg | **~$40** ($5 + $27 + $8) |

**Key Point:** Bandwidth is **unlimited and free**—this is Cloudflare's biggest advantage.

### Pros
- ✅ Unlimited bandwidth (huge cost savings at scale)
- ✅ 300+ global edge locations (fast worldwide)
- ✅ Predictable base cost ($5/month)
- ✅ No hidden bandwidth charges
- ✅ Excellent DDoS protection included

### Cons
- ⚠️ Usage-based pricing can scale with traffic
- ⚠️ Need to monitor request/CPU usage
- ⚠️ Current adapter (`next-on-pages`) has bundle size issues

---

## Option 2: Switch to OpenNext Cloudflare Adapter

**What it is:** The modern replacement for `@cloudflare/next-on-pages` (which is archived).

**Benefits:**
- ✅ **Smaller bundles:** 8 MB vs 14 MB (could solve size issue)
- ✅ Better optimization
- ✅ Actively maintained
- ✅ Same Cloudflare infrastructure

**Migration Effort:** Medium (requires adapter change, but same platform)

**Recommendation:** Try this **before** upgrading to paid plan—might solve the bundle size issue on free tier.

---

## Option 3: Vercel (Next.js Native)

### Pricing Structure

**Free Tier:**
- 100 GB bandwidth/month
- 100K function invocations/day
- Unlimited static assets
- 1 user

**Pro Plan:** $20/user/month
- 1 TB bandwidth/month
- 1M function invocations/month
- 6,000 build minutes/month
- Team features

**Additional Costs:**
- Bandwidth overage: $40 per 100 GB
- Function invocations: $2 per 1M (after plan limit)
- Build minutes: $0.36 per 1,000 minutes

### Cost Examples

| Monthly Traffic | Bandwidth | Functions | Monthly Cost |
|----------------|-----------|-----------|--------------|
| Small | 50 GB | 500K | **$0** (free tier) |
| Medium | 200 GB | 2M | **$20** (Pro) + $40 overage = **$60** |
| Large | 1.5 TB | 5M | **$20** + $200 + $8 = **$228** |

### Pros
- ✅ **Best Next.js support** (made by Next.js creators)
- ✅ Zero configuration
- ✅ Automatic optimizations
- ✅ Preview deployments
- ✅ Excellent developer experience

### Cons
- ⚠️ **Bandwidth costs can spike** ($40 per 100 GB overage)
- ⚠️ Function invocations count middleware, images, routes
- ⚠️ Less predictable costs at scale
- ⚠️ More expensive than Cloudflare for high traffic

---

## Option 4: Netlify

### Pricing Structure

**Free Tier:**
- 100 GB bandwidth/month
- 125K function invocations/month
- 300 build minutes/month
- 1 user

**Pro Plan:** $19/member/month
- 1 TB bandwidth/month
- 25,000 build minutes/month
- Team features

**Additional Costs:**
- Bandwidth overage: $55 per 100 GB
- Function invocations: $25 per 1M (after plan limit)

### Pros
- ✅ More predictable pricing than Vercel
- ✅ Strong static/ISR workflows
- ✅ Built-in forms and plugins
- ✅ Good developer experience

### Cons
- ⚠️ Bandwidth overage is expensive ($55 per 100 GB)
- ⚠️ Less Next.js-specific optimizations than Vercel
- ⚠️ More expensive than Cloudflare for high traffic

---

## Recommendation Matrix

### For Your Situation (Growing Website)

| Priority | Option | Why |
|----------|--------|-----|
| **1st** | **OpenNext + Cloudflare Free** | Try switching adapters first—might solve bundle size without cost |
| **2nd** | **Cloudflare Paid ($5/month)** | If OpenNext doesn't work, upgrade. Best value for unlimited bandwidth. |
| **3rd** | **Vercel Pro ($20/month)** | If you need best Next.js features and can accept bandwidth costs |
| **4th** | **Netlify Pro ($19/month)** | If you prefer predictable pricing over Next.js-specific features |

---

## Cost Projection for Growing Website

### Scenario: 100K visitors/month, 500K page views

| Platform | Monthly Cost | Notes |
|----------|--------------|-------|
| **Cloudflare Paid** | **~$5-10** | Unlimited bandwidth included |
| **Vercel Pro** | **~$20-40** | Bandwidth overage likely |
| **Netlify Pro** | **~$19-35** | Bandwidth overage likely |

### Scenario: 1M visitors/month, 5M page views

| Platform | Monthly Cost | Notes |
|----------|--------------|-------|
| **Cloudflare Paid** | **~$15-25** | Still unlimited bandwidth |
| **Vercel Pro** | **~$100-200** | Significant bandwidth costs |
| **Netlify Pro** | **~$100-150** | Significant bandwidth costs |

**Winner:** Cloudflare scales best due to unlimited bandwidth.

---

## Action Plan

### Immediate (Fix Current Deployment)

1. **Try OpenNext adapter first** (free, might solve bundle size)
   - Switch from `@cloudflare/next-on-pages` to `@opennextjs/cloudflare`
   - Smaller bundles (8 MB vs 14 MB) might fit in free tier
   - Same Cloudflare infrastructure

2. **If OpenNext doesn't work:**
   - Upgrade to Cloudflare Workers Paid ($5/month)
   - 10 MB limit should cover current bundle
   - Monitor usage for first month

### Long-term (As Website Grows)

- **Stick with Cloudflare** if traffic grows—unlimited bandwidth is huge advantage
- Monitor request/CPU usage in Cloudflare dashboard
- Set up billing alerts at $10, $20, $50 thresholds
- Consider Vercel only if you need specific Next.js features Cloudflare lacks

---

## Questions to Consider

1. **Expected traffic?** (affects which platform is cheapest)
2. **Bandwidth needs?** (Cloudflare's unlimited is huge advantage)
3. **Team size?** (affects per-user pricing)
4. **Need Next.js-specific features?** (Vercel has best support)

---

## Next Steps

1. **Try OpenNext adapter** → Might solve bundle size for free
2. **If that fails** → Upgrade Cloudflare to $5/month plan
3. **Monitor costs** → Set up billing alerts
4. **Re-evaluate** → After 3-6 months based on actual usage

---

**Bottom Line:** Cloudflare's $5/month plan with unlimited bandwidth is likely your best long-term value, especially as the website grows. Try OpenNext first to potentially avoid the upgrade.
