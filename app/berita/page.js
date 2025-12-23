// Baris ini sangat penting agar Vercel selalu mengambil berita terbaru
export const dynamic = "force-dynamic";

import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

// Inisialisasi Supabase menggunakan Environment Variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function BeritaPage() {
  // Mengambil data dari tabel 'news'
  const { data: news, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Berita Desa</h1>

      {!news || news.length === 0 ? (
        <p className="text-center text-gray-500">
          Belum ada berita yang tersedia.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {item.content}
                </p>
                <Link
                  href={`/berita/${item.id}`}
                  className="text-red-600 font-medium hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
