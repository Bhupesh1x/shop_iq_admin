import db from "@/lib/db";

import { SizeForm } from "./_components/SizeForm";

type Props = {
  params: {
    sizeId: string;
  };
};

async function SizePage({ params }: Props) {
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="main-container space-y-4 py-4 lg:py-6">
      <SizeForm size={size} />
    </div>
  );
}

export default SizePage;
