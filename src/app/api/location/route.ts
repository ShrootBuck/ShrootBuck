import { NextResponse, type NextRequest } from "next/server";
import { env } from "~/env";

import { prisma } from "~/lib/utils";

export async function GET() {
  try {
    const currentLocation = await prisma.location.findFirst({
      where: { id: "0" },
    });

    return new Response(
      JSON.stringify({
        location: currentLocation?.location ?? "Tucson, AZ",
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch location" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const city = formData.get("city");
  const state = formData.get("state");
  const region = formData.get("region");
  const secret = formData.get("secret");

  if ((secret as string) !== env.SECRET) {
    return new NextResponse(`Nope!`, {
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
