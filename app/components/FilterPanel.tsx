"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CategoryInput from "./CategoryInput";
import Counter from "./Counter";
import Pagination from "./Pagination";
import TagSelector from "./TagSelector";

const FilterPanel = () => {
  const pathname = usePathname();

  return (
    <div className="w-full max-w-md mx-auto mb-8 p-6 bg-white dark:bg-gray-900 rounded-xl shadow flex flex-col gap-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        フィルター
      </h2>
      <div className="flex flex-col gap-4">
        <CategoryInput />
        <TagSelector />
        <hr className="my-2 border-gray-300 dark:border-gray-700" />
        <div className="flex justify-center">
          <Counter />
        </div>
        <Pagination />
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
