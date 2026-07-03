"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchHistory } from "@/lib/api";

export function useHistory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchHistory();
      setItems(response.data?.items || []);
    } catch (err) {
      setError(err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return { items, loading, error, reload: loadHistory };
}
