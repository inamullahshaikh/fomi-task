"use client";

import { useCallback, useState } from "react";
import { generateContent } from "@/lib/api";

export function useGenerate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await generateContent(payload);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { generate, loading, error, clearError };
}
