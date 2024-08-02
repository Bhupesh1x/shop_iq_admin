import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import db from "@/lib/db";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
};

export default layout;
