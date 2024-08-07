import db from "@/lib/db";

import { BillboardForm } from "./_components/BillboardForm";

type Props = {
  params: {
    billboardId: string;
  };
};

async function BillboardPage({ params }: Props) {
  const billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="main-container space-y-4 py-4 lg:py-6">
      <BillboardForm billboard={billboard} />
    </div>
  );
}

export default BillboardPage;
