import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { env } from "~/env";

import { prisma } from "~/lib/utils";

export async function GET() {
  try {
    const currentLocation = await prisma.status.findUnique({
      where: { id: "0" },
    });

    return new Response(
      JSON.stringify({
        location: currentLocation?.value ?? "Tucson, AZ",
        timezone: currentLocation?.timezone ?? "America/Phoenix",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (_error) {
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
  const timezone = formData.get("timezone");
  const secret = formData.get("secret");

  if ((secret as string) !== env.SECRET) {
    return new NextResponse(`Nope!`, {
      status: 401,
    });
  }

  const trimCity = city && typeof city === "string" ? city.trim() : "";
  const trimState = state && typeof state === "string" ? state.trim() : "";
  const trimRegion = region && typeof region === "string" ? region.trim() : "";
  const trimTimezone =
    timezone && typeof timezone === "string"
      ? timezone.trim()
      : "America/Phoenix";

  const locationParts = [];

  if (trimCity) locationParts.push(trimCity);
  if (trimState && trimState !== trimCity) locationParts.push(trimState);
  if (trimRegion && trimRegion !== trimState) locationParts.push(trimRegion);

  const formattedLocation = locationParts.join(", ");

  await prisma.status.upsert({
    where: { id: "0" },
    create: { id: "0", value: formattedLocation, timezone: trimTimezone },
    update: { value: formattedLocation, timezone: trimTimezone },
  });

  revalidatePath("/");
  revalidatePath("/api/location");

  return new Response("Location updated!");
}
