"use client";

import Image from "next/image";
import { memo, useState } from "react";
import { AlertIcon, EmptyCanvasIcon } from "@/components/icons/Icons";
import { CONTENT_TYPES } from "@/lib/constants";
import { buildImageUrl, cn } from "@/lib/utils";
import styles from "./ResultsGrid.module.css";

function GridSkeleton({ count = 8 }) {
  return (
    <div className={styles.grid} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton aspect-square rounded-[var(--radius-lg)]" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[16rem] flex-col items-center justify-center rounded-[var(--radius-xl)] border border-dashed border-[var(--border-strong)] bg-[var(--bg-muted)] px-6 py-10 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
        <EmptyCanvasIcon className="h-8 w-8" />
      </div>
      <p className="text-sm font-medium text-[var(--text-primary)]">No generations yet</p>
      <p className="mt-1 max-w-sm text-sm text-[var(--text-muted)]">
        Enter a prompt and click Generate to see your AI creations here.
      </p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="flex min-h-[16rem] flex-col items-center justify-center rounded-[var(--radius-xl)] border border-red-200 bg-red-50 px-6 py-10 text-center dark:border-red-900/40 dark:bg-red-950/20"
    >
      <AlertIcon className="mb-2 text-red-500" />
      <p className="text-sm font-medium text-red-700 dark:text-red-300">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 text-sm font-medium text-[var(--accent)] underline underline-offset-2"
        >
          Try again
        </button>
      )}
    </div>
  );
}

function MediaItem({ item, index }) {
  const fallbackSrc = buildImageUrl(`portrait-fallback-${index}`, 480, 480);
  const [src, setSrc] = useState(item.src);

  if (item.type === CONTENT_TYPES.VIDEO) {
    return (
      <div className={cn(styles.mediaCard, "relative aspect-video")}>
        <video
          src={item.src}
          poster={item.poster}
          controls
          preload="metadata"
          className="h-full w-full object-cover"
          aria-label={item.alt}
        />
        <span className="absolute bottom-2 left-2 rounded-[var(--radius-sm)] bg-black/55 px-2 py-0.5 text-[0.625rem] font-medium text-white">
          Video
        </span>
      </div>
    );
  }

  return (
    <div className={cn(styles.mediaCard, "relative aspect-square")}>
      <Image
        src={src}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover"
        onError={() => {
          if (src !== fallbackSrc) setSrc(fallbackSrc);
        }}
      />
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
      className={cn(styles.grid, contentType === CONTENT_TYPES.VIDEO && styles.gridVideo)}
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
