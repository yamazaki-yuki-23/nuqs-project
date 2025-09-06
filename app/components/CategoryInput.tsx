"use client";

import { memo, useTransition } from "react";

type CategoryInputProps = {
  category: string;
  setCategory: (value: string) => void;
};

const CategoryInput = memo(({ category, setCategory }: CategoryInputProps) => {
  const [_, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setCategory(e.target.value);
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
});

export default CategoryInput;
