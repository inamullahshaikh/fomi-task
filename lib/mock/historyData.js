import { PORTRAIT_IMAGES } from "@/lib/constants";
import { buildImageUrl } from "@/lib/utils";

const HISTORY_COUNT = 16;

function buildHistoryItem(src, index) {
  return {
    id: `history-${index + 1}`,
    src,
    alt: `Previous generation ${index + 1}`,
    createdAt: new Date(Date.now() - index * 3600000).toISOString(),
  };
}

export function getHistoryData() {
  const items = Array.from({ length: HISTORY_COUNT }, (_, index) => {
    const portrait = PORTRAIT_IMAGES[index % PORTRAIT_IMAGES.length];
    const src =
      index < PORTRAIT_IMAGES.length
        ? portrait.replace("w=480", "w=160").replace("h=480", "h=160")
        : buildImageUrl(`hist-${index + 1}`, 160, 160);

    return buildHistoryItem(src, index);
  });

  return {
    items,
    total: items.length,
  };
}
