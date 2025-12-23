import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "news.json");

// Helper function to read data
function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading news data:", error);
    return [];
  }
}

// Helper function to write data
function writeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing news data:", error);
    return false;
  }
}

// GET /api/news - Get all news
export async function GET() {
  try {
    const news = readData();
    return NextResponse.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

// POST /api/news - Create new news
export async function POST(request) {
  try {
    const body = await request.json();
    const news = readData();

    // Generate new ID
    const newId =
      news.length > 0 ? Math.max(...news.map((item) => item.id)) + 1 : 1;

    const newNewsItem = {
      id: newId,
      title: body.title || "",
      excerpt: body.excerpt || "",
      content: body.content || "",
      image: body.image || "",
      date: new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      author: body.author || "Admin Desa",
      category: body.category || "Umum",
      readTime: body.readTime || "3 menit",
    };

    news.unshift(newNewsItem); // Add to beginning of array

    if (writeData(news)) {
      return NextResponse.json(newNewsItem, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "Failed to save news" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}

// PUT /api/news - update existing news
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, title, excerpt, content, image, category, author, readTime } = body;
    const news = readData();
    const idx = news.findIndex((n) => n.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    news[idx] = {
      ...news[idx],
      title: title ?? news[idx].title,
      excerpt: excerpt ?? news[idx].excerpt,
      content: content ?? news[idx].content,
      image: image ?? news[idx].image,
      category: category ?? news[idx].category,
      author: author ?? news[idx].author,
      readTime: readTime ?? news[idx].readTime,
    };
    if (writeData(news)) return NextResponse.json(news[idx]);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
  }
}

// DELETE /api/news - delete news by id
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const news = readData();
    const filtered = news.filter((n) => n.id !== id);
    if (writeData(filtered)) return NextResponse.json({ success: true });
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
