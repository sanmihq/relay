import { createClient } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  try {
    const { data } = await supabase.from("rooms").select("id").limit(1);
    console.log("Ping successful:", data);
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Ping failed:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
