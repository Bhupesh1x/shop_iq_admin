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
        href: `/${params.storeId}/settings`,
        label: "Settings",
        isActive: pathname === `/${params.storeId}/settings`,
      },
    ];
  }, [params.storeId, pathname]);

  return (
    <div className="ml-3">
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
