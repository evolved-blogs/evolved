"use client";

import { usePathname } from "next/navigation";
import Header from "@src/components/common/header/Header";
import { Providers } from "./providers";
import { authenticatedRoutes } from "@src/routes";

const appRoutes = Object.values(authenticatedRoutes);

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const matchedAppRoutes = appRoutes.some((route) => pathName === route);

  if (!matchedAppRoutes || pathName === "/") {
    return <Providers>{children}</Providers>;
  }

  return (
    <Providers>
      <Header />
      {children}
    </Providers>
  );
}
