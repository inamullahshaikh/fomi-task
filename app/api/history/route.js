import { getHistoryData } from "@/lib/mock/historyData";

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 400));

    return Response.json({
      success: true,
      data: getHistoryData(),
    });
  } catch {
    return Response.json(
      { success: false, error: "Failed to load history" },
      { status: 500 }
    );
  }
}
