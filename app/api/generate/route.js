import { API_DELAY_MS, CONTENT_TYPES, IMAGE_COUNTS } from "@/lib/constants";
import { getContentData } from "@/lib/mock/contentData";
import { delay } from "@/lib/utils";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      prompt,
      type = CONTENT_TYPES.IMAGE,
      imageCount = 8,
      aspectRatio = "1:1",
      model = "fomi-v1",
      simulate,
    } = body;

    if (!prompt?.trim()) {
      return Response.json(
        { success: false, error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (simulate === "error") {
      await delay(800);
      return Response.json(
        { success: false, error: "Generation failed. Please try again." },
        { status: 500 }
      );
    }

    await delay(API_DELAY_MS);

    const safeCount = IMAGE_COUNTS.includes(imageCount)
      ? imageCount
      : type === CONTENT_TYPES.VIDEO
        ? 4
        : 8;

    const data = getContentData({
      type,
      prompt: prompt.trim(),
      model,
      aspectRatio,
      count: safeCount,
    });

    return Response.json({
      success: true,
      data: {
        ...data,
        status: "ready",
        generatedAt: new Date().toISOString(),
      },
    });
  } catch {
    return Response.json(
      { success: false, error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
