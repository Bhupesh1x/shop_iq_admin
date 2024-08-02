import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import db from "@/lib/db";

type Props = {
  children: React.ReactNode;
  params: { storeId: string };
};

const DashoardLayout = async ({ children, params }: Props) => {
  const { userId } = auth();
  const { storeId } = params;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div>
      <h1>This will be a navbar</h1>
      {children}
    </div>
  );
};

export default DashoardLayout;
