import { supabase } from "../lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const bucket = formData.get("bucket"); // Contoh: 'background-images' atau 'berita-images'

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    if (!bucket) {
      return NextResponse.json(
        { success: false, message: "Missing bucket name" },
        { status: 400 }
      );
    }

    // Konversi File ke Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Buat nama file unik
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const filePath = `${bucket}/${fileName}`; // Path di Supabase Storage

    // Upload file ke Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        cacheControl: "3600", // Cache selama 1 jam
        upsert: true, // Timpa jika nama file sama (opsional, tergantung kebutuhan)
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json(
        {
          success: false,
          message: "Supabase upload failed",
          error: uploadError.message,
        },
        { status: 500 }
      );
    }

    // Dapatkan URL publik
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // Berikan respons URL publik
    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      url: publicUrl, // URL publik yang diminta
    });
  } catch (error) {
    console.error("General upload error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "General upload failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
