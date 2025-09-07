"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createParser,
  debounce,
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { useCallback } from "react";
import Category from "./Category";
import Counter from "./Counter";
import Pagination from "./Pagination";
import TagSelector from "./TagSelector";

const parseAsTags = createParser<string[]>({
  parse: (value) => (value ? value.split("+") : []),
  serialize: (value) =>
    (value && value.length > 0 ? value.join("+") : null) as string,
});

const FilterPanel = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [states, setStates] = useQueryStates({
    category: parseAsString
      .withDefault("")
      .withOptions({ shallow: true, scroll: false }),
    tags: parseAsTags
      .withDefault([])
      .withOptions({ shallow: true, scroll: false }),
    count: parseAsInteger
      .withDefault(0)
      .withOptions({ shallow: true, scroll: false }),
    page: parseAsIndex
      .withDefault(0)
      .withOptions({ shallow: true, scroll: false }),
  });

  const CATEGORY_DEBOUNCE_MS = 500;

  // 入力値をdebounceしてURLクエリを遅延更新する（空文字の場合は即時更新）
  const setCategoryDebounced = useCallback(
    async (value: string) => {
      await setStates((prev) => ({ ...prev, category: value }), {
        limitUrlUpdates:
          value === "" ? undefined : debounce(CATEGORY_DEBOUNCE_MS),
      });
      router.refresh();
    },
    [setStates, router],
  );

  // Enterキーなど即時反映したい場合に使う（debounceなし）
  const setCategoryImmediate = useCallback(
    async (value: string) => {
      await setStates((prev) => ({ ...prev, category: value }));
      router.refresh();
    },
    [setStates, router],
  );
  const setTags = useCallback(
    async (value: string[] | null) => {
      await setStates((prev) => ({ ...prev, tags: value }));
      router.refresh();
    },
    [setStates, router],
  );
  const setCount = useCallback(
    async (value: number | null) => {
      await setStates((prev) => ({ ...prev, count: value }));
      router.refresh();
    },
    [setStates, router],
  );
  const setPage = useCallback(
    async (value: number) => {
      await setStates((prev) => ({ ...prev, page: value }));
      router.refresh();
    },
    [setStates, router],
  );

  return (
    <div className="w-full max-w-md mx-auto mb-8 p-6 bg-white dark:bg-gray-900 rounded-xl shadow flex flex-col gap-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        フィルター
      </h2>
      <div className="flex flex-col gap-4">
        <Category
          category={states.category}
          setCategory={setCategoryDebounced}
          setCategoryImmediate={setCategoryImmediate}
        />
        <TagSelector tags={states.tags} setTags={setTags} />
        <hr className="my-2 border-gray-300 dark:border-gray-700" />
        <div className="flex justify-center">
          <Counter count={states.count} setCount={setCount} />
        </div>
        <Pagination page={states.page} setPage={setPage} />
        <Link
          href={pathname}
          scroll={false}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center text-center"
        >
          フィルターをリセット
        </Link>
      </div>
    </div>
  );
};

export default FilterPanel;
