"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { HistoryEmptyIcon } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";
import styles from "./HistoryBar.module.css";

function HistorySkeleton() {
  return (
    <div className={styles.historyCard} aria-hidden="true">
      <div className={styles.historyLabel}>
        <div className="skeleton h-4 w-14 rounded" />
        <div className="skeleton mt-1 h-3 w-10 rounded" />
      </div>
      <div className={styles.divider} />
      <div className={styles.scrollViewport}>
        <div className={styles.scrollContainer}>
          <ul className={styles.thumbnailRow}>
            {Array.from({ length: 12 }).map((_, index) => (
              <li key={index} className={cn(styles.thumbnail, "skeleton rounded-xl")} />
            ))}
          </ul>
        </div>
        <div className={styles.fadeEdge} />
      </div>
    </div>
  );
}

function HistoryBar({ items, loading, error, onRetry }) {
  const scrollRef = useRef(null);
  const [showFade, setShowFade] = useState(true);

  const updateFade = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const canScroll = el.scrollWidth > el.clientWidth + 2;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setShowFade(canScroll && !atEnd);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    updateFade();

    const resizeObserver = new ResizeObserver(updateFade);
    resizeObserver.observe(el);

    el.addEventListener("scroll", updateFade, { passive: true });
    window.addEventListener("resize", updateFade);

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, [items, updateFade]);

  const handleWheel = useCallback((event) => {
    const el = scrollRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const nextScroll = el.scrollLeft + event.deltaY;
    const canScrollRight = event.deltaY > 0 && el.scrollLeft < maxScroll - 1;
    const canScrollLeft = event.deltaY < 0 && el.scrollLeft > 0;

    if (!canScrollRight && !canScrollLeft) return;

    event.preventDefault();
    el.scrollLeft = Math.max(0, Math.min(maxScroll, nextScroll));
  }, []);

  return (
    <section aria-labelledby="history-heading" className={cn(styles.historySection, "mb-5 lg:mb-6")}>
      {error && (
        <div
          role="alert"
          className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
          <button type="button" onClick={onRetry} className="ml-2 font-medium underline">
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <HistorySkeleton />
      ) : items.length === 0 ? (
        <div className={styles.historyCard}>
          <HistoryEmptyIcon className="mr-3 h-8 w-8 text-[var(--text-muted)]" />
          <p className="text-sm text-[var(--text-muted)]">No generation history yet.</p>
        </div>
      ) : (
        <div className={styles.historyCard}>
          <div className={styles.historyLabel}>
            <h2 id="history-heading" className={styles.historyTitle}>
              History
            </h2>
            <button type="button" className={styles.viewAll}>
              View All
            </button>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.scrollViewport}>
            <div
              ref={scrollRef}
              className={styles.scrollContainer}
              onWheel={handleWheel}
              role="region"
              aria-label="Generation history thumbnails"
              tabIndex={0}
            >
              <ul className={styles.thumbnailRow}>
                {items.map((item) => (
                  <li key={item.id} className={styles.thumbnail}>
                    <button
                      type="button"
                      className={styles.thumbnailButton}
                      aria-label={item.alt}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={82}
                        height={82}
                        className={styles.thumbnailImage}
                        draggable={false}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={cn(styles.fadeEdge, !showFade && styles.fadeEdgeHidden)}
              aria-hidden="true"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default memo(HistoryBar);
