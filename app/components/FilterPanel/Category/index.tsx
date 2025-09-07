"use client";

import { memo } from "react";

type CategoryProps = {
  category: string;
  setCategory: (value: string) => void;
};

const Category = memo(({ category, setCategory }: CategoryProps) => {
  return (
    <div className="flex gap-4 items-center">
      <label htmlFor="category" className="font-medium">
        カテゴリ:
      </label>
      <input
        id="category"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-2 py-1 text-black"
      />
    </div>
  );
});

export default Category;
