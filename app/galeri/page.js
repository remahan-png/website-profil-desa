import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Eye, Calendar, MapPin } from "lucide-react";

export const metadata = {
  title: "Galeri Desa - Desa Lendang Belo",
  description: "Koleksi foto dan dokumentasi kegiatan Desa Lendang Belo",
};

export default function Galeri() {
  const galleryItems = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      title: "Kegiatan Gotong Royong",
      category: "Kegiatan Sosial",
      date: "15 Desember 2024",
      location: "Balai Desa",
      description: "Membersihkan lingkungan desa bersama warga",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
      title: "Panen Padi",
      category: "Pertanian",
      date: "20 November 2024",
      location: "Sawah Dusun Karangasem",
      description: "Musim panen padi tahun ini sangat melimpah",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
      title: "Festival Budaya",
      category: "Budaya",
      date: "10 Oktober 2024",
      location: "Lapangan Desa",
      description: "Pesta rakyat dengan tarian dan musik tradisional",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
      title: "Pelatihan Pertanian",
      category: "Pendidikan",
      date: "5 September 2024",
      location: "Balai Pertemuan",
      description: "Pelatihan teknologi pertanian modern",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop",
      title: "Peresmian Jembatan",
      category: "Infrastruktur",
      date: "25 Agustus 2024",
      location: "Jl. Desa Lendang Belo",
      description: "Peresmian jembatan penghubung antar dusun",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1520637836862-4d197d17c1a8?w=600&h=400&fit=crop",
      title: "Posyandu Balita",
      category: "Kesehatan",
      date: "12 Juli 2024",
      location: "Posyandu Dusun Krajan",
      description: "Pemeriksaan kesehatan rutin balita",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop",
      title: "Kerja Bakti",
      category: "Sosial",
      date: "3 Juni 2024",
      location: "Lingkungan RT 01",
      description: "Pembersihan lingkungan dan saluran air",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop",
      title: "Peringatan Hari Kemerdekaan",
      category: "Patriotic",
      date: "17 Agustus 2024",
      location: "Lapangan Desa",
      description: "Upacara peringatan kemerdekaan RI ke-79",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
      title: "Vaksinasi Massal",
      category: "Kesehatan",
      date: "15 Mei 2024",
      location: "Puskesmas Desa",
      description: "Program vaksinasi COVID-19 untuk warga",
    },
  ];

  const categories = [
    "Semua",
    "Kegiatan Sosial",
    "Pertanian",
    "Budaya",
    "Pendidikan",
    "Infrastruktur",
    "Kesehatan",
    "Patriotic",
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Galeri Desa</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Dokumentasi kegiatan dan momen berharga di Desa Lendang Belo
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative bg-gray-200 rounded-xl overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200">
              Muat Lebih Banyak
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
