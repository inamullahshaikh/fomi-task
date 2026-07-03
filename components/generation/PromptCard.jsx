"use client";

import { memo } from "react";
import { MODELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function PromptCard({ prompt, model }) {
  const modelLabel = MODELS.find((item) => item.value === model)?.label || "Model";

  return (
    <aside
      aria-label="Current prompt"
      className={cn(
        "flex min-h-[12rem] animate-fade-in flex-col rounded-[var(--radius-xl)] p-4 sm:min-h-[16rem] sm:p-5",
        "border border-[var(--border-subtle)] bg-[var(--bg-prompt)]",
        "shadow-[var(--shadow-card)]",
        "lg:max-w-[11rem] xl:max-w-[12.5rem]"
      )}
    >
      <p className="flex-1 text-xs leading-[1.65] tracking-tight text-[var(--text-primary)] sm:text-[0.8125rem]">
        {prompt}
      </p>
      <div className="mt-5 flex justify-end">
        <span className="badge">{modelLabel}</span>
      </div>
    </aside>
  );
}

export default memo(PromptCard);
