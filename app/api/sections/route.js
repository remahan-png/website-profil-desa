import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "sections.json");

function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading sections data:", error);
    return [];
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing sections data:", error);
    return false;
  }
}

export async function GET() {
  try {
    const items = readData();
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch sections" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const items = readData();
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newItem = { id: newId, name: body.name || "", content: body.content || "" };
    items.unshift(newItem);
    if (writeData(items)) return NextResponse.json(newItem, { status: 201 });
    return NextResponse.json({ error: "Failed to save section" }, { status: 500 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create section" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const items = readData();
    const filtered = items.filter((i) => i.id !== id);
    if (writeData(filtered)) return NextResponse.json({ success: true });
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete section" }, { status: 500 });
  }
}

// PUT /api/sections - update existing section
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, content } = body;
    const items = readData();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    items[idx] = {
      ...items[idx],
      name: name ?? items[idx].name,
      content: content ?? items[idx].content,
    };
    if (writeData(items)) return NextResponse.json(items[idx]);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update section" }, { status: 500 });
  }
}
