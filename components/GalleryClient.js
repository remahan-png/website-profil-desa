"use client";

// Komponen ini sekarang hanya bertanggung jawab untuk menampilkan data galeri
// yang diterima melalui props.
export default function GalleryClient({ galleryItems = [] }) {
  if (!galleryItems || galleryItems.length === 0) {
    return (
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-10 bg-gray-100 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-700">
              Galeri Masih Kosong
            </h3>
            <p className="text-gray-500 mt-2">
              Belum ada foto kegiatan yang diunggah.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  {item.date && (
                    <p className="text-xs opacity-90">
                      {new Date(item.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}