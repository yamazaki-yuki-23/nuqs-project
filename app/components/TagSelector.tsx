"use client";

import { createParser, useQueryState } from "nuqs";
import { useCallback, useTransition } from "react";

const TAGS = ["React", "Next.js", "nuqs", "TypeScript", "Tailwind"];

const parseAsTags = createParser<string[]>({
  parse: (value) => (value ? value.split("+") : []),
  serialize: (value) => value.join("+"),
});

const TagSelector = () => {
  const [_, startTransition] = useTransition();
  const [tags, setTags] = useQueryState(
    "tags",
    parseAsTags.withDefault([]).withOptions({ shallow: false, scroll: false }),
  );

  const handleChange = useCallback(
    (tag: string) => {
      startTransition(() => {
        setTags((prev) => {
          const arr = prev ?? [];
          if (arr.includes(tag)) {
            const next = arr.filter((t) => t !== tag);
            return next.length === 0 ? null : next;
          } else {
            return [...arr, tag];
          }
        });
      });
    },
    [setTags],
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
};

export default TagSelector;
