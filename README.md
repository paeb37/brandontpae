# brandontpae.com — Rebuild Spec

Personal site rebuild for Brandon Pae. This README is the single source of truth for content and
design direction — read this before writing any page code. Content/framing comes from the
`new_format.md` brief; design comes from the split-panel reference. Where this file and any older
notes (DETAILS.md, prior drafts) disagree, **this file wins.**

## Current state (handoff — read first)

The site is **built and working**, but **not committed and not deployed**. Status as of this handoff:

- **Done:** Full site in `components/portfolio-page.tsx` (content data + layout) and
  `components/section-nav.tsx` (client-side `IntersectionObserver` nav). Lint clean, `npm run build`
  clean, renders correctly.
- **Brand/layout (current):** Light **"Warm Ivory & Terracotta"** theme (warm ivory background, warm
  ink text, terracotta accent) defined as semantic tokens in `app/globals.css`. **Fraunces** serif for
  the name + section headings, Geist for body/mono. Layout is a normal full-page scroll with a short,
  **sticky** identity+nav block in the top-left (no longer a full-height split panel).
- **Sections (current order):** About (bio) → Journey (Horace Mann → Columbia → BCG → MIT Sloan
  trajectory) → Building & Projects → Leadership & Mentorship → Research. SWE internships
  (FluidityIQ, Capco) are folded into the bio rather than given an equal-weight Work section. Cut
  items (Arrow, Artaic, Covid, AgBotics, Secra, Cypol, hackathons/honors) are gone.
- **Images:** downscaled to ≤1200px and unused cut-section images deleted (`public/images/` ~3.3 MB).
- **Git:** everything is uncommitted on top of the initial `create-next-app` commit. Branch before
  committing; don't commit straight onto the initial state.

### ⚠️ Dev-server gotcha (caused a real bug — don't repeat)
Running **more than one `next dev` at a time** in this repo causes the browser to get stuck in an
endless reload loop, which *also* makes images appear not to load (the page resets before the
`next/image` response paints). The images and code are fine — the optimizer returns HTTP 200. Always
run **exactly one** dev server. To clear stragglers (`pkill` is unreliable here):

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN      # find the PID holding :3000
kill -9 <pid>                          # then start one clean `npm run dev`
```

### TODO before deploy
- **Replace letter-tile placeholders with real logos** (currently rendered as letter tiles, flagged in
  code): Unscripted, Leland/Crimson, MIT Sloan, Horace Mann.
- **Unscripted link/CTA** — the card currently has no outbound link (no live URL confirmed yet). Add
  the URL + CTA once the site is live.
- **Confirm remaining content** (decided with Brandon, but worth a final check):
  - Location → "Boston, MA"
  - Email → `pae.brandon@columbia.edu` (confirm this address is active)
  - Columbia GPA → 3.99 shown as a small detail under the Columbia node in Journey
  - Horace Mann → name-only node (no "top NYC high school" label, by design)

## Goal & narrative arc

The site should **read like a person, not a resume** — polished, approachable, and premium, technically
strong without feeling like a portfolio built only for SWE recruiting. One legible throughline ties
everything together:

> strong technical foundation → elite academic trajectory → consulting & leadership → building products & mentoring

The intended impression for a visitor: a strong technical foundation, an elite academic background, a
consulting and leadership trajectory, and a genuine passion for building products and developing other
people. Themes to surface:
1. **Trajectory** — Horace Mann → Columbia → BCG Boston → MIT Sloan, led *before* projects.
2. **Builder at the intersection of AI and human expression** — most recently Unscripted.
3. **Mentorship & leadership as a consistent thread** — coaching founders, students, and applicants.

SWE roles establish technical credibility via the bio (not equal-weight rows); let projects show the
work. When deciding whether to feature/cut something, ask: does it advance that arc? If it's just an
isolated accomplishment, cut or de-emphasize it.

## Project status

- Scaffolded with `npx create-next-app@latest` (Next.js 16, App Router, TypeScript, Tailwind,
  Turbopack, `@/*` alias) — do not hand-roll the shell from scratch.
- **Environment**: Node 24 LTS via fnm, pinned in `.node-version` (fnm auto-switches on `cd`). Do
  NOT use Node 25+ — it hung Turbopack builds for minutes. A clean build should finish in ~15s.
- Deploy target: Vercel (new project). Domain `brandontpae.com` currently points to a Netlify-hosted
  static site (`personal-website` repo, Bootstrap-based) — DNS cutover happens only after this
  project is verified on a Vercel preview URL. Do not touch DNS until told to.
- All images must use `next/image`, not `<img>`. The old site's slow image loading was caused by
  serving raw unoptimized PNG/JPG with no resizing/compression — `next/image` (resize, WebP/AVIF,
  lazy load, CDN cache) fixes this directly.

## Tone & voice

- First-person where natural. Lead with **what he built and why**, not skills lists.
- **Remove the "Skills learned" labels** from the old site — they read like a student template.
- Keep copy human and specific; avoid generic AI-hero phrasing.

## Design system

Light, warm, editorial — premium and approachable, not "hardcore SWE." A single accent color,
restrained styling, generous whitespace.

- **Layout**: normal full-page scroll inside a centered `max-w-6xl` container. Desktop is a two-column
  grid (`lg:grid-cols-[300px_1fr]`); the left column is a **short, sticky** identity+nav block pinned
  to the top area (`lg:sticky lg:top-12 lg:self-start`) — deliberately *not* a full-height sidebar, so
  the lower-left is breathing room. Mobile collapses to a single stacked column (identity first).
- **Color** (semantic tokens in `app/globals.css`, "Warm Ivory & Terracotta"): `--background` warm
  ivory `#FAF7F2`, `--surface` white cards, `--foreground` warm ink `#211C17`, `--muted` taupe
  `#8A7F72`, `--border` warm hairline `#E7DFD4`, `--accent` terracotta `#C2663B` (+ `--accent-strong`
  for hover). One accent only; no gradients/glow. Reference via utilities (`text-accent`, `bg-surface`,
  `border-border`, `text-muted`).
- **Typography**: **Fraunces** serif (display: name + section headings + project titles) + **Geist
  Sans** (body) + **Geist Mono** (kicker labels), all via `next/font/google`. Hierarchy from
  size/weight/color and the serif/sans contrast.
- **Sidebar**: round headshot, serif name, one-line positioning tagline + `Consultant · Builder ·
  Mentor` chips, location/email, terracotta-bordered Résumé CTA, small GH/IN actions, then nav.
- **Nav**: vertical list of bordered buttons (desktop), active item = terracotta border + faint
  terracotta wash. `IntersectionObserver` rooted on the **viewport** (page scrolls as one) highlights
  the current section.
- **Journey timeline**: vertical rail with circular logo/letter-tile nodes; period (mono caps), serif
  school name, accent role line, muted detail.
- **Project / leadership cards**: white surface, light border, rounded corners, subtle shadow,
  screenshot or letter-tile, serif title link, short description, tag chips. Featured (Unscripted) gets
  an accent border. Research is a compact row list, low emphasis.
- **Motion**: hover transitions and smooth scroll only. No entrance animations, no parallax.
- **Anti-goals**: no multi-color palette, no decorative framing, no AI-generic hero sections, no heavy
  gradients/shadows, no pedigree/brag tone. Calm, editorial, intentional — not "overdesigned."

## Content

> **Note:** the section *grouping/order* below predates the current rebuild. The live structure is
> **About → Journey → Building & Projects → Leadership & Mentorship → Research** (see "Current state"
> above), with SWE roles folded into the bio rather than a standalone Work section. The copy and
> per-item framing below still apply; treat `components/portfolio-page.tsx` as the source for ordering.

### Section 1 — Hero / Sidebar identity

**Hero copy** (BCG status confirmed: already working there as of June 2026 — present tense, no
"incoming", no "August 2025"):

> I'm Brandon — a CS and Entrepreneurship grad from Columbia, now a consultant at BCG Boston, and
> admitted to MIT Sloan's MBA Early AdMIT program. I build at the intersection of AI and human
> expression — most recently Unscripted, a tool that helps people write in their genuine voice.

- Contact email: btp2109@columbia.edu (**verify still active** — alumni address; swap if needed).
- Keep GitHub (github.com/paeb37) and LinkedIn (linkedin.com/in/brandon-pae) links. Resume PDF CTA.
- Keep the existing headshot.

### Section 2 — Projects & Building (feature prominently — this carries the arc)

Order matters: lead with Unscripted, then Beetcode (best shipping proof), then the rest.

1. **Unscripted — Founder** *(new, top of section)*
   "Building an AI writing tool that helps people express themselves genuinely — not in the polished,
   generic voice AI is trained to produce. Initially targeting college and MBA applicants. Try it at
   unscriptedai.com or book a free 15-min session." *(confirm final URL / CTA link.)*

2. **Beetcode — Co-Founder** *(promote higher — 200+ users is the strongest shipping proof)*
   Browser extension giving LeetCode hints. Optional add: "Built and shipped independently; reached
   200+ users organically." [beetcodeai.com](https://beetcodeai.com/)

3. **Claude (Anthropic) — Builder Club Ambassador**
   Co-founded a hands-on LLM builder community with Anthropic; organized workshops on prompt design,
   evaluation, and model experimentation. Add: "Recognized as a Claude Builder Club Ambassador by
   Anthropic."

4. **Almaworks Accelerator / CORE — Director** *(mentorship reframe)*
   "Mentored 30+ early-stage Columbia founders through the Almaworks Accelerator — connecting them
   with the right alumni mentors and investors, and helping them sharpen their pitches across five
   Demo Days." Link: https://entrepreneurship.columbia.edu/resource/almaworks/

5. **Columbia Spectator — Head of Product** *(mentorship/leadership reframe)*
   "Led a cross-functional product team across three of Spectator's digital products — CULPA
   (https://culpa.info/#/), theSHAFT (https://theshaft.info/), and the mobile app — running user
   interviews, defining features, and coordinating with engineering to ship."

6. **Columbia Robotics — Software Member** *(low priority — keep only if space allows, else cut)*
   Pacbot team: tuned A* pathfinding, implemented Q-learning for navigation.

### Section 3 — Work Experience

1. **BCG — Consultant, BCG Boston (digital track)**
   "Advised a large industrial goods client on financial performance tracking, building automated
   models and presenting quantified results to BCG and client leadership." *(Present tense — already
   full-time. Drop the old "Summer Associate" framing and the August 2025 date.)*

2. **FluidityIQ — SWE Intern**
   Evaluated vectorizers for patent claims, built the patent dataset, enabled multi-user chat API
   support, shipped to production (6x latency cut); prototyped an AI agent with Milvus/Haystack.

3. **Capco — SWE Intern**
   Debugged entitlement/data-access APIs for a U.S. bank; fixed permission bugs, automated test-data
   creation in Python; presented to 30+ executives.

4. **Leland / Crimson Education — MBA & College Admissions Coach** *(new entry)*
   "Coaching students on MBA and college applications, with a focus on helping applicants find and
   express their genuine voice — the insight that led to building Unscripted." *(Reinforces both the
   mentorship theme and the Unscripted origin story — place it so that link is legible.)*

### Section 4 — Research (compact list)

- **SDF for CoT** — fine-tuned/evaluated two 8B-param LLMs on 20k synthetic docs, measured 0%→5%
  increase in unfaithful chain-of-thought via evidence-citation tasks.
  [Paper](https://docs.google.com/document/d/1iBeRhAuN98ljZeEMX26CymIUXfl6VP6YDb7nzirIupM/edit?tab=t.0)
- **A2R Lab** — Crazyflie drone firmware (C/C++), optimized
  [tinyMPC](https://github.com/paeb37/a2r-crazyflie-firmware) for model predictive control, integrated
  with Crazyswarm2 (ROS 2).
- **Crackd AI — API Pod** — scalable schema for dorm/university data beyond Columbia; Supabase,
  PostgreSQL, TypeScript; eval tests for LLM humor/cultural-context understanding.

### Cut entirely (do NOT port over)

Per the new_format.md brief — these dilute the arc:
- **Arrow Electronics** (too early, off-narrative)
- **Artaic** (too early, off-narrative)
- **Ideanomics** social media internship
- **The old "Other Work" page** — fold anything worth keeping into Projects; don't recreate the page.
- All **high-school / pre-college** content: Covid-19 SIR, AgBotics, Cypol, Secra, FTC Robotics,
  Science Olympiad, ISEF, HackMann, InspireNC, DevFest/YHacks hackathons, Columbia Engineering UI TA
  *(note: the UI Design TA was college, but the brief de-emphasizes the resume-y teaching bullet in
  favor of the stronger Almaworks/Spectator/Leland mentorship stories — keep only if you want a pure
  teaching credential).*

> If unsure whether a borderline item (e.g. UI Design TA) belongs, leave it out of the first build
> and add back deliberately — the brief's whole thrust is *less content, sharper narrative.*

## Assets

Images to port from the old site (`../personal-website/assets/images/`) — re-export/compress before
use with `next/image`, don't copy raw files as-is. Only port what survives the cut above:
`headshot.jpg`, `work_bcg.png`, `fiq.png`, `projects_capco.jpg`, `projects_claude.png`,
`beetcode.png`, `projects_core.jpeg` (Almaworks), `projects_spec.png`, `research_sdf.png`,
`ui_design.png` (A2R), `research_crackd.png`, `Brandon_T_Pae_Resume.pdf`. **Need new assets** for
Unscripted and Leland/Crimson (logos/screenshots) — flag if missing.

## Getting Started (dev)

```bash
cd ~/Desktop/brandontpae   # fnm auto-switches to Node 24 via .node-version
npm run dev
```

Open http://localhost:3000. Edit `app/page.tsx` — auto-reloads via Turbopack.

## Deploy

Push to a GitHub repo, import into a new Vercel project via the **dashboard** (no CLI needed), verify
on the generated preview URL, then point `brandontpae.com` DNS at Vercel (apex domain — A/ALIAS
record) once verified. Keep the Netlify site live until cutover is confirmed working.
