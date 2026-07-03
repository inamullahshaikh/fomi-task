const BASE = "";

async function handleResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.error || data?.message || "Request failed";
    throw new Error(message);
  }

  return data;
}

export async function fetchHistory() {
  const response = await fetch(`${BASE}/api/history`, { cache: "no-store" });
  return handleResponse(response);
}

export async function fetchContent(type = "image", options = {}) {
  const params = new URLSearchParams({ type });

  if (options.state) {
    params.set("state", options.state);
  }

  const response = await fetch(`${BASE}/api/content?${params}`, {
    cache: "no-store",
  });

  return handleResponse(response);
}

export async function generateContent(payload) {
  const response = await fetch(`${BASE}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}
