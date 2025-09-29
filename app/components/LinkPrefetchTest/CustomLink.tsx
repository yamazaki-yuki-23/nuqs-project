"use client";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type CustomLinkProps = LinkProps & {
  className?: string;
  children: ReactNode;
};

const CustomLink = ({
  href,
  className,
  children,
  ...props
}: CustomLinkProps) => {
  const router = useRouter();

  const handlePrefetch = () => {
    if (typeof href === "string") {
      router.prefetch(href);
    }
  };

  return (
    <Link
      {...props}
      href={href}
      prefetch={false}
      className={className}
      onMouseEnter={handlePrefetch}
      onTouchStart={handlePrefetch}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
