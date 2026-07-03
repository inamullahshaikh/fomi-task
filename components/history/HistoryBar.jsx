"use client";

import Image from "next/image";
import { memo } from "react";
import { HistoryEmptyIcon } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";
import styles from "./HistoryBar.module.css";

function HistorySkeleton() {
  return (
    <div className="flex gap-2.5 sm:gap-3" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            styles.thumbnail,
            "skeleton shrink-0 rounded-[var(--radius-lg)]",
            `stagger-${index + 1}`
          )}
        />
      ))}
    </div>
  );
}

function HistoryBar({ items, loading, error, onRetry }) {
  return (
    <section aria-labelledby="history-heading" className="mb-7 sm:mb-9">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 id="history-heading" className="text-display">
            History
          </h2>
          <button
            type="button"
            className={cn(
              "mt-1 text-xs font-medium text-[var(--text-muted)]",
              "transition-colors duration-200 hover:text-[var(--accent)]"
            )}
          >
            View All
          </button>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className={cn(
            "mb-4 rounded-[var(--radius-lg)] border px-4 py-3 text-sm",
            "border-red-200/80 bg-red-50/80 text-red-700",
            "dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-300"
          )}
        >
          {error}
          <button
            type="button"
            onClick={onRetry}
            className="ml-2 font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            Retry
          </button>
        </div>
      )}

      <div className={cn(styles.scrollContainer, "scrollbar-thin")}>
        {loading ? (
          <HistorySkeleton />
        ) : items.length === 0 ? (
          <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--bg-muted)]/50 px-5 py-6">
            <HistoryEmptyIcon className="shrink-0 text-[var(--text-muted)]" />
            <p className="text-sm text-[var(--text-muted)]">
              No generation history yet. Your recent creations will appear here.
            </p>
          </div>
        ) : (
          <ul className="flex gap-2.5 sm:gap-3">
            {items.map((item, index) => (
              <li
                key={item.id}
                className={cn("animate-fade-in shrink-0", `stagger-${Math.min(index + 1, 8)}`)}
              >
                <button
                  type="button"
                  className={cn(styles.thumbnail, styles.thumbnailButton)}
                  aria-label={item.alt}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={80}
                    height={80}
                    className="h-[4.5rem] w-[4.5rem] object-cover sm:h-20 sm:w-20"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="section-divider mt-7 sm:mt-9" aria-hidden="true" />
    </section>
  );
}

export default memo(HistoryBar);
