import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "gallery.json");

// Helper function to read data
function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading gallery data:", error);
    return [];
  }
}

// Helper function to write data
function writeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing gallery data:", error);
    return false;
  }
}

// GET /api/gallery - Get all gallery items
export async function GET() {
  try {
    const gallery = readData();
    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}

// POST /api/gallery - Create new gallery item
export async function POST(request) {
  try {
    const body = await request.json();
    const gallery = readData();

    // Generate new ID
    const newId =
      gallery.length > 0 ? Math.max(...gallery.map((item) => item.id)) + 1 : 1;

    const newGalleryItem = {
      id: newId,
      image: body.image || "",
      title: body.title || "",
      category: body.category || "Umum",
      date: new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      location: body.location || "",
      description: body.description || "",
    };

    gallery.unshift(newGalleryItem); // Add to beginning of array

    if (writeData(gallery)) {
      return NextResponse.json(newGalleryItem, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "Failed to save gallery item" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json(
      { error: "Failed to create gallery item" },
      { status: 500 }
    );
  }
}
