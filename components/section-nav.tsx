"use client";

import { useEffect, useState } from "react";

export type SectionNavItem = {
  id: string;
  label: string;
};

type SectionNavProps = {
  items: SectionNavItem[];
};

export function SectionNav({ items }: SectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    // The page scrolls as one document, so observe against the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) => right.intersectionRatio - left.intersectionRatio,
          );

        if (visibleEntries[0]?.target instanceof HTMLElement) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        threshold: [0, 0.25, 0.5, 1],
        // Thin activation band near the top of the viewport.
        rootMargin: "-15% 0px -75% 0px",
      },
    );

    const sections = document.querySelectorAll<HTMLElement>("[data-section-id]");

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const target = document.getElementById(id);

    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label="Section navigation" className="space-y-2">
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item.id)}
            aria-current={isActive ? "true" : undefined}
            className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors duration-200 ${
              isActive
                ? "border-accent/70 bg-accent/10 text-accent"
                : "border-border text-muted hover:border-accent/50 hover:bg-accent/5 hover:text-foreground"
            }`}
          >
            <span>{item.label}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-current/70">
              {String(item.id).slice(0, 2)}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
