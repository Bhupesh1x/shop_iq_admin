"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";

const MainNav = () => {
  const params = useParams();
  const pathname = usePathname();

  const routes = useMemo(() => {
    return [
      {
        href: `/${params.storeId}`,
        label: "Overview",
        isActive: pathname === `/${params.storeId}`,
      },
      {
        href: `/${params.storeId}/billboards`,
        label: "Billboards",
        isActive: pathname === `/${params.storeId}/billboards`,
      },
      {
        href: `/${params.storeId}/categories`,
        label: "Categories",
        isActive: pathname === `/${params.storeId}/categories`,
      },
      {
        href: `/${params.storeId}/sizes`,
        label: "Sizes",
        isActive: pathname === `/${params.storeId}/sizes`,
      },
      {
        href: `/${params.storeId}/colors`,
        label: "Colors",
        isActive: pathname === `/${params.storeId}/colors`,
      },
      {
        href: `/${params.storeId}/settings`,
        label: "Settings",
        isActive: pathname === `/${params.storeId}/settings`,
      },
    ];
  }, [params.storeId, pathname]);

  return (
    <div className="ml-3 space-x-3">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            route.isActive
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          }`}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
