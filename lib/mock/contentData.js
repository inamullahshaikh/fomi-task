import {
  CONTENT_TYPES,
  DEFAULT_PROMPT,
  PORTRAIT_SEEDS,
  VIDEO_SAMPLES,
} from "@/lib/constants";
import { buildImageUrl, getAspectDimensions } from "@/lib/utils";

function buildImageItem(seed, index, prompt, model, aspectRatio) {
  const { width, height } = getAspectDimensions(aspectRatio, 480);

  return {
    id: `img-${index + 1}`,
    type: CONTENT_TYPES.IMAGE,
    seed,
    src: buildImageUrl(seed, width, height),
    alt: `Generated image ${index + 1} for prompt: ${prompt.slice(0, 60)}`,
    width,
    height,
    prompt,
    model,
    aspectRatio,
  };
}

function buildVideoItem(sample, index, prompt, model) {
  return {
    id: sample.id || `vid-${index + 1}`,
    type: CONTENT_TYPES.VIDEO,
    src: sample.url,
    poster: sample.thumbnail,
    alt: sample.title,
    width: 640,
    height: 360,
    prompt,
    model,
    title: sample.title,
  };
}

export function getContentData({
  type = CONTENT_TYPES.IMAGE,
  prompt = DEFAULT_PROMPT,
  model = "fomi-v1",
  aspectRatio = "1:1",
  count,
} = {}) {
  if (type === CONTENT_TYPES.VIDEO) {
    const items = VIDEO_SAMPLES.slice(0, count || 4).map((sample, index) =>
      buildVideoItem(sample, index, prompt, model)
    );

    return {
      type: CONTENT_TYPES.VIDEO,
      prompt,
      model,
      items,
      total: items.length,
    };
  }

  const imageCount = count || PORTRAIT_SEEDS.length;
  const seeds = PORTRAIT_SEEDS.slice(0, imageCount);
  const items = seeds.map((seed, index) =>
    buildImageItem(seed, index, prompt, model, aspectRatio)
  );

  return {
    type: CONTENT_TYPES.IMAGE,
    prompt,
    model,
    aspectRatio,
    items,
    total: items.length,
  };
}
