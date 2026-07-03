"use client";

import HistoryBar from "@/components/history/HistoryBar";
import GenerationWorkspace from "@/components/generation/GenerationWorkspace";
import { useHistory } from "@/hooks/useHistory";

export default function GenerationPage() {
  const { items, loading, error, reload } = useHistory();

  return (
    <>
      <HistoryBar
        items={items}
        loading={loading}
        error={error}
        onRetry={reload}
      />
      <GenerationWorkspace />
    </>
  );
}
