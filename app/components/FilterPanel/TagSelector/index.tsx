"use client";

import { memo, useCallback } from "react";
import { TAGS } from "@/src/constants/nuqs";

type TagSelectorProps = {
  tags: string[];
  setTags: (value: string[] | null) => void;
};

const TagSelector = memo(({ tags, setTags }: TagSelectorProps) => {
  const handleChange = useCallback(
    (tag: string) => {
      const arr = tags ?? [];
      if (arr.includes(tag)) {
        const next = arr.filter((t) => t !== tag);
        setTags(next.length === 0 ? null : next);
      } else {
        setTags([...arr, tag]);
      }
    },
    [tags, setTags],
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold mb-1">タグ選択:</div>
      <div className="flex flex-wrap gap-4">
        {TAGS.map((tag) => (
          <label key={tag} className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={(tags ?? []).includes(tag)}
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
