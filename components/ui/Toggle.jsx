"use client";

import { cn } from "@/lib/utils";

export default function Toggle({ options, value, onChange, label }) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "grid grid-cols-2 gap-1 rounded-[var(--radius-lg)] p-1",
        "border border-[var(--border-subtle)] bg-[var(--bg-surface)]",
        "shadow-[var(--shadow-xs)]"
      )}
    >
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "h-9 rounded-[var(--radius-md)] text-sm font-medium tracking-tight",
              "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-1",
              active
                ? "bg-[var(--accent)] text-[var(--text-inverse)] shadow-[var(--shadow-sm)]"
                : "text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
