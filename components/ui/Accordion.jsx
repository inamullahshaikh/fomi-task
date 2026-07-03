"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";

export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)]",
        "border border-[var(--border-subtle)] bg-[var(--bg-surface)]",
        "shadow-[var(--shadow-xs)]",
        "transition-shadow duration-200",
        open && "shadow-[var(--shadow-sm)]"
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between px-4 py-3",
          "text-sm font-medium tracking-tight text-[var(--text-primary)]",
          "transition-colors duration-200",
          "hover:bg-[var(--bg-hover)]",
          "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent-ring)]"
        )}
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 text-[var(--text-muted)]",
            "transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden" aria-hidden={!open}>
          <div className="border-t border-[var(--border-subtle)] px-4 py-3.5 text-[0.8125rem] leading-relaxed text-[var(--text-secondary)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
