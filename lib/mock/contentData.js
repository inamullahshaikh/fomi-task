import {
  CONTENT_TYPES,
  DEFAULT_PROMPT,
  PORTRAIT_IMAGES,
  VIDEO_SAMPLES,
} from "@/lib/constants";
import { getAspectDimensions } from "@/lib/utils";

function buildImageItem(src, index, prompt, model, aspectRatio) {
  const { width, height } = getAspectDimensions(aspectRatio, 480);

  return {
    id: `img-${index + 1}`,
    type: CONTENT_TYPES.IMAGE,
    src,
    alt: `Generated portrait ${index + 1}`,
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

  const imageCount = count || PORTRAIT_IMAGES.length;
  const images = PORTRAIT_IMAGES.slice(0, imageCount);
  const items = images.map((src, index) =>
    buildImageItem(src, index, prompt, model, aspectRatio)
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
