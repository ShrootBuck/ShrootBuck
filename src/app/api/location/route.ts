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

  const trimCity = city && typeof city === "string" ? city.trim() : "";
  const trimState = state && typeof state === "string" ? state.trim() : "";
  const trimRegion = region && typeof region === "string" ? region.trim() : "";

  const locationParts = [];

  if (trimCity) locationParts.push(trimCity);
  if (trimState && trimState !== trimCity) locationParts.push(trimState);
  if (trimRegion && trimRegion !== trimState) locationParts.push(trimRegion);

  const formattedLocation = locationParts.join(", ");

  await prisma.location.upsert({
    where: { id: "0" },
    create: { id: "0", location: formattedLocation },
    update: { location: formattedLocation },
  });

  return new Response("Location updated!");
}
