"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  icon: Icon,
  className,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const listId = useId();

  const selected = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("relative min-w-0 flex-1", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex h-9 w-full items-center gap-2 rounded-[var(--radius-md)]",
          "border border-[var(--border)] bg-[var(--bg-surface)] px-3",
          "text-left text-[0.8125rem] font-medium tracking-tight text-[var(--text-primary)]",
          "shadow-[var(--shadow-xs)]",
          "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--accent-ring)] focus-visible:ring-offset-1 focus-visible:outline-none",
          open && "border-[var(--accent)] ring-2 ring-[var(--accent-ring)]"
        )}
      >
        {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]" />}
        <span className="truncate">{selected?.label || label}</span>
        <ChevronDownIcon
          className={cn(
            "ml-auto h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]",
            "transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className={cn(
            "absolute left-0 right-0 z-30 mt-1.5 max-h-52 overflow-auto",
            "rounded-[var(--radius-lg)] border border-[var(--border)]",
            "bg-[var(--bg-elevated)] py-1 shadow-[var(--shadow-float)]",
            "animate-scale-in origin-top"
          )}
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={option.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center px-3 py-2 text-left text-[0.8125rem]",
                  "transition-colors duration-150",
                  option.value === value
                    ? "bg-[var(--accent-soft)] font-medium text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
