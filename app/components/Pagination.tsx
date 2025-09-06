"use client";

import { parseAsIndex, useQueryState } from "nuqs";
import { useTransition } from "react";

const Pagination = () => {
  const [_, startTransition] = useTransition();
  const [page, setPage] = useQueryState(
    "page",
    parseAsIndex.withDefault(0).withOptions({ shallow: false, scroll: false }),
  );

  const handlePrev = () => {
    startTransition(() => {
      setPage((prev) => Math.max(prev - 1, 0));
    });
  };

  const handleNext = () => {
    startTransition(() => {
      setPage((prev) => prev + 1);
    });
  };

  return (
    <div className="flex items-center gap-4 justify-center mt-4">
      <button
        type="button"
        className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        onClick={handlePrev}
        disabled={page <= 0}
      >
        前へ
      </button>
      <span className="font-mono text-lg">ページ: {page + 1}</span>
      <button
        type="button"
        className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        onClick={handleNext}
      >
        次へ
      </button>
    </div>
  );
};

export default Pagination;
