export const dynamic = "force-dynamic";

import { prisma } from "~/lib/utils";

export default async function LocationComponent() {
  const currentLocation = await prisma.location.findFirst({
    where: { id: "0" },
  });

  return (
    <h3 className="text-center text-lg">
      Currently: {currentLocation?.location}
    </h3>
  );
}
