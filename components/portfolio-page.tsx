import Image from "next/image";
import type { ReactNode } from "react";
import { SectionNav, type SectionNavItem } from "@/components/section-nav";
import { ANNOUNCE_MBA } from "@/components/mba-flag";

const sectionNavItems: SectionNavItem[] = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "mentoring", label: "Mentoring" },
  { id: "building", label: "Building" },
];

const images = {
  headshot: "/images/headshot.png",
  columbia: "/images/Columbia.png", // Columbia crown crest
  bcg: "/images/work_bcg.png",
  mit: "/images/MIT_logo.jpg",
  almaworks: "/images/projects_core.jpeg",
  spectator: "/images/projects_spec.png",
  uiDesign: "/images/ui_design.png",
  claude: "/images/projects_claude.png",
  beetcode: "/images/beetcode.png",
  dexter: "/images/Dexter.png",
  a2r: "/images/tinympc.jpg",
};

type JourneyNode = {
  period: string;
  school: string;
  role?: string;
  detail?: ReactNode;
  image?: string;
  initials?: string;
};

// Real MIT Sloan content, preserved verbatim for a one-line restore.
const mitSloanNode: JourneyNode = {
  period: "Next",
  school: "MIT Sloan",
  role: "MBA — Early AdMIT Program",
  detail: "",
  image: images.mit,
};

// Neutral stand-in shown while ANNOUNCE_MBA is false.
const mbaPlaceholderNode: JourneyNode = {
  period: "Next",
  school: "What's next",
  role: "Deferred MBA application updates coming soon.",
  detail: "",
  initials: "···",
};

// Academic + professional trajectory — emphasized before projects. Missing
// logos fall back to a letter-tile.
const journey: JourneyNode[] = [
  {
    period: "Undergraduate",
    school: "Columbia University",
    role: "B.S. Computer Science + Entrepreneurship",
    detail: (
      <>
        3.99 GPA, <em className="italic">cum laude</em>
      </>
    ),
    image: images.columbia,
  },
  {
    period: "Now",
    school: "BCG Boston",
    role: "Consultant - Technology & Digital",
    detail: "Advising enterprise clients on performance and automation.",
    image: images.bcg,
  },
  ANNOUNCE_MBA ? mitSloanNode : mbaPlaceholderNode,
];

type Entry = {
  title: string;
  role?: string;
  summary: string;
  link?: string;
  image?: string;
  initials?: string;
  tags?: string[];
  featured?: boolean;
};

// Mentoring & Leadership — first content pillar after the journey.
const mentoringEntries: Entry[] = [
  {
    title: "Almaworks Accelerator / CORE",
    role: "Director",
    summary:
      "Mentored 30+ early-stage Columbia founders - connecting them with the right alumni mentors and investors, and helping them sharpen their pitches across five Demo Days.",
    link: "https://entrepreneurship.columbia.edu/resource/almaworks/",
    image: images.almaworks,
    tags: ["Mentorship", "Entrepreneurship"],
  },
  {
    title: "Columbia Spectator",
    role: "Head of Product",
    summary:
      "Led a cross-functional product team across three of Spectator's digital products - CULPA, theSHAFT, and the mobile app - running user interviews, defining features, and shipping with engineering.",
    link: "https://culpa.info/#/",
    image: images.spectator,
    tags: ["Product", "Leadership"],
  },
  {
    title: "Columbia Engineering",
    role: "UI Design Teaching Assistant",
    summary:
      "Held weekly office hours, evaluated assignments, and answered questions on the discussion board to keep students moving through the UI design course.",
    image: images.uiDesign,
    tags: ["Teaching", "UI design"],
  },
  {
    title: "Claude (Anthropic)",
    role: "Builder Club Ambassador",
    summary:
      "Co-founded a hands-on LLM builder community with Anthropic and ran workshops on prompt design, evaluation, and model experimentation - teaching peers to build with AI.",
    link: "https://www.anthropic.com/",
    image: images.claude,
    tags: ["Education", "Community"],
  },
];

// Building & Research — second content pillar. Leads with Unscripted.
const buildingEntries: Entry[] = [
  {
    title: "Unscripted",
    role: "Founder",
    summary:
      "Building an AI writing tool that helps people express themselves genuinely - not in the polished, generic voice AI is trained to produce. Initially for college and MBA applicants.",
    initials: "Un",
    tags: ["AI", "Writing"],
    featured: true,
  },
  {
    title: "Dexter",
    role: "Builder",
    summary:
      "Built an AI redaction tool for consulting slide decks, saving ~125 hours per consultant annually. Piloted with BCG and OC&C, and refined across 15+ consultant interviews to fit real workflows.",
    image: images.dexter,
    tags: ["AI", "Consulting"],
  },
  {
    title: "Beetcode",
    role: "Co-Founder",
    summary:
      "Built and shipped a browser extension that gives LeetCode hints, reaching 200+ users organically.",
    link: "https://beetcodeai.com/",
    image: images.beetcode,
    tags: ["Browser extension", "LeetCode"],
  },
  {
    title: "A2R Lab",
    role: "Research",
    summary:
      "Worked on Crazyflie drone firmware in C/C++, optimized tinyMPC for model predictive control, and integrated the system with Crazyswarm2 on ROS 2.",
    link: "https://github.com/paeb37/a2r-crazyflie-firmware",
    image: images.a2r,
    tags: ["Robotics", "C/C++"],
  },
];

export function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-[300px_1fr] lg:items-start lg:gap-14">
          {/* Identity + nav — short, sticky, pinned to the top area. */}
          <aside className="lg:sticky lg:top-12 lg:self-start">
            <div className="space-y-6">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border bg-surface">
                <Image
                  src={images.headshot}
                  alt="Brandon Pae headshot"
                  fill
                  priority
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
                  Brandon Pae
                </h1>
                <p className="max-w-xs text-sm leading-6 text-muted">
                  Working at the intersection of technology, business, and
                  people.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Builder", "Consultant", "Mentor"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <dl className="grid gap-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between gap-4 border-b border-border/70 pb-2">
                  <dt className="text-muted">Location</dt>
                  <dd className="text-right text-foreground">Boston, MA</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Email</dt>
                  <dd className="text-right">
                    <a
                      href="mailto:pae.brandon@columbia.edu"
                      className="text-accent transition-colors hover:text-accent-strong"
                    >
                      pae.brandon@columbia.edu
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/files/Brandon_T_Pae_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-md border border-accent/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent/10"
                >
                  Resume
                </a>
                <a
                  href="https://linkedin.com/in/brandon-pae"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:border-accent/50 hover:text-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                  </svg>
                  LinkedIn
                </a>
              </div>

              <div className="hidden space-y-3 lg:block">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                  Navigation
                </p>
                <SectionNav items={sectionNavItems} />
              </div>
            </div>
          </aside>

          {/* Long-form content. */}
          <div className="mt-12 space-y-16 lg:mt-0 lg:space-y-20">
            <section id="about" data-section-id className="scroll-mt-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent">
                About
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground">
                Computer Science and Entrepreneurship at Columbia University,
                graduated <em className="italic">cum laude</em> with a 3.99 GPA. I built my technical foundation
                through software engineering internships and AI & robotics research
                - today I work as a consultant at Boston Consulting Group, on the
                technology and digital track.

                <br />
                <br />

                What I care about most is building at the intersection of artificial
                intelligence and human expression - most recently through{" "}
                <span className="text-accent">Unscripted</span>. Outside of work, I
                coach MBA and college applicants through Leland and Crimson
                Education, and mentor founders and student teams.
              </p>
            </section>

            <section id="journey" data-section-id className="scroll-mt-12 space-y-6">
              <SectionHeader
                kicker="01"
                title="Journey"
                description="Columbia, BCG, and deferred MBA"
              />

              <div className="relative space-y-7 sm:space-y-8">
                <span
                  aria-hidden
                  className="absolute left-6 top-3 bottom-3 w-px bg-border sm:left-7"
                />
                {journey.map((node) => (
                  <div
                    key={node.school}
                    className="relative grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-[3.5rem_1fr] sm:gap-5"
                  >
                    <div className="relative z-10 h-12 w-12 overflow-hidden rounded-full border border-border bg-surface sm:h-14 sm:w-14">
                      <NodeLogo
                        image={node.image}
                        initials={node.initials}
                        alt={node.school}
                      />
                    </div>
                    <div className="pt-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                        {node.period}
                      </p>
                      <h3 className="font-serif text-xl font-semibold tracking-tight text-foreground">
                        {node.school}
                      </h3>
                      {node.role ? (
                        <p className="text-sm font-medium text-accent">
                          {node.role}
                        </p>
                      ) : null}
                      {node.detail ? (
                        <p className="text-sm text-muted">{node.detail}</p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="mentoring" data-section-id className="scroll-mt-12 space-y-6">
              <SectionHeader
                kicker="02"
                title="Mentoring & Leadership"
                description="Founders, product teams, and students - mostly through teaching and coaching."
              />
              <div className="grid gap-5 sm:grid-cols-2">
                {mentoringEntries.map((entry) => (
                  <ProjectCard key={entry.title} entry={entry} />
                ))}
              </div>
            </section>

            <section id="building" data-section-id className="scroll-mt-12 space-y-6">
              <SectionHeader
                kicker="03"
                title="Building & Research"
                description="Products and technical work at the intersection of AI and human expression."
              />
              <div className="grid gap-5 sm:grid-cols-2">
                {buildingEntries.map((entry) => (
                  <ProjectCard key={entry.title} entry={entry} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProjectCard({ entry }: { entry: Entry }) {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-lg border bg-surface shadow-sm transition-shadow hover:shadow-md ${
        entry.featured ? "border-accent/40" : "border-border"
      }`}
    >
      <div className="relative h-40 border-b border-border bg-background">
        <EntryMedia
          image={entry.image}
          initials={entry.initials}
          alt={entry.title}
          sizes="(min-width: 640px) 40vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        {entry.role ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
            {entry.role}
          </p>
        ) : null}
        <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground">
          {entry.link ? (
            <a
              href={entry.link}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              {entry.title}
            </a>
          ) : (
            entry.title
          )}
        </h3>
        <p className="text-sm leading-6 text-muted">{entry.summary}</p>
        {entry.tags ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function EntryMedia({
  image,
  initials,
  alt,
  sizes,
  priority,
}: {
  image?: string;
  initials?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-accent/8 font-serif text-3xl font-semibold text-accent">
      {initials}
    </div>
  );
}

function NodeLogo({
  image,
  initials,
  alt,
}: {
  image?: string;
  initials?: string;
  alt: string;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        sizes="56px"
        className="object-contain p-1.5"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-accent/8 font-mono text-sm font-semibold text-accent">
      {initials}
    </div>
  );
}

function SectionHeader({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <header className="space-y-2 border-b border-border pb-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-accent">
        {kicker}
      </p>
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="max-w-md text-sm leading-6 text-muted">{description}</p>
      </div>
    </header>
  );
}
