"use client";

import Image from "next/image";
import { memo } from "react";
import { AlertIcon, EmptyCanvasIcon } from "@/components/icons/Icons";
import { CONTENT_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import styles from "./ResultsGrid.module.css";

function GridSkeleton({ count = 8 }) {
  return (
    <div className={styles.grid} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "skeleton aspect-square rounded-[var(--radius-lg)]",
            `stagger-${Math.min(index + 1, 8)}`
          )}
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className={cn(styles.emptyState, "animate-fade-in")}>
      <div className={styles.emptyIconWrap}>
        <EmptyCanvasIcon />
      </div>
      <p className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
        No generations yet
      </p>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">
        Enter a prompt and click Generate to see your AI creations here.
      </p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div role="alert" className={cn(styles.errorState, "animate-fade-in")}>
      <div className={styles.errorIconWrap}>
        <AlertIcon className="text-red-500" />
      </div>
      <p className="text-sm font-semibold tracking-tight text-red-700 dark:text-red-300">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className={cn(
            "mt-4 rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium",
            "text-[var(--accent)] transition-opacity duration-200 hover:opacity-80"
          )}
        >
          Try again
        </button>
      )}
    </div>
  );
}

function MediaItem({ item, index }) {
  if (item.type === CONTENT_TYPES.VIDEO) {
    return (
      <div
        className={cn(
          styles.mediaCard,
          "group relative aspect-video",
          "animate-fade-in",
          `stagger-${Math.min(index + 1, 8)}`
        )}
      >
        <video
          src={item.src}
          poster={item.poster}
          controls
          preload="metadata"
          className="h-full w-full object-cover"
          aria-label={item.alt}
        />
        <span className={styles.videoBadge}>Video</span>
        <div className={styles.mediaOverlay} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        styles.mediaCard,
        "group relative aspect-square",
        "animate-fade-in",
        `stagger-${Math.min(index + 1, 8)}`
      )}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
      />
      <div className={styles.mediaOverlay} aria-hidden="true" />
    </div>
  );
}

function ResultsGrid({ items, loading, error, contentType, onRetry }) {
  if (loading) {
    return <GridSkeleton count={contentType === CONTENT_TYPES.VIDEO ? 4 : 8} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!items.length) {
    return <EmptyState />;
  }

  return (
    <div
      className={cn(
        styles.grid,
        contentType === CONTENT_TYPES.VIDEO && styles.gridVideo
      )}
      role="list"
      aria-label="Generated content"
    >
      {items.map((item, index) => (
        <div key={item.id} role="listitem">
          <MediaItem item={item} index={index} />
        </div>
      ))}
    </div>
  );
}

export default memo(ResultsGrid);
