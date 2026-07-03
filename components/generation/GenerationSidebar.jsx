"use client";

import { memo } from "react";
import {
  ASPECT_RATIOS,
  CONTENT_TYPES,
  IMAGE_COUNTS,
  MODELS,
  PROMPT_PLACEHOLDER,
} from "@/lib/constants";
import {
  AspectRatioIcon,
  HashIcon,
  StarIcon,
} from "@/components/icons/Icons";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import TextArea from "@/components/ui/TextArea";
import Toggle from "@/components/ui/Toggle";
import { cn } from "@/lib/utils";

function GenerationSidebar({
  contentType,
  onContentTypeChange,
  prompt,
  onPromptChange,
  imageCount,
  onImageCountChange,
  aspectRatio,
  onAspectRatioChange,
  model,
  onModelChange,
  onGenerate,
  isGenerating,
  error,
}) {
  const imageCountOptions = IMAGE_COUNTS.map((count) => ({
    value: String(count),
    label: count === 8 ? "# Images" : `${count} Image${count > 1 ? "s" : ""}`,
  }));

  const aspectOptions = ASPECT_RATIOS.map((ratio) => ({
    value: ratio.value,
    label: ratio.label,
  }));

  const modelOptions = MODELS.map((item) => ({
    value: item.value,
    label: `Model: ${item.label}`,
  }));

  return (
    <aside
      aria-label="Generation controls"
      className={cn(
        "rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--bg-panel)] p-4 sm:p-5",
        "shadow-[var(--shadow-sm)]"
      )}
    >
      <Toggle
        label="Content type"
        value={contentType}
        onChange={onContentTypeChange}
        options={[
          { value: CONTENT_TYPES.IMAGE, label: "Image" },
          { value: CONTENT_TYPES.VIDEO, label: "Video" },
        ]}
      />

      <div className="mt-4">
        <TextArea
          id="generation-prompt"
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          placeholder={PROMPT_PLACEHOLDER}
          rows={5}
          error={error && !prompt.trim() ? error : undefined}
          aria-label="Generation prompt"
          className="min-h-[7.5rem] bg-[var(--bg-surface)]"
        />
      </div>

      <Button
        className="mt-4 w-full"
        size="lg"
        onClick={onGenerate}
        isLoading={isGenerating}
        leftIcon={!isGenerating ? <StarIcon className="h-4 w-4" /> : null}
        aria-label="Generate content"
      >
        Generate
      </Button>

      {error && prompt.trim() && (
        <p className="mt-2 text-xs font-medium text-red-500" role="alert">
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {contentType === CONTENT_TYPES.IMAGE && (
          <Dropdown
            label="Number of images"
            value={String(imageCount)}
            onChange={(value) => onImageCountChange(Number(value))}
            options={imageCountOptions}
            icon={HashIcon}
            className="min-w-[6.5rem] flex-none"
          />
        )}
        <Dropdown
          label="Aspect ratio"
          value={aspectRatio}
          onChange={onAspectRatioChange}
          options={aspectOptions}
          icon={AspectRatioIcon}
          className="min-w-[4.5rem] flex-none"
        />
        <Dropdown
          label="Model"
          value={model}
          onChange={onModelChange}
          options={modelOptions}
          className="min-w-[7.5rem] flex-1"
        />
      </div>

      <div className="mt-4 space-y-2">
        <Accordion title="Advance">
          <p className="mb-2">
            Fine-tune seed, guidance scale, and negative prompts for more control over output.
          </p>
          <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed">
            <li>Guidance scale: 7.5</li>
            <li>Steps: 30</li>
            <li>Seed: Random</li>
          </ul>
        </Accordion>
        <Accordion title="Styles">
          <p className="leading-relaxed">
            Choose from cinematic, editorial, anime, or photoreal presets to influence the visual tone.
          </p>
        </Accordion>
      </div>
    </aside>
  );
}

export default memo(GenerationSidebar);
