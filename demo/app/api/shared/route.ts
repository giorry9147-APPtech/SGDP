import { NextResponse } from "next/server";
import { dispatch, readState, type SharedAction } from "@/lib/shared-state-server";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const state = await readState();
  return NextResponse.json(state);
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const action = (await req.json()) as SharedAction;
  const state = await dispatch(action);
  return NextResponse.json(state);
}
