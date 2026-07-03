"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchContent } from "@/lib/api";
import { CONTENT_TYPES } from "@/lib/constants";

export function useContent(type = CONTENT_TYPES.IMAGE) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadContent = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchContent(type);
      setData(response.data);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return {
    data,
    items: data?.items || [],
    prompt: data?.prompt || "",
    model: data?.model || "",
    loading,
    error,
    reload: loadContent,
    setData,
  };
}
