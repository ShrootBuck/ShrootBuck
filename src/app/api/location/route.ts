import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { env } from "~/env";

import { prisma } from "~/lib/utils";
import { FALLBACK_TIME_ZONE, isValidTimeZone } from "~/lib/time";

const locationUpdateSchema = z
  .object({
    city: z.string().trim().max(100).default(""),
    state: z.string().trim().max(100).default(""),
    region: z.string().trim().max(100).default(""),
    timezone: z
      .string()
      .trim()
      .max(100)
      .default(FALLBACK_TIME_ZONE)
      .refine(isValidTimeZone, "Invalid IANA time zone"),
  })
  .refine(({ city, state, region }) => city || state || region, {
    message: "At least one location field is required",
  });

export async function GET() {
  try {
    const currentLocation = await prisma.status.findUnique({
      where: { id: "0" },
    });

    return NextResponse.json(
      {
        location: currentLocation?.value ?? "Tucson, AZ",
        timezone:
          currentLocation?.timezone && isValidTimeZone(currentLocation.timezone)
            ? currentLocation.timezone
            : FALLBACK_TIME_ZONE,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch location" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const secret = formData.get("secret");

    if (typeof secret !== "string" || secret !== env.SECRET) {
      return new NextResponse("Nope!", { status: 401 });
    }

    const readString = (key: string) => {
      const value = formData.get(key);
      return typeof value === "string" ? value : undefined;
    };

    const result = locationUpdateSchema.safeParse({
      city: readString("city"),
      state: readString("state"),
      region: readString("region"),
      timezone: readString("timezone"),
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid location data" },
        { status: 400 },
      );
    }

    const { city, state, region, timezone } = result.data;
    const locationParts = [city, state, region].filter(
      (part, index, parts) =>
        part.length > 0 &&
        parts.findIndex(
          (candidate) => candidate.toLowerCase() === part.toLowerCase(),
        ) === index,
    );
    const formattedLocation = locationParts.join(", ");

    await prisma.status.upsert({
      where: { id: "0" },
      create: { id: "0", value: formattedLocation, timezone },
      update: { value: formattedLocation, timezone },
    });

    revalidatePath("/");
    revalidatePath("/api/location");

    return new Response("Location updated!");
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to update location" },
      { status: 500 },
    );
  }
}
