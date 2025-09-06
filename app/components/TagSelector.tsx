"use client";

import { memo, useCallback } from "react";

const TAGS = ["React", "Next.js", "nuqs", "TypeScript", "Tailwind"];

type Props = {
  value: string[];
  onChange: (fn: (prev: string[]) => string[]) => void;
};

const TagSelector = memo(({ value, onChange }: Props) => {
  const handleChange = useCallback(
    (tag: string) => {
      onChange((prev) => {
        const arr = prev ?? [];
        return arr.includes(tag) ? arr.filter((t) => t !== tag) : [...arr, tag];
      });
    },
    [onChange],
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold mb-1">タグ選択:</div>
      <div className="flex flex-wrap gap-4">
        {TAGS.map((tag) => (
          <label key={tag} className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={(value ?? []).includes(tag)}
              onChange={() => handleChange(tag)}
              className="accent-blue-500"
            />
            <span className="text-sm">{tag}</span>
          </label>
        ))}
      </div>
    </div>
  );
});

export default TagSelector;
