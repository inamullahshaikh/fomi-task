import { HISTORY_SEEDS } from "@/lib/constants";
import { buildImageUrl } from "@/lib/utils";

function buildHistoryItem(seed, index) {
  return {
    id: `history-${index + 1}`,
    seed,
    src: buildImageUrl(seed, 160, 160),
    alt: `Previous generation ${index + 1}`,
    createdAt: new Date(Date.now() - index * 3600000).toISOString(),
  };
}

export function getHistoryData() {
  return {
    items: HISTORY_SEEDS.map(buildHistoryItem),
    total: HISTORY_SEEDS.length,
  };
}
