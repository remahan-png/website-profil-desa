import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GalleryClient from "../../components/GalleryClient";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function Galeri() {
  // Ambil data gallery
  const { data: galleryData, error: galleryError } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  if (galleryError) console.error("Error fetching gallery:", galleryError);

  // Variabel penampung
  const dataGallery = galleryData || [];

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

      {/* Memberikan data ke GalleryClient */}
      <GalleryClient dataGallery={dataGallery} />

      <Footer />
    </main>
  );
}
