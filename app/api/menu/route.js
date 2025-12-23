import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "menu.json");

function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading menu data:", error);
    return [];
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing menu data:", error);
    return false;
  }
}

export async function GET() {
  try {
    const menu = readData();
    return NextResponse.json(menu);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const menu = readData();
    const newId = menu.length > 0 ? Math.max(...menu.map((m) => m.id)) + 1 : 1;
    const newItem = { id: newId, label: body.label || "", href: body.href || "#" };
    menu.push(newItem);
    if (writeData(menu)) return NextResponse.json(newItem, { status: 201 });
    return NextResponse.json({ error: "Failed to save menu" }, { status: 500 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const menu = readData();
    const filtered = menu.filter((m) => m.id !== id);
    if (writeData(filtered)) return NextResponse.json({ success: true });
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
  }
}

// PUT /api/menu - update existing menu item
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, label, href } = body;
    const menu = readData();
    const idx = menu.findIndex((m) => m.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    menu[idx] = { ...menu[idx], label: label ?? menu[idx].label, href: href ?? menu[idx].href };
    if (writeData(menu)) return NextResponse.json(menu[idx]);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 });
  }
}
