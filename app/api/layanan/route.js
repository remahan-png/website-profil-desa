import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("Layanan")
    .select("*")
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const { data, error } = await supabase
    .from("Layanan")
    .insert([body])
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function PUT(request) {
  const body = await request.json();
  const { id, ...updateData } = body;

  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const { data, error } = await supabase
    .from("Layanan")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function DELETE(request) {
  const body = await request.json();
  const { id } = body;

  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const { error } = await supabase.from("Layanan").delete().eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Deleted successfully" });
}
