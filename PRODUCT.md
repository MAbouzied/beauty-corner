# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are Arabic-speaking residents of Hafr Al-Batin and nearby areas seeking trusted dental or dermatology care. They arrive from search, WhatsApp, or local referral, often comparing clinics before booking.

Secondary users include English-speaking visitors who need clinic basics (services, doctors, contact, booking) but not blog content at launch.

## Product Purpose

Beauty Corner (بيوتي كورنر) is a dental and dermatology clinic website that explains services, introduces doctors and devices, and converts visitors into booked appointments via WhatsApp and the booking form.

Success means clear local trust, accurate clinic information, and completed booking intent without friction.

## Positioning

A bilingual clinic site rooted in Hafr Al-Batin (Al Muhammadiyah, King Faisal Road) with real doctors, licensed practice details, and Arabic-first content — not a generic multi-city medical marketplace.

## Operating Context

- Public marketing site built with Astro, deployed on Cloudflare
- Arabic is the default locale; English covers core clinic routes
- Blog launches Arabic-only at `/blogs` and `/blogs/[slug]`
- Booking and contact flows remain the primary conversion paths
- Current visual system (Tajawal, pink primary, blush surfaces, gold CTAs) is the authority for extensions

## Brand Commitments

- Brand names: بيوتي كورنر / Beauty Corner
- Preserve existing typography, color tokens, radii, shadows, and spacing rhythm when adding surfaces
- Medical claims in educational content must stay conservative and marked for clinical review before production publication

## Constraints

- Do not invent testimonials, unverified clinical outcomes, or fake doctors
- English blog routes are out of scope for launch
- Blog content may start as mock fixtures until Sanity is configured
- SEO must not emit English alternates for Arabic-only blog URLs

## Open Decisions

- Sanity project credentials and webhook rebuild pipeline (integration prepared, not required for mock launch)
- Final clinical review of mock article medical statements before production publication

## Inferred From Repository

Facts above were inferred from the existing site, `docs/blog-implementation-plan.md`, and clinic data modules because a live product interview was not completed before implementation.
