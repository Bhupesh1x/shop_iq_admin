import db from "@/lib/db";

import { ColorForm } from "./_components/ColorForm";

type Props = {
  params: {
    colorId: string;
  };
};

async function ColorPage({ params }: Props) {
  const color = await db.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="main-container space-y-4 py-4 lg:py-6">
      <ColorForm color={color} />
    </div>
  );
}

export default ColorPage;
