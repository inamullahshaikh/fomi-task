"use client";

import { useCallback, useState } from "react";
import {
  CONTENT_TYPES,
  DEFAULT_PROMPT,
} from "@/lib/constants";
import { useContent } from "@/hooks/useContent";
import { useGenerate } from "@/hooks/useGenerate";
import GenerationSidebar from "@/components/generation/GenerationSidebar";
import PromptCard from "@/components/generation/PromptCard";
import ResultsGrid from "@/components/generation/ResultsGrid";

export default function GenerationWorkspace() {
  const [contentType, setContentType] = useState(CONTENT_TYPES.IMAGE);
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [imageCount, setImageCount] = useState(8);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [model, setModel] = useState("fomi-v1");

  const {
    items,
    prompt: displayedPrompt,
    model: displayedModel,
    loading: contentLoading,
    error: contentError,
    reload,
    setData,
  } = useContent(contentType);

  const { generate, loading: generating, error: generateError, clearError } =
    useGenerate();

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;

    clearError();

    const result = await generate({
      prompt,
      type: contentType,
      imageCount: contentType === CONTENT_TYPES.IMAGE ? imageCount : 4,
      aspectRatio,
      model,
    });

    if (result) {
      setData(result);
    }
  }, [
    prompt,
    contentType,
    imageCount,
    aspectRatio,
    model,
    generate,
    clearError,
    setData,
  ]);

  const handleContentTypeChange = useCallback(
    (nextType) => {
      setContentType(nextType);
      clearError();
    },
    [clearError]
  );

  const isLoading = contentLoading || generating;
  const activeError = generateError || contentError;
  const showPrompt = displayedPrompt || prompt;
  const showModel = displayedModel || model;

  return (
    <section aria-label="Generation workspace" className="animate-fade-in">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(18rem,22rem)_1fr] lg:gap-7 xl:gap-8 2xl:gap-10">
        <GenerationSidebar
          contentType={contentType}
          onContentTypeChange={handleContentTypeChange}
          prompt={prompt}
          onPromptChange={setPrompt}
          imageCount={imageCount}
          onImageCountChange={setImageCount}
          aspectRatio={aspectRatio}
          onAspectRatioChange={setAspectRatio}
          model={model}
          onModelChange={setModel}
          onGenerate={handleGenerate}
          isGenerating={generating}
          error={activeError}
        />

        <div className="min-w-0">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-5 xl:gap-6">
            {showPrompt && !contentLoading && items.length > 0 && (
              <PromptCard prompt={showPrompt} model={showModel} />
            )}

            <div className="min-w-0 flex-1">
              <ResultsGrid
                items={items}
                loading={isLoading}
                error={!generating ? contentError : null}
                contentType={contentType}
                onRetry={generating ? undefined : reload}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
