export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function buildImageUrl(seed, width = 512, height = 512) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getAspectDimensions(ratio, baseSize = 512) {
  const [w, h] = ratio.split(":").map(Number);
  if (!w || !h) return { width: baseSize, height: baseSize };

  if (w >= h) {
    return { width: baseSize, height: Math.round((baseSize * h) / w) };
  }

  return { width: Math.round((baseSize * w) / h), height: baseSize };
}

export function truncateText(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}
