import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "site.json");

function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading site data:", error);
    return {};
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing site data:", error);
    return false;
  }
}

export async function GET() {
  try {
    const site = readData();
    return NextResponse.json(site);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch site data" }, { status: 500 });
  }
}

// POST will replace/merge site data
export async function POST(request) {
  try {
    const body = await request.json();
    const current = readData() || {};
    const updated = { ...current, ...body };
    if (writeData(updated)) return NextResponse.json(updated, { status: 200 });
    return NextResponse.json({ error: "Failed to save site data" }, { status: 500 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save site data" }, { status: 500 });
  }
}
