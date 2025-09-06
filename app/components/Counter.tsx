"use client";

import { memo, useTransition } from "react";

type CounterProps = {
  count: number;
  setCount: (value: number | null) => void;
};

const Counter = memo(({ count, setCount }: CounterProps) => {
  const [_, startTransition] = useTransition();

  const handleDecrement = () => {
    startTransition(() => {
      setCount(count - 1);
    });
  };
  const handleIncrement = () => {
    startTransition(() => {
      setCount(count + 1);
    });
  };
  const handleReset = () => {
    startTransition(() => {
      setCount(null);
    });
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-900 rounded shadow">
      <span className="text-lg font-bold">カウンター: {count}</span>
      <div className="flex gap-2">
        <button
          type="button"
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleDecrement}
        >
          -
        </button>
        <button
          type="button"
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleIncrement}
        >
          +
        </button>
        <button
          type="button"
          className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
          onClick={handleReset}
        >
          リセット
        </button>
      </div>
    </div>
  );
});

export default Counter;
