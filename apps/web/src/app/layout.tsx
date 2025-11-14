"use client";

import "./globals.css";
import { usePathname } from "next/navigation";

import Header from "@src/components/common/header/Header";
import { Providers } from "./providers";
import { authenticatedRoutes } from "@src/routes";
const appRoutes = Object.values(authenticatedRoutes);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const matchedAppRoutes = appRoutes.some((route) => pathName === route);

  if (!matchedAppRoutes || pathName === "/") {
    return (
      <html lang="en">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
