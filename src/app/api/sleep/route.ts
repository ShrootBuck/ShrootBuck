import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { env } from "~/env";

import { prisma } from "~/lib/utils";

export async function GET() {
  try {
    const currentStatus = await prisma.status.findUnique({
      where: { id: "1" },
    });

    return new Response(
      JSON.stringify({
        status: currentStatus?.value ?? "awake",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (_error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch sleep status" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const status = formData.get("status");
  const secret = formData.get("secret");

  if ((secret as string) !== env.SECRET) {
    return new NextResponse(`Nope!`, {
      status: 401,
    });
  }

  const trimStatus =
    status && typeof status === "string"
      ? status.trim().toLowerCase()
      : "awake";

  await prisma.status.upsert({
    where: { id: "1" },
    create: { id: "1", value: trimStatus },
    update: { value: trimStatus },
  });

  revalidatePath("/");
  revalidatePath("/api/sleep");

  return new Response("Sleep status updated!");
}
