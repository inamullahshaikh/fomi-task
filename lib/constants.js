export const CONTENT_TYPES = {
  IMAGE: "image",
  VIDEO: "video",
};

export const ASPECT_RATIOS = [
  { value: "1:1", label: "1:1", width: 1, height: 1 },
  { value: "4:3", label: "4:3", width: 4, height: 3 },
  { value: "3:4", label: "3:4", width: 3, height: 4 },
  { value: "16:9", label: "16:9", width: 16, height: 9 },
];

export const IMAGE_COUNTS = [1, 2, 4, 8];

export const MODELS = [
  { value: "fomi-v1", label: "Fomi V1" },
  { value: "fomi-v2", label: "Fomi V2 Pro" },
  { value: "fomi-realistic", label: "Fomi Realistic" },
];

export const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/" },
  { id: "gallery", label: "Gallery", href: "#gallery" },
  { id: "video", label: "Video", href: "#video" },
  { id: "edit", label: "Edit", href: "#edit" },
  { id: "folder", label: "Folder", href: "#folder" },
];

export const DEFAULT_PROMPT =
  "A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes, soft natural lighting, shallow depth of field, editorial quality.";

export const PROMPT_PLACEHOLDER =
  "Describe you imaginations to be converted to piece of art...";

export const API_DELAY_MS = 2200;

export const PORTRAIT_SEEDS = [
  "portrait-1",
  "portrait-2",
  "portrait-3",
  "portrait-4",
  "portrait-5",
  "portrait-6",
  "portrait-7",
  "portrait-8",
];

export const HISTORY_SEEDS = [
  "hist-1",
  "hist-2",
  "hist-3",
  "hist-4",
  "hist-5",
  "hist-6",
  "hist-7",
  "hist-8",
  "hist-9",
  "hist-10",
  "hist-11",
  "hist-12",
];

export const VIDEO_SAMPLES = [
  {
    id: "vid-1",
    title: "Cinematic landscape",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "https://picsum.photos/seed/video-1/640/360",
  },
  {
    id: "vid-2",
    title: "Urban motion",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail: "https://picsum.photos/seed/video-2/640/360",
  },
  {
    id: "vid-3",
    title: "Nature timelapse",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail: "https://picsum.photos/seed/video-3/640/360",
  },
  {
    id: "vid-4",
    title: "Abstract flow",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnail: "https://picsum.photos/seed/video-4/640/360",
  },
];
