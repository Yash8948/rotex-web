# Industry / Sector Pages — Backend API Structure

Same envelope, versioning, and `enabled`/`published` conventions as `api-structure.md`.

---

## How the pages work

Sub-sectors are **dedicated URL routes**, not client-side tabs:

| URL | Page |
|-----|------|
| `/industries/oil-gas` | Sector landing — hero, overview, stats, why choose, sub-sector nav links |
| `/industries/oil-gas/upstream` | Sub-sector page — same sector sections + upstream-specific content |
| `/industries/oil-gas/midstream` | Sub-sector page — same sector sections + midstream-specific content |

The "tab" list on the left is a set of `<Link>` elements that navigate between sub-sector URLs. Each sub-sector page is a full server-side render with its own API call.

---

## Sector Page

**Endpoint:** `GET /api/v1/industries/{sector-slug}`

Returns the full page — sector-level data + all sub-sector tab data in one response.

```json
{
  "success": true,
  "data": {
    "seo": {
      "title": "Oil & Gas Flow Control Solutions | Rotex",
      "description": "Flow intelligence that performs where pressure, precision, and uptime are non-negotiable.",
      "og_image": { "src": "https://cdn.rotex.com/og/industries/oil-gas.jpg" },
      "canonical": "https://www.rotex.com/industries/oil-gas"
    },

    "hero": {
      "name": "Oil & Gas",
      "description": "Flow intelligence that performs where pressure, precision, and uptime are non-negotiable. From upstream volatility to downstream complexity, Rotex enables control that adapts, responds, and delivers.",
      "bg_image": { "src": "https://cdn.rotex.com/industries/oil-gas-bg.jpg" }
    },

    "overview": {
      "section_title": "Redefining Flow Control in Oil & Gas",
      "overview": "Oil and gas operations run in some of the world's most demanding and safety-critical environments...",
      "stats": [
        { "id": "stat_001", "value": 23,  "suffix": "",  "label": "Refineries in India",  "format_comma": false },
        { "id": "stat_002", "value": 57,  "suffix": "+", "label": "Years of Reliability", "format_comma": false }
      ]
    },

    "why_choose": {
      "title": "Why Choose Rotex for",
      "highlight": "Oil & Gas",
      "cards": [
        {
          "id": "wc_001",
          "title": "Precision Under Pressure",
          "description": "Engineered for high-pressure, high-temperature applications where even the smallest deviation can have significant consequences."
        },
        {
          "id": "wc_002",
          "title": "Fail-Safe by Design",
          "description": "With advanced EHF actuator systems and intelligent control mechanisms, safety isn't an add-on. It's embedded into every operation."
        }
      ]
    },

    "sub_industries": [
      {
        "slug": "upstream",
        "published": true,
        "name": "Upstream",
        "description": "Upstream oil & gas operations take place in some of the harshest and most safety-critical environments, from onshore wellheads and gathering systems to offshore platforms.",
        "challenges": {
          "title": "Process Challenges in Upstream Operation",
          "items": [
            "Reliable performance in extreme temperatures, pressures, and hazardous atmospheres",
            "Accurate process control under variable well conditions",
            "Safe and dependable emergency shutdown (ESD) performance across remote and offshore locations",
            "Compliance with strict environmental and safety standards"
          ]
        },
        "solutions": {
          "title": "Rotex Solutions for Upstream Applications",
          "intro": "Rotex offers reliable process automation engineered for the harshest and most safety-critical operating environments, delivering:",
          "items": [
            "Rugged construction for harsh upstream environments",
            "Fast, reliable response for ESD and process safety duty",
            "Accurate, repeatable control across production and gathering systems",
            "Safety-certified components with complete documentation"
          ]
        },
        "recommended_products": [
          { "slug": "solenoid-valve",   "name": "Solenoid Valve" },
          { "slug": "angle-seat-valve", "name": "Angle Seat Valve" },
          { "slug": "actuators",        "name": "Actuators" },
          { "slug": "positioners",      "name": "Positioners" }
        ],
        "customer_stories": [
          {
            "id": "cs_001",
            "published": true,
            "media": { "type": "image", "src": "https://cdn.rotex.com/stories/upstream-1.jpg" },
            "quote": "Rotex solenoid valves have been instrumental in maintaining fail-safe shutdown integrity across our offshore wellheads. Zero unplanned trips in two years.",
            "author": "Rajesh Mehta",
            "company": "Plant Head, Aarti Industries Ltd."
          },
          {
            "id": "cs_002",
            "published": true,
            "media": { "type": "video", "src": "https://cdn.rotex.com/stories/upstream-2.mp4" },
            "quote": "The ESD actuator systems from Rotex gave us the confidence to extend our inspection intervals. Reliability has been outstanding in extreme conditions.",
            "author": "Sunil Varma",
            "company": "Operations Manager, ONGC"
          }
        ]
      },
      {
        "slug": "midstream",
        "published": true,
        "name": "Midstream",
        "description": "Midstream operations handle transportation, storage, and processing of oil, gas, and NGLs across thousands of kilometres of pipelines and compressor stations.",
        "challenges": {
          "title": "Process Challenges in Midstream Operation",
          "items": [
            "Managing high-pressure pipeline integrity over long distances",
            "Reliable compressor station valve control with minimal downtime"
          ]
        },
        "solutions": {
          "title": "Rotex Solutions for Midstream Applications",
          "intro": "Rotex delivers proven flow control solutions for the demanding midstream environment:",
          "items": [
            "High-pressure solenoid and actuated valves for pipeline control",
            "Remote-operable actuator systems for unmanned stations"
          ]
        },
        "recommended_products": [
          { "slug": "solenoid-valve", "name": "Solenoid Valve" },
          { "slug": "actuators",      "name": "Actuators" }
        ],
        "customer_stories": [
          {
            "id": "cs_003",
            "published": true,
            "media": { "type": "image", "src": "https://cdn.rotex.com/stories/midstream-1.jpg" },
            "quote": "Rotex's high-pressure actuated valves have held up flawlessly across 1,200 km of our gas pipeline network.",
            "author": "Deepak Sharma",
            "company": "Pipeline Integrity Manager, GAIL India"
          }
        ]
      },
      {
        "slug": "downstream",
        "published": true,
        "name": "Downstream",
        "description": "Downstream facilities — refineries, petrochemical plants, and distribution terminals — operate under strict process requirements.",
        "challenges": {
          "title": "Process Challenges in Downstream Operation",
          "items": [
            "High-cycle operation demands across refinery process units",
            "Handling aggressive and corrosive media at elevated temperatures"
          ]
        },
        "solutions": {
          "title": "Rotex Solutions for Downstream Applications",
          "intro": "Rotex provides precision-engineered flow control solutions purpose-built for downstream environments:",
          "items": [
            "High-cycle solenoid valves rated for continuous duty refinery service",
            "Corrosion-resistant materials and coatings for aggressive media"
          ]
        },
        "recommended_products": [
          { "slug": "solenoid-valve",   "name": "Solenoid Valve" },
          { "slug": "angle-seat-valve", "name": "Angle Seat Valve" },
          { "slug": "actuators",        "name": "Actuators" }
        ],
        "customer_stories": [
          {
            "id": "cs_004",
            "published": true,
            "media": { "type": "image", "src": "https://cdn.rotex.com/stories/downstream-1.jpg" },
            "quote": "Rotex high-cycle solenoid valves have run continuously in our refinery CDU for 18 months without a single failure.",
            "author": "Sanjay Kapoor",
            "company": "Plant Manager, Nayara Energy"
          }
        ]
      }
    ]
  },
  "meta": { "updated_at": "2026-06-28T10:00:00Z" }
}
```

### Sector-level Field Reference

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `seo.title` | `string` | Yes | Browser tab + OG title |
| `seo.description` | `string` | Yes | Meta + OG description |
| `seo.og_image.src` | `string` | Yes | OG share image |
| `seo.canonical` | `string` | Yes | Canonical URL |
| `hero.name` | `string` | Yes | Page heading — also used as `alt` for `bg_image` |
| `hero.description` | `string` | Yes | Hero subtitle |
| `hero.bg_image.src` | `string` | Yes | Full-bleed hero background image URL |

> **Hero CTAs are hardcoded on the frontend — not in the API.** "Talk to an Expert" scrolls to the enquiry form on the same page. "See Recommended Products" scrolls to the recommended products section. Neither is a navigation link, so neither needs to be managed from the CMS.
| `overview.section_title` | `string` | Yes | Section heading above the overview text |
| `overview.overview` | `string` | Yes | Long description — frontend shows 3 lines then "Read More" |
| `overview.stats` | `Stat[]` | Yes | Animated counters — see stat fields below |
| `overview.stats[].id` | `string` | Yes | Stable identifier |
| `overview.stats[].value` | `number` | Yes | Raw number, animated from 0 |
| `overview.stats[].suffix` | `string` | Yes | `""` or `"+"` |
| `overview.stats[].label` | `string` | Yes | Label below the number |
| `overview.stats[].format_comma` | `boolean` | Yes | `true` → 1000 renders as 1,000 |
| `why_choose.title` | `string` | Yes | Plain text prefix of the heading |
| `why_choose.highlight` | `string` | Yes | Orange gradient word in the heading |
| `why_choose.cards` | `Card[]` | Yes | Feature highlight cards |
| `why_choose.cards[].id` | `string` | Yes | Stable identifier |
| `why_choose.cards[].title` | `string` | Yes | Card heading |
| `why_choose.cards[].description` | `string` | Yes | Card body |
| `sub_industries` | `SubIndustry[]` | Yes | Ordered — first item is the default active tab |

### Sub-industry Field Reference (what changes per tab)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `slug` | `string` | Yes | Tab identifier — used in the sub-sector endpoint URL |
| `published` | `boolean` | Yes | `false` → tab hidden from the list |
| `name` | `string` | Yes | Tab label and sub-hero heading — also used as `alt` for the bg image |
| `description` | `string` | Yes | Sub-hero paragraph shown under the name |
| `challenges.title` | `string` | Yes | Section heading for challenges |
| `challenges.items` | `string[]` | Yes | Bullet list of challenge statements |
| `solutions.title` | `string` | Yes | Section heading for solutions |
| `solutions.intro` | `string` | Yes | Intro sentence before the solutions list |
| `solutions.items` | `string[]` | Yes | Bullet list of solution statements |
| `recommended_products` | `Product[]` | Yes | Products to show in the swiper |
| `recommended_products[].slug` | `string` | Yes | Frontend builds link as `/products/{slug}` |
| `recommended_products[].name` | `string` | Yes | Display name on the product card |
| `customer_stories` | `Story[]` | Yes | Testimonial cards below products |
| `customer_stories[].id` | `string` | Yes | Stable identifier |
| `customer_stories[].published` | `boolean` | Yes | `false` → story hidden |
| `customer_stories[].media.type` | `"image"` \| `"video"` | Yes | One or the other — never both |
| `customer_stories[].media.src` | `string` | Yes | Absolute URL |
| `customer_stories[].quote` | `string` | Yes | Testimonial text |
| `customer_stories[].author` | `string` | Yes | Author name — used as `alt` for image media |
| `customer_stories[].company` | `string` | Yes | Role and company combined |

---

## Sub-Sector Page

**Endpoint:** `GET /api/v1/industries/{sector-slug}/{sub-sector-slug}`

Returns the full sub-sector page — includes all sector-level data (so the page can SSR standalone) plus the specific sub-sector content. The sub-sector nav links are included so the frontend knows which sibling routes to render as navigation.

```json
{
  "success": true,
  "data": {
    "seo": {
      "title": "Upstream Oil & Gas Flow Control | Rotex",
      "description": "Reliable process automation for the harshest upstream environments.",
      "og_image": { "src": "https://cdn.rotex.com/og/industries/oil-gas-upstream.jpg" },
      "canonical": "https://www.rotex.com/industries/oil-gas/upstream"
    },

    "sector": {
      "slug": "oil-gas",
      "name": "Oil & Gas",
      "bg_image": { "src": "https://cdn.rotex.com/industries/oil-gas-bg.jpg" },
      "overview": {
        "section_title": "Redefining Flow Control in Oil & Gas",
        "overview": "Oil and gas operations run in some of the world's most demanding environments...",
        "stats": [
          { "id": "stat_001", "value": 23, "suffix": "",  "label": "Refineries in India",  "format_comma": false },
          { "id": "stat_002", "value": 57, "suffix": "+", "label": "Years of Reliability", "format_comma": false }
        ]
      },
      "why_choose": {
        "title": "Why Choose Rotex for",
        "highlight": "Oil & Gas",
        "cards": [
          { "id": "wc_001", "title": "Precision Under Pressure", "description": "Engineered for high-pressure, high-temperature applications." },
          { "id": "wc_002", "title": "Fail-Safe by Design",      "description": "Safety embedded into every operation via EHF actuator systems." }
        ]
      },
      "sub_industry_nav": [
        { "slug": "upstream",   "name": "Upstream",   "href": "/industries/oil-gas/upstream" },
        { "slug": "midstream",  "name": "Midstream",  "href": "/industries/oil-gas/midstream" },
        { "slug": "downstream", "name": "Downstream", "href": "/industries/oil-gas/downstream" }
      ]
    },

    "sub_industry": {
      "slug": "upstream",
      "published": true,
      "name": "Upstream",
      "description": "Upstream oil & gas operations take place in some of the harshest and most safety-critical environments, from onshore wellheads to offshore platforms.",
      "challenges": {
        "title": "Process Challenges in Upstream Operation",
        "items": [
          "Reliable performance in extreme temperatures, pressures, and hazardous atmospheres",
          "Accurate process control under variable well conditions"
        ]
      },
      "solutions": {
        "title": "Rotex Solutions for Upstream Applications",
        "intro": "Rotex offers reliable process automation engineered for the harshest operating environments, delivering:",
        "items": [
          "Rugged construction for harsh upstream environments",
          "Fast, reliable response for ESD and process safety duty"
        ]
      },
      "recommended_products": [
        { "slug": "solenoid-valve",   "name": "Solenoid Valve" },
        { "slug": "angle-seat-valve", "name": "Angle Seat Valve" }
      ],
      "customer_stories": [
        {
          "id": "cs_001",
          "published": true,
          "media": { "type": "image", "src": "https://cdn.rotex.com/stories/upstream-1.jpg" },
          "quote": "Zero unplanned trips in two years.",
          "author": "Rajesh Mehta",
          "company": "Plant Head, Aarti Industries Ltd."
        }
      ]
    }
  },
  "meta": { "updated_at": "2026-06-28T10:00:00Z" }
}
```

---

## Endpoint Summary

| Endpoint | Returns |
|----------|---------|
| `GET /api/v1/industries/{sector-slug}` | Sector landing — hero, overview, stats, why choose, sub-industry nav list |
| `GET /api/v1/industries/{sector-slug}/{sub-sector-slug}` | Full sub-sector page — all sector context + active sub-sector content |

---

## What each endpoint returns

| Data | Sector landing endpoint | Sub-sector endpoint |
|------|------------------------|---------------------|
| SEO meta | Sector-level | Sub-sector-level (own title/description/canonical) |
| Hero (name, bg image) | Yes | Yes — from `sector.name` + `sector.bg_image` |
| Overview + stats | Yes | Yes — from `sector.overview` |
| Why Choose cards | Yes | Yes — from `sector.why_choose` |
| Sub-industry nav links | Yes — all siblings | Yes — all siblings (to render the nav) |
| Sub-sector content (challenges, solutions, products, stories) | No | Yes — from `sub_industry` object |

> **Hero CTA buttons are hardcoded on the frontend — not in the API.** "Talk to an Expert" scrolls to the enquiry form on the page. "See Recommended Products" scrolls to the recommended products section. Both are scroll anchors, not navigation links.
