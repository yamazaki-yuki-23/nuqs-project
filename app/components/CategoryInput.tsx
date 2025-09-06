"use client";

import { memo } from "react";

type Props = {
  value: string;
  onChange: (fn: (prev: string) => string) => void;
};

const CategoryInput = memo(({ value, onChange }: Props) => {
  return (
    <div className="flex gap-4 items-center">
      <label htmlFor="category" className="font-medium">
        カテゴリ:
      </label>
      <input
        id="category"
        type="text"
        value={value}
        onChange={(e) => onChange(() => e.target.value)}
        className="border rounded px-2 py-1 text-black"
      />
    </div>
  );
});

export default CategoryInput;
