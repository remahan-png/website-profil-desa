import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GalleryClient from "../../components/GalleryClient";

export const metadata = {
  title: "Galeri Desa - Desa Lendang Belo",
  description: "Koleksi foto dan dokumentasi kegiatan Desa Lendang Belo",
};

export default function Galeri() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Galeri Desa</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Dokumentasi kegiatan dan momen berharga di Desa Lendang Belo
          </p>
        </div>
      </section>

      <GalleryClient />

      <Footer />
    </main>
  );
}
