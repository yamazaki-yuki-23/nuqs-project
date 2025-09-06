"use client";

import { parseAsString, useQueryState } from "nuqs";
import { useTransition } from "react";

const CategoryInput = () => {
  const [_, startTransition] = useTransition();
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: false, scroll: false }),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setCategory(() => e.target.value);
    });
  };

  return (
    <div className="flex gap-4 items-center">
      <label htmlFor="category" className="font-medium">
        カテゴリ:
      </label>
      <input
        id="category"
        type="text"
        value={category}
        onChange={handleChange}
        className="border rounded px-2 py-1 text-black"
      />
    </div>
  );
};

export default CategoryInput;
