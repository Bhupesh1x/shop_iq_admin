import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import db from "@/lib/db";

import MainNav from "./MainNav";
import { StoreSwitcher } from "./StoreSwitcher";

export const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <nav className="border-b h-16 flex items-center px-3 md:px-6">
      <StoreSwitcher items={stores} />
      <MainNav />
      <div className="ml-auto">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};
