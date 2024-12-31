import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { prisma } from "~/lib/utils";

export async function GET(request: NextRequest) {
  // Parse the URL
  const { searchParams } = new URL(request.url);

  // Access query parameters
  const securityVerificationParam = searchParams.get("security");
  const city = searchParams.get("city");
  const region = searchParams.get("region");

  if (securityVerificationParam !== env.SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const formattedLocation = `${city}, ${region}`;

  await prisma.location.upsert({
    where: { id: "0" },
    create: { id: "0", location: formattedLocation },
    update: { location: formattedLocation },
  });

  return new Response(
    JSON.stringify({ message: `Enjoy your stay in ${city}, ${region}!` }),
  );
}
