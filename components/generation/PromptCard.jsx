"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

function PromptCard({ prompt }) {
  return (
    <aside
      aria-label="Current prompt"
      className={cn(
        "hidden shrink-0 flex-col rounded-[var(--radius-xl)] p-4 lg:flex lg:w-[10.5rem] xl:w-[11.5rem]",
        "border border-[var(--border)] bg-[var(--bg-prompt)]",
        "shadow-[var(--shadow-sm)]"
      )}
    >
      <p className="flex-1 text-[0.6875rem] leading-[1.7] text-[var(--text-primary)] xl:text-xs">
        {prompt}
      </p>
      <div className="mt-4 flex justify-end">
        <span className="rounded-[var(--radius-md)] bg-[var(--bg-surface)] px-2.5 py-1 text-[0.625rem] font-medium text-[var(--text-secondary)] shadow-[var(--shadow-xs)]">
          Model
        </span>
      </div>
    </aside>
  );
}

export default memo(PromptCard);
