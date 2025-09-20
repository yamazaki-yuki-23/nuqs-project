import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter, type UrlUpdateEvent } from "nuqs/adapters/testing";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import FilterPanel from "@/app/components/FilterPanel";

type RenderOptions = {
  searchParams?: string;
  onUrlUpdate?: ReturnType<typeof vi.fn>;
};

const renderFilterPanel = ({
  searchParams = "?category=Next.js&tags=React%2Bnuqs&count=2&page=2",
  onUrlUpdate,
}: RenderOptions = {}) => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <NuqsTestingAdapter searchParams={searchParams} onUrlUpdate={onUrlUpdate}>
      {children}
    </NuqsTestingAdapter>
  );

  return render(<FilterPanel />, { wrapper });
};

describe("FilterPanel", () => {
  it("renders the current query state from the URL", () => {
    renderFilterPanel();

    expect(screen.getByLabelText("カテゴリ:")).toHaveValue("Next.js");
    expect(screen.getByLabelText("React")).toBeChecked();
    expect(screen.getByLabelText("nuqs")).toBeChecked();
    expect(screen.getByText("カウンター: 2")).toBeInTheDocument();
    const pageDisplay = screen.getByText("ページ:", { exact: false });
    expect(pageDisplay).toHaveTextContent("ページ: 2");
  });

  it("updates the category immediately when pressing Enter", async () => {
    const user = userEvent.setup();
    const onUrlUpdate = vi.fn<(...args: [UrlUpdateEvent]) => void>();

    renderFilterPanel({ searchParams: "?category=old", onUrlUpdate });

    const input = screen.getByLabelText("カテゴリ:");
    await user.clear(input);
    await user.type(input, "nuqs{enter}");

    expect(onUrlUpdate).toHaveBeenCalled();
    const [[lastCall]] = onUrlUpdate.mock.calls.slice(-1);
    expect(lastCall.queryString).toBe("?category=nuqs");
    expect(lastCall.searchParams.get("category")).toBe("nuqs");
    expect(lastCall.options.history).toBe("replace");
  });

  it("syncs tag selection with the query string", async () => {
    const user = userEvent.setup();
    const onUrlUpdate = vi.fn<(...args: [UrlUpdateEvent]) => void>();

    renderFilterPanel({ searchParams: "?tags=React", onUrlUpdate });

    const nuqsCheckbox = screen.getByLabelText("nuqs");
    await user.click(nuqsCheckbox);

    expect(onUrlUpdate).toHaveBeenCalled();
    const [[updateAfterAdd]] = onUrlUpdate.mock.calls.slice(-1);
    expect(updateAfterAdd.queryString).toBe("?tags=React%2Bnuqs");

    const reactCheckbox = screen.getByLabelText("React");
    await user.click(reactCheckbox);

    const [[updateAfterRemove]] = onUrlUpdate.mock.calls.slice(-1);
    expect(updateAfterRemove.queryString).toBe("?tags=nuqs");
  });

  it("updates count and removes it from the URL when reset", async () => {
    const user = userEvent.setup();
    const onUrlUpdate = vi.fn<(...args: [UrlUpdateEvent]) => void>();

    renderFilterPanel({ searchParams: "?count=5", onUrlUpdate });

    const increment = screen.getByRole("button", { name: "+" });
    await user.click(increment);

    const [[incrementUpdate]] = onUrlUpdate.mock.calls.slice(-1);
    expect(incrementUpdate.searchParams.get("count")).toBe("6");

    const reset = screen.getByRole("button", { name: "リセット" });
    await user.click(reset);

    const [[resetUpdate]] = onUrlUpdate.mock.calls.slice(-1);
    expect(resetUpdate.searchParams.get("count")).toBeNull();
    expect(resetUpdate.queryString).toBe("");
  });
});
