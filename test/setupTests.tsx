import "@testing-library/jest-dom/vitest";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { vi } from "vitest";

vi.mock("next/link", () => {
  const Link = forwardRef<
    HTMLAnchorElement,
    ComponentPropsWithoutRef<"a"> & { href: string }
  >(({ children, href, scroll: _scroll, ...props }, ref) => (
    <a ref={ref} href={href} {...props}>
      {children}
    </a>
  ));
  Link.displayName = "NextLinkMock";
  return { __esModule: true, default: Link };
});

vi.mock("next/navigation", () => ({
  usePathname: () => "/mock-path",
}));
