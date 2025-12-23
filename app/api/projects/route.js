import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "projects.json");

function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading projects data:", error);
    return [];
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing projects data:", error);
    return false;
  }
}

export async function GET() {
  try {
    const items = readData();
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const items = readData();
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newItem = { id: newId, title: body.title || "", description: body.description || "", status: body.status || "draft" };
    items.unshift(newItem);
    if (writeData(items)) return NextResponse.json(newItem, { status: 201 });
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
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
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

// PUT /api/projects - update existing project
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, title, description, status } = body;
    const items = readData();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    items[idx] = {
      ...items[idx],
      title: title ?? items[idx].title,
      description: description ?? items[idx].description,
      status: status ?? items[idx].status,
    };
    if (writeData(items)) return NextResponse.json(items[idx]);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}
