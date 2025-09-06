"use client";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useCallback, useTransition } from "react";
import CategoryInput from "./CategoryInput";
import Counter from "./Counter";
import Pagination from "./Pagination";

const FilterPanel = () => {
  const [_, startTransition] = useTransition();
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: false, scroll: false }),
  );
  const [count, setCount] = useQueryState(
    "count",
    parseAsInteger
      .withDefault(0)
      .withOptions({ shallow: false, scroll: false }),
  );

  const setCategoryCallback = useCallback(
    (value: string) => {
      startTransition(() => {
        setCategory(value);
      });
    },
    [setCategory],
  );

  const setCountCallback = useCallback(
    (value: number | ((prev: number) => number)) => {
      startTransition(() => {
        setCount(value);
      });
    },
    [setCount],
  );

  return (
    <div className="w-full max-w-md mx-auto mb-8 p-6 bg-white dark:bg-gray-900 rounded-xl shadow flex flex-col gap-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        フィルター
      </h2>
      <div className="flex flex-col gap-4">
        <CategoryInput value={category} onChange={setCategoryCallback} />
        <hr className="my-2 border-gray-300 dark:border-gray-700" />
        <div className="flex justify-center">
          <Counter value={count} onChange={setCountCallback} />
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default FilterPanel;
