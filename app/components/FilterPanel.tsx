"use client";

import {
  createParser,
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import { useCallback, useTransition } from "react";
import CategoryInput from "./CategoryInput";
import Counter from "./Counter";
import Pagination from "./Pagination";
import TagSelector from "./TagSelector";

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
  const parseAsTags = createParser<string[]>({
    parse: (value) => (value ? value.split("+") : []),
    serialize: (value) => value.join("+"),
  });
  const [tags, setTags] = useQueryState(
    "tags",
    parseAsTags.withDefault([]).withOptions({ shallow: false, scroll: false }),
  );
  const [page, setPage] = useQueryState(
    "page",
    parseAsIndex.withDefault(0).withOptions({ shallow: false, scroll: false }),
  );

  const setCategoryCallback = useCallback(
    (fn: (prev: string) => string) => {
      startTransition(() => {
        setCategory(fn);
      });
    },
    [setCategory],
  );
  const setCountCallback = useCallback(
    (fn: (prev: number) => number) => {
      startTransition(() => {
        setCount(fn);
      });
    },
    [setCount],
  );
  const setTagsCallback = useCallback(
    (fn: (prev: string[]) => string[]) => {
      startTransition(() => {
        setTags(fn);
      });
    },
    [setTags],
  );
  const setPageCallback = useCallback(
    (fn: (prev: number) => number) => {
      startTransition(() => {
        setPage(fn);
      });
    },
    [setPage],
  );

  const handleResetFilters = useCallback(() => {
    startTransition(() => {
      setCategoryCallback(() => "");
      setCountCallback(() => 0);
      setTagsCallback(() => []);
      setPageCallback(() => 0);
    });
  }, [setCategoryCallback, setCountCallback, setTagsCallback, setPageCallback]);

  return (
    <div className="w-full max-w-md mx-auto mb-8 p-6 bg-white dark:bg-gray-900 rounded-xl shadow flex flex-col gap-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        フィルター
      </h2>
      <div className="flex flex-col gap-4">
        <CategoryInput value={category} onChange={setCategoryCallback} />
        <TagSelector value={tags} onChange={setTagsCallback} />
        <hr className="my-2 border-gray-300 dark:border-gray-700" />
        <div className="flex justify-center">
          <Counter value={count} onChange={setCountCallback} />
        </div>
        <Pagination page={page} onChange={setPageCallback} />
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleResetFilters}
        >
          フィルターをリセット
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
