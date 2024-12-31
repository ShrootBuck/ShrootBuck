import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { prisma } from "~/lib/utils";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const city = formData.get("city");
  const state = formData.get("state");
  const region = formData.get("region");
  const secret = formData.get("secret");

  // if (secret !== env.SECRET) {
  //   return new NextResponse("Unauthorized", { status: 401 });
  // }

  const formattedLocation = `${city as string}, ${state as string}, ${region as string}`;

  await prisma.location.upsert({
    where: { id: "0" },
    create: { id: "0", location: formattedLocation },
    update: { location: formattedLocation },
  });

  return new Response("Location updated!");
}
