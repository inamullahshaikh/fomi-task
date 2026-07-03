import { getContentData } from "@/lib/mock/contentData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "image";
  const state = searchParams.get("state");

  if (state === "error") {
    return Response.json(
      { success: false, error: "Unable to load generated content" },
      { status: 500 }
    );
  }

  if (state === "loading") {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return Response.json({ success: true, data: { status: "loading" } });
  }

  if (state === "empty") {
    return Response.json({
      success: true,
      data: {
        type,
        prompt: "",
        model: null,
        items: [],
        total: 0,
        status: "empty",
      },
    });
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 600));

    return Response.json({
      success: true,
      data: {
        ...getContentData({ type }),
        status: "ready",
      },
    });
  } catch {
    return Response.json(
      { success: false, error: "Failed to load content" },
      { status: 500 }
    );
  }
}
