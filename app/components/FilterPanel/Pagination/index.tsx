"use client";

import { memo } from "react";

type PaginationProps = {
  page: number;
  setPage: (value: number) => void;
};

const Pagination = memo(({ page, setPage }: PaginationProps) => {
  return (
    <div className="flex items-center gap-4 justify-center mt-4">
      <button
        type="button"
        className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        onClick={() => setPage(Math.max(page - 1, 0))}
        disabled={page <= 0}
      >
        前へ
      </button>
      <span className="font-mono text-lg">ページ: {page + 1}</span>
      <button
        type="button"
        className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        onClick={() => setPage(page + 1)}
      >
        次へ
      </button>
    </div>
  );
});

export default Pagination;
