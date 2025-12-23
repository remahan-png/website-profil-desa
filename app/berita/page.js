export const dynamic = "force-dynamic";

import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function BeritaPage() {
  const { data: news, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Bagian Atas */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Berita Desa</h1>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg">
            Informasi terbaru seputar kegiatan dan perkembangan desa kami.
          </p>
        </div>

        {!news || news.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-gray-500 text-lg font-medium">
              Belum ada berita yang tersedia saat ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                {/* Bagian Gambar */}
                <div className="relative overflow-hidden h-56">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 italic">
                        Tidak ada gambar
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Update
                  </div>
                </div>

                {/* Konten Berita */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-gray-400 mb-3 flex items-center">
                    <span className="mr-2">📅</span>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Baru saja"}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                    {item.content}
                  </p>

                  {/* Tombol Baca */}
                  <div className="mt-auto">
                    <Link
                      href={`/berita/${item.id}`}
                      className="inline-flex items-center text-red-600 font-semibold hover:gap-2 transition-all duration-200 group/btn"
                    >
                      Baca Selengkapnya
                      <span className="ml-1 group-hover/btn:translate-x-1 transition-transform">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
