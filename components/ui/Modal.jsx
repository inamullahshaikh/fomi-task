"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import IconButton from "@/components/ui/IconButton";

export default function Modal({ open, onClose, title, children, className }) {
  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 animate-fade-in bg-black/45 backdrop-blur-[4px]"
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
        className={cn(
          "relative z-10 w-full max-w-lg animate-scale-in",
          "rounded-[var(--radius-2xl)] border border-[var(--border-subtle)]",
          "bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-lg)]",
          className
        )}
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2
            id="modal-title"
            className="text-lg font-semibold tracking-tight text-[var(--text-primary)]"
          >
            {title}
          </h2>
          <IconButton label="Close dialog" size="sm" onClick={onClose}>
            <span aria-hidden="true" className="text-xl leading-none text-[var(--text-muted)]">
              ×
            </span>
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
}
