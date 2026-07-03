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
  { value: "fomi-v1", label: "Name" },
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
  "A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair, wearing a cream knit sweater, soft natural lighting, shallow depth of field, editorial quality.";

export const PROMPT_PLACEHOLDER =
  "Describe you imaginations to be converted to piece of art...";

export const API_DELAY_MS = 2200;

export const PORTRAIT_IMAGES = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=480&h=480&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=480&h=480&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=480&h=480&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=480&h=480&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=480&h=480&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=480&h=480&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=480&h=480&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=480&h=480&fit=crop&q=80&auto=format",
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
