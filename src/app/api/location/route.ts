import { NextResponse, type NextRequest } from "next/server";
import { env } from "~/env";

import { prisma } from "~/lib/utils";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const city = formData.get("city");
  const state = formData.get("state");
  const region = formData.get("region");
  const secret = formData.get("secret");

  if ((secret as string) !== env.SECRET) {
    return new NextResponse(`${secret as string} - ${env.SECRET}`, {
      status: 401,
    });
  }

  const locationParts = [city, state, region].filter(
    (part) => part && typeof part === "string" && part.trim() !== "",
  );
  const formattedLocation = locationParts.join(", ");

  await prisma.location.upsert({
    where: { id: "0" },
    create: { id: "0", location: formattedLocation },
    update: { location: formattedLocation },
  });

  return new Response("Location updated!");
}
