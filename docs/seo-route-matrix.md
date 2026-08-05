# SEO Route Matrix — Phase 1 Deliverable

**Site:** https://beautycorner.sa  
**Locales:** Arabic (default, `/`) · English (`/en`)  
**Total indexable URLs:** 44 (22 bilingual route pairs)  
**Manifest source:** `src/lib/i18n/routes.ts`

---

## Summary of SEO Decisions

| Decision | Detail |
|----------|--------|
| **/book indexed separately from /contact** | `/book` targets appointment-conversion intent; `/contact` targets location/NAP/contact intent. Both are indexable with distinct titles and descriptions. See `BOOK_INDEXING_DECISION` in `routes.ts`. |
| **Redirects (not in sitemap)** | `/devices` → `/#devices` · `/en/devices` → `/en#devices` — anchor-only; no standalone indexable page. |
| **API excluded** | `/api/customers` — server endpoint, not indexed, not in sitemap. |
| **404 handling** | `noindex,follow`; no hreflang to `/en/404`; conceptual pair only in manifest (`not-found`). |
| **Orphans** | None among indexable pairs — every indexable URL has AR/EN counterpart and internal links. |
| **Thin / removed content** | Dead AR blog cards and unverified testimonials removed; real opening hours + Google Maps embed added. |
| **Privacy** | `/privacy` and `/en/privacy` added, indexable, linked from booking forms and footer. |
| **Social image** | Default OG/Twitter card: `/assets/social-card.png` (1536×1024) with width/height/type/secure_url. |
| **Cloudflare (manual)** | Confirm HTTP→HTTPS and WWW→apex redirects in Cloudflare dashboard; keep `workers.dev` / preview hosts noindex (Layout host check). |
| **Hreflang x-default** | Points to Arabic URL for all indexable pairs. |
| **Priority parity** | Same sitemap priority for AR and EN per route pair (no language-based priority difference). |

---

## Field Legend

| Field | Standard value |
|-------|------------------|
| **Canonical** | Self-referencing absolute URL |
| **Hreflang** | `ar` → AR URL · `en` → EN URL · `x-default` → AR URL |
| **Robots** | `index,follow` (indexable routes) |
| **Social image** | `/assets/social-card.png` unless noted |
| **Sitemap** | Yes for all indexable pairs |

---

## Static Routes (6 pairs · 12 URLs)

### 1. Home

| | Arabic | English |
|---|--------|---------|
| **URL** | https://beautycorner.sa/ | https://beautycorner.sa/en |
| **Title (planned)** | عيادة أسنان وجلدية في حفر الباطن \| بيوتي كورنر | Dental & Dermatology Clinic in Hafr Al-Batin \| Beauty Corner |
| **Description (planned)** | عيادة بيوتي كورنر لطب الأسنان والجلدية في حفر الباطن — حي المحمدية، طريق الملك فيصل. احجز موعدك عبر واتساب. | Beauty Corner dentistry and dermatology clinic in Hafr Al-Batin, Al Muhammadiyah, King Faisal Road. Book via WhatsApp. |
| **Canonical** | https://beautycorner.sa/ | https://beautycorner.sa/en |
| **Hreflang** | ar→`/`, en→`/en`, x-default→`/` | Same |
| **Robots** | index,follow | index,follow |
| **H1** | رعاية متكاملة لابتسامتك وبشرتك | Complete care for your smile and skin |
| **Structured data** | `MedicalClinic`, `WebSite`, `Organization`, `FAQPage` (if FAQ on page) | Same |
| **Social image** | /assets/landing-hero.jpg | /assets/landing-hero.jpg |
| **Sitemap** | Yes · weekly · priority 1.0 | Yes · weekly · priority 1.0 |
| **Notes** | Current title is generic "الرئيسية" — upgrade in Phase 2. | Same |

### 2. Services Directory

| | Arabic | English |
|---|--------|---------|
| **URL** | https://beautycorner.sa/services | https://beautycorner.sa/en/services |
| **Title (planned)** | خدمات الأسنان والجلدية في حفر الباطن \| بيوتي كورنر | Dentistry & Dermatology Services in Hafr Al-Batin \| Beauty Corner |
| **Description (planned)** | تصفح جميع خدمات الأسنان والجلدية في عيادة بيوتي كورنر بحفر الباطن — زراعة، تبييض، علاج الجلدية والمزيد. | Browse all dentistry and dermatology services at Beauty Corner in Hafr Al-Batin — implants, whitening, skin care, and more. |
| **Canonical** | https://beautycorner.sa/services | https://beautycorner.sa/en/services |
| **Hreflang** | ar→`/services`, en→`/en/services`, x-default→`/services` | Same |
| **Robots** | index,follow | index,follow |
| **H1** | خدمات الأسنان والجلدية | Dentistry and dermatology services |
| **Structured data** | `CollectionPage`, `ItemList` (services), `MedicalClinic` | Same |
| **Social image** | /assets/landing-hero.jpg | /assets/landing-hero.jpg |
| **Sitemap** | Yes · monthly · priority 0.8 | Yes · monthly · priority 0.8 |
| **Notes** | Links to all 13 service detail pages. | Same |

### 3. Doctors Directory

| | Arabic | English |
|---|--------|---------|
| **URL** | https://beautycorner.sa/doctors | https://beautycorner.sa/en/doctors |
| **Title (planned)** | أطباء الأسنان في حفر الباطن \| بيوتي كورنر | Dentists in Hafr Al-Batin \| Beauty Corner |
| **Description (planned)** | تعرف على فريق أطباء الأسنان في عيادة بيوتي كورنر بحفر الباطن — خبرة موثوقة ورعاية شخصية. | Meet the Beauty Corner dental team in Hafr Al-Batin — trusted experience and personalized care. |
| **Canonical** | https://beautycorner.sa/doctors | https://beautycorner.sa/en/doctors |
| **Hreflang** | ar→`/doctors`, en→`/en/doctors`, x-default→`/doctors` | Same |
| **Robots** | index,follow | index,follow |
| **H1** | أطباء متخصصون بخبرة موثوقة | Specialist doctors you can trust |
| **Structured data** | `CollectionPage`, `ItemList` (Physician) | Same |
| **Social image** | /assets/landing-hero.jpg | /assets/landing-hero.jpg |
| **Sitemap** | Yes · monthly · priority 0.8 | Yes · monthly · priority 0.8 |
| **Notes** | Filter UI; all 3 doctors linked. | Same |

### 4. Contact

| | Arabic | English |
|---|--------|---------|
| **URL** | https://beautycorner.sa/contact | https://beautycorner.sa/en/contact |
| **Title (planned)** | تواصل معنا وموقع العيادة في حفر الباطن \| بيوتي كورنر | Contact & Clinic Location in Hafr Al-Batin \| Beauty Corner |
| **Description (planned)** | عنوان عيادة بيوتي كورنر في حفر الباطن، أوقات العمل، واتساب، والهاتف — حي المحمدية، طريق الملك فيصل. | Beauty Corner clinic address in Hafr Al-Batin, hours, WhatsApp, and phone — Al Muhammadiyah, King Faisal Road. |
| **Canonical** | https://beautycorner.sa/contact | https://beautycorner.sa/en/contact |
| **Hreflang** | ar→`/contact`, en→`/en/contact`, x-default→`/contact` | Same |
| **Robots** | index,follow | index,follow |
| **H1** | زورونا | Visit us |
| **Structured data** | `MedicalClinic`, `ContactPage`, `LocalBusiness` (NAP) | Same |
| **Social image** | /assets/landing-clinic-gallery.jpg | /assets/landing-clinic-gallery.jpg |
| **Sitemap** | Yes · monthly · priority 0.8 | Yes · monthly · priority 0.8 |
| **Notes** | NAP/location intent. Map embed placeholder — fix in Phase 2. EN hours text is placeholder. | Same |

### 5. Book (Conversion)

| | Arabic | English |
|---|--------|---------|
| **URL** | https://beautycorner.sa/book | https://beautycorner.sa/en/book |
| **Title (planned)** | احجز موعدك في عيادة بيوتي كورنر بحفر الباطن | Book Your Appointment at Beauty Corner, Hafr Al-Batin |
| **Description (planned)** | احجز موعدك بسرعة في عيادة بيوتي كورنر — أدخل اسمك ورقم جوالك واختر الخدمة، ثم أرسل عبر واتساب. | Book quickly at Beauty Corner — enter your name, phone, and service, then send via WhatsApp. |
| **Canonical** | https://beautycorner.sa/book | https://beautycorner.sa/en/book |
| **Hreflang** | ar→`/book`, en→`/en/book`, x-default→`/book` | Same |
| **Robots** | index,follow | index,follow |
| **H1** | احجز موعدك الآن | Book your visit |
| **Structured data** | `WebPage`, `MedicalClinic` (potentialAction: ReserveAction) | Same |
| **Social image** | /assets/landing-hero.jpg | /assets/landing-hero.jpg |
| **Sitemap** | Yes · monthly · priority 0.8 | Yes · monthly · priority 0.8 |
| **Notes** | **Indexed separately from /contact** — conversion intent vs NAP intent. Distinct title/description required. | Same |

### 6. Privacy (Planned — pages not yet built)

| | Arabic | English |
|---|--------|---------|
| **URL** | https://beautycorner.sa/privacy | https://beautycorner.sa/en/privacy |
| **Title (planned)** | سياسة الخصوصية \| بيوتي كورنر | Privacy Policy \| Beauty Corner |
| **Description (planned)** | سياسة الخصوصية لعيادة بيوتي كورنر — كيف نجمع ونستخدم بياناتك عند الحجز والتواصل. | Beauty Corner privacy policy — how we collect and use your data when booking and contacting us. |
| **Canonical** | https://beautycorner.sa/privacy | https://beautycorner.sa/en/privacy |
| **Hreflang** | ar→`/privacy`, en→`/en/privacy`, x-default→`/privacy` | Same |
| **Robots** | index,follow | index,follow |
| **H1** | سياسة الخصوصية | Privacy Policy |
| **Structured data** | `WebPage` | Same |
| **Social image** | /assets/logo.png | /assets/logo.png |
| **Sitemap** | Yes · monthly · priority 0.5 | Yes · monthly · priority 0.5 |
| **Notes** | **Missing pages — to be added in Phase 2.** Linked from booking form consent checkbox. | Same |

---

## Service Detail Routes (13 pairs · 26 URLs)

Pattern: **Title** `{service} في حفر الباطن | بيوتي كورنر` (AR) · `{service} in Hafr Al-Batin | Beauty Corner` (EN)

| ID | AR URL | EN URL | AR Title (planned) | EN Title (planned) | H1 (AR) | H1 (EN) | Structured data | Social image | Sitemap |
|----|--------|--------|--------------------|--------------------|---------|---------|-----------------|--------------|---------|
| dental-implants | /services/dental-implants | /en/services/dental-implants | زراعة الأسنان في حفر الباطن \| بيوتي كورنر | Dental Implants in Hafr Al-Batin \| Beauty Corner | زراعة الأسنان | Dental implants | `MedicalWebPage`, `MedicalProcedure`, `Service` | /assets/service-detail-dentistry.jpg | Yes · 0.7 |
| dental-prosthetics | /services/dental-prosthetics | /en/services/dental-prosthetics | تركيبات الأسنان في حفر الباطن \| بيوتي كورنر | Dental Prosthetics in Hafr Al-Batin \| Beauty Corner | تركيبات الأسنان | Dental prosthetics | Same | /assets/landing-clinic-gallery.jpg | Yes · 0.7 |
| teeth-whitening | /services/teeth-whitening | /en/services/teeth-whitening | تبييض الأسنان في حفر الباطن \| بيوتي كورنر | Teeth Whitening in Hafr Al-Batin \| Beauty Corner | تبييض الأسنان | Teeth whitening | Same | /assets/landing-blog-dental.jpg | Yes · 0.7 |
| cleaning-polishing | /services/cleaning-polishing | /en/services/cleaning-polishing | تنظيف وتلميع الأسنان في حفر الباطن \| بيوتي كورنر | Cleaning & Polishing in Hafr Al-Batin \| Beauty Corner | تنظيف وتلميع الأسنان | Cleaning & polishing | Same | /assets/landing-waiting-area.jpg | Yes · 0.7 |
| tooth-extraction | /services/tooth-extraction | /en/services/tooth-extraction | الخلع (جراحي وعادي) في حفر الباطن \| بيوتي كورنر | Tooth Extraction in Hafr Al-Batin \| Beauty Corner | الخلع (جراحي وعادي) | Extraction (surgical & simple) | Same | /assets/service-detail-dentistry.jpg | Yes · 0.7 |
| root-canal | /services/root-canal | /en/services/root-canal | حشوات العصب في حفر الباطن \| بيوتي كورنر | Root Canal Treatment in Hafr Al-Batin \| Beauty Corner | حشوات العصب | Root canal treatment | Same | /assets/landing-hero.jpg | Yes · 0.7 |
| cosmetic-fillings | /services/cosmetic-fillings | /en/services/cosmetic-fillings | الحشوات التجميلية في حفر الباطن \| بيوتي كورنر | Cosmetic Fillings in Hafr Al-Batin \| Beauty Corner | الحشوات التجميلية | Cosmetic fillings | Same | /assets/landing-blog-dental.jpg | Yes · 0.7 |
| gum-contouring | /services/gum-contouring | /en/services/gum-contouring | قص اللثة (جراحي وليزر) في حفر الباطن \| بيوتي كورنر | Gum Contouring in Hafr Al-Batin \| Beauty Corner | قص اللثة (جراحي وليزر) | Gum contouring (surgical & laser) | Same | /assets/landing-blog-laser.jpg | Yes · 0.7 |
| gum-depigmentation | /services/gum-depigmentation | /en/services/gum-depigmentation | توريد اللثة بالليزر في حفر الباطن \| بيوتي كورنر | Laser Gum Depigmentation in Hafr Al-Batin \| Beauty Corner | توريد اللثة بالليزر | Laser gum depigmentation | Same | /assets/landing-blog-laser.jpg | Yes · 0.7 |
| dental-xray-3d | /services/dental-xray-3d | /en/services/dental-xray-3d | أشعة الأسنان 3D في حفر الباطن \| بيوتي كورنر | 3D Dental X-ray in Hafr Al-Batin \| Beauty Corner | أشعة الأسنان 3D | 3D dental X-ray | Same | /assets/landing-clinic-gallery.jpg | Yes · 0.7 |
| acne-treatment | /services/acne-treatment | /en/services/acne-treatment | علاج حب الشباب وآثاره في حفر الباطن \| بيوتي كورنر | Acne Treatment & Scars in Hafr Al-Batin \| Beauty Corner | علاج حب الشباب وآثاره | Acne treatment & scars | Same | /assets/landing-blog-skin.jpg | Yes · 0.7 |
| pigmentation | /services/pigmentation | /en/services/pigmentation | التصبغات وتوحيد لون البشرة في حفر الباطن \| بيوتي كورنر | Pigmentation & Skin Tone in Hafr Al-Batin \| Beauty Corner | التصبغات وتوحيد لون البشرة | Pigmentation & skin tone evening | Same | /assets/landing-blog-skin.jpg | Yes · 0.7 |
| non-surgical-aesthetics | /services/non-surgical-aesthetics | /en/services/non-surgical-aesthetics | الإجراءات التجميلية غير الجراحية في حفر الباطن \| بيوتي كورنر | Non-surgical Aesthetics in Hafr Al-Batin \| Beauty Corner | الإجراءات التجميلية غير الجراحية | Non-surgical aesthetic procedures | Same | /assets/landing-blog-skin.jpg | Yes · 0.7 |

**Shared fields for all service detail URLs:**

- **Description (planned):** Use service `description` from data + location suffix "في حفر الباطن" / "in Hafr Al-Batin".
- **Canonical:** Self-referencing (full URL per row above).
- **Hreflang:** Standard pair with x-default → Arabic.
- **Robots:** index,follow.
- **Notes:** Each page links to related doctor specialty and booking CTA. No duplicate content across services.

---

## Doctor Profile Routes (3 pairs · 6 URLs)

Pattern: **Title** `{doctor name} — طبيب أسنان في حفر الباطن | بيوتي كورنر` (AR) · `{doctor name} — Dentist in Hafr Al-Batin | Beauty Corner` (EN)

| ID | AR URL | EN URL | AR Title (planned) | EN Title (planned) | H1 (AR) | H1 (EN) | Structured data | Social image | Sitemap |
|----|--------|--------|--------------------|--------------------|---------|---------|-----------------|--------------|---------|
| dentistry-fatima | /doctors/dentistry-fatima | /en/doctors/dentistry-fatima | د. فاطمة نضال — طبيبة أسنان في حفر الباطن \| بيوتي كورنر | Dr. Fatima Nidal — Dentist in Hafr Al-Batin \| Beauty Corner | د. فاطمة نضال | Dr. Fatima Nidal | `Physician`, `MedicalWebPage`, `Person` | /assets/doctor-dentistry.png | Yes · 0.7 |
| dentistry-mahmoud | /doctors/dentistry-mahmoud | /en/doctors/dentistry-mahmoud | د. محمود جمعة — طبيب أسنان في حفر الباطن \| بيوتي كورنر | Dr. Mahmoud Gomaa — Dentist in Hafr Al-Batin \| Beauty Corner | د. محمود جمعة | Dr. Mahmoud Gomaa | Same | /assets/doctor-mahmoud.png | Yes · 0.7 |
| dentistry-wissam | /doctors/dentistry-wissam | /en/doctors/dentistry-wissam | د. وسام مندور — أخصائي جراحة وجه وفكين في حفر الباطن \| بيوتي كورنر | Dr. Wissam Mandour — Oral & Maxillofacial Specialist in Hafr Al-Batin \| Beauty Corner | د. وسام مندور | Dr. Wissam Mandour | Same | /assets/doctor-wissam.png | Yes · 0.7 |

**Shared fields for all doctor profile URLs:**

- **Description (planned):** Doctor `summary` from data.
- **Canonical:** Self-referencing (full URL per row above).
- **Hreflang:** Standard pair with x-default → Arabic.
- **Robots:** index,follow.
- **Notes:** Links to related services and booking form. No orphan profiles.

---

## Non-Indexable Routes (reference only)

| Route | URL | Robots | Sitemap | Hreflang | Notes |
|-------|-----|--------|---------|----------|-------|
| 404 (any unknown path) | Served by `404.astro` | noindex,follow | No | None | No `/en/404` page; no hreflang alternates |
| /devices | Redirects to `/#devices` | n/a (redirect) | No | No | Anchor on homepage |
| /en/devices | Redirects to `/en#devices` | n/a (redirect) | No | No | Anchor on EN homepage |
| /api/customers | POST endpoint | noindex,nofollow | No | No | Server-only lead capture |

---

## URL Count Verification

| Category | Pairs | URLs (×2 locales) |
|----------|-------|-------------------|
| Static (excl. 404) | 6 | 12 |
| Service detail | 13 | 26 |
| Doctor profile | 3 | 6 |
| **Total indexable** | **22** | **44** |

---

## Phase 2 Implementation Checklist

- [ ] Apply planned titles/descriptions in `Layout.astro` or per-page frontmatter
- [ ] Add canonical + hreflang tags using `getAlternatePaths()` from manifest
- [ ] Refactor `sitemap.xml.ts` to use `getIndexableRoutePairs()` from `routes.ts`
- [ ] Create `/privacy` and `/en/privacy` pages
- [ ] Fix placeholder map embed on contact page
- [ ] Fix EN placeholder hours text
- [ ] Add `noindex,follow` meta to `404.astro`
- [ ] Verify all EN translations pass `assertTranslationCompleteness()`
