import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import db from "@/lib/db";

import SettingsForm from "./_components/SettingsForm";

type Props = {
  params: {
    storeId: string;
  };
};

async function SettingsPage({ params }: Props) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      userId,
      id: params.storeId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="main-container space-y-4 py-4 lg:py-6">
      <SettingsForm store={store} />
    </div>
  );
}

export default SettingsPage;
