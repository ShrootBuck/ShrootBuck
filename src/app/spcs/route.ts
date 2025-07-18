import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(
    "https://github.com/ShrootBuck/stanford-predictive-maintenance",
    302,
  );
}
