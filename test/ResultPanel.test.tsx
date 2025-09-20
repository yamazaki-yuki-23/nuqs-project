import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { allMock } = vi.hoisted(() => ({
  allMock: vi.fn(),
}));

vi.mock("@/app/searchParams", () => ({
  searchParamsCache: {
    all: allMock,
  },
}));

// The mock above must be defined before importing the component
import ResultPanel from "@/app/components/ResultPanel";

describe("ResultPanel", () => {
  beforeEach(() => {
    allMock.mockReset();
  });

  it("renders values returned by searchParamsCache", () => {
    allMock.mockReturnValue({
      category: "Next.js",
      tags: ["React", "nuqs"],
      count: 7,
      page: 1,
    });

    render(<ResultPanel />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(4);
    expect(items[0]).toHaveTextContent("カテゴリ: Next.js");
    expect(items[1]).toHaveTextContent("タグ: React, nuqs");
    expect(items[2]).toHaveTextContent("カウント: 7");
    expect(items[3]).toHaveTextContent("ページ: 2");
  });

  it("renders non-array tags as-is and adjusts zero-based page", () => {
    allMock.mockReturnValue({
      category: "",
      tags: "なし",
      count: 0,
      page: 0,
    });

    render(<ResultPanel />);

    const items = screen.getAllByRole("listitem");
    expect(items[1]).toHaveTextContent("タグ: なし");
    expect(items[3]).toHaveTextContent("ページ: 1");
  });
});
