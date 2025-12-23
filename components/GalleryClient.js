"use client";

import { useState, useEffect } from "react";

export default function GalleryClient() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setGalleryItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to load gallery", e);
      } finally {
        setLoading(false);
      }
    }
    load();

    function onStorage(e) {
      if (e.key === "gallerySync") {
        fetch("/api/gallery")
          .then((r) => r.json())
          .then((d) => setGalleryItems(Array.isArray(d) ? d : []))
          .catch(() => {});
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={
                    item.url ||
                    "https://via.placeholder.com/300x300?text=Galeri"
                  }
                  alt={item.caption || "Galeri"}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                      {item.caption || "Kegiatan Desa"}
                    </h3>
                    <p className="text-xs opacity-90">
                      {item.date || "Tanggal tidak tersedia"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          {/* Could add pagination/load more if needed */}
        </div>
      </div>
    </section>
  );
}
