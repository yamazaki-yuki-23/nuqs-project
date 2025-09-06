"use client";

import { memo } from "react";

type Props = {
  value: number;
  onChange: (fn: (prev: number) => number) => void;
};

const Counter = memo(({ value, onChange }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-900 rounded shadow">
      <span className="text-lg font-bold">カウンター: {value}</span>
      <div className="flex gap-2">
        <button
          type="button"
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onChange((prev) => prev - 1)}
        >
          -
        </button>
        <button
          type="button"
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onChange((prev) => prev + 1)}
        >
          +
        </button>
        <button
          type="button"
          className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
          onClick={() => onChange(() => 0)}
        >
          リセット
        </button>
      </div>
    </div>
  );
});

export default Counter;
