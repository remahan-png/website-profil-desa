import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sejarah from "../components/Sejarah";
import { supabase } from "../lib/supabase";
import GalleryClient from "../components/GalleryClient";


export const dynamic = "force-dynamic";

export default async function Home() {
  const profilHref = "/profil";

  // 1. Ambil data profil_desa
  const { data: desaData, error: desaError } = await supabase
    .from("profil_desa")
    .select("*")
    .single();

  if (desaError) {
    console.error("Error fetching profil_desa:", desaError);
    // Fallback data
  }

  // 2. Ambil data news (limit 3)
  const { data: newsData, error: newsError } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  if (newsError) {
    console.error("Error fetching news:", newsError);
  }

  // 3. Ambil data gallery (limit 8)
  const { data: galleryData, error: galleryError } = await supabase
    .from("gallery")
    .select("id, url, caption, created_at")
    .order("created_at", { ascending: false })
    .limit(8);

  if (galleryError) {
    console.error("Error fetching gallery:", galleryError);
  }

  // Variabel penampung dataDesa
  const dataDesa = {
    // Data Stats & Hero (sesuai yang digunakan di JSX)
    penduduk: desaData?.penduduk || "2.500",
    kk: desaData?.kk || "750",
    pertanian: desaData?.pertanian || "85%",
    heroBackgroundImage: desaData?.hero_image
      ? `url('${desaData.hero_image}')`
      : "url('https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1920&h=1080&fit=crop')",
    // Variabel lain yang mungkin diperlukan di komponen yang di-import
    title: desaData?.title || 'Selamat Datang di',
    tagline: desaData?.tagline || 'Desa Lendang Belo',
    description: desaData?.description || 'Desa yang harmonis, maju, dan berbudaya dengan potensi pertanian dan pariwisata yang melimpah',
    visi: desaData?.visi || '',
    misi: desaData?.misi || [],
    sejarah: desaData?.sejarah || '',
    stats: desaData?.stats || {},
    kontak: desaData?.kontak || {},
    alamat: desaData?.alamat || 'Lokasi Kantor Desa',
  };

  // Variabel penampung news
  const news =
    newsData?.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      category: item.category,
      date: new Date(item.created_at).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      image: item.image,
    })) || [];

  // Variabel penampung gallery
  const gallery =
    galleryData?.map((item) => ({
      id: item.id,
      url: item.url,
      caption: item.caption,
      date: new Date(item.created_at).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    })) || [];

  // Variabel loading (dibuat agar bagian return yang menggunakan {loading ? ... : ...} tidak error)
  const finalLoading = false;
  const loading = finalLoading;
  

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section
        id="beranda"
        className="relative h-screen flex items-center justify-center bg-gradient-to-r from-green-600 to-blue-600"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: dataDesa.heroBackgroundImage,
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Selamat Datang di
            <br />
            <span className="text-red-400">Desa Lendang Belo</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Desa yang harmonis, maju, dan berbudaya dengan potensi pertanian dan
            pariwisata yang melimpah
          </p>
          <Link
            href={profilHref}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
          >
            Tentang Desa
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
      {/* Sejarah Desa (mengganti sections) */}
      <Sejarah />
      <section id="statistik" className="py-20 px-10 max-w-7xl mx-auto">
        <h3 className="text-4xl font-black italic uppercase mb-12 border-l-8 border-red-600 pl-6 tracking-tighter">
          Statistik Desa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kartu Penduduk */}
          <div className="bg-white p-10 rounded-[40px] shadow-2xl border-b-8 border-red-600 text-center transform hover:scale-105 transition">
            <h4 className="text-5xl font-black italic text-[#111C44]">
              {dataDesa.penduduk}
            </h4>
            <p className="text-[10px] font-black uppercase text-gray-400 mt-2 tracking-widest">
              Total Penduduk
            </p>
          </div>
          {/* Kartu Laki Laki */}
          <div className="bg-white p-10 rounded-[40px] shadow-2xl border-b-8 border-[#111C44] text-center transform hover:scale-105 transition">
            <h4 className="text-5xl font-black italic text-[#111C44]">
              {dataDesa.kk}
            </h4>
            <p className="text-[10px] font-black uppercase text-gray-400 mt-2 tracking-widest">
              Kepala Keluarga
            </p>
          </div>
          {/* Kartu Mata Pencaharian */}
          <div className="bg-white p-10 rounded-[40px] shadow-2xl border-b-8 border-red-600 text-center transform hover:scale-105 transition">
            <h4 className="text-5xl font-black italic text-red-600">
              {dataDesa.pertanian}
            </h4>
            <p className="text-[10px] font-black uppercase text-gray-400 mt-2 tracking-widest">
              Pertanian
            </p>
          </div>
        </div>
      </section>
      {/* News Section */}
      <section id="berita" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Berita <span className="text-red-600">Terkini</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Informasi terbaru tentang kegiatan, program, dan perkembangan di
              Desa Lendang Belo
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  {/* News Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        item.image ||
                        "https://via.placeholder.com/400x250?text=Berita"
                      }
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {item.category || "Berita"}
                      </span>
                    </div>
                  </div>

                  {/* News Content */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="text-sm text-gray-500 mb-2 flex items-center">
                      <span>{item.date}</span>
                      <span className="mx-2">•</span>
                      <span>{item.readTime || "3 menit"}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {item.excerpt || item.content.substring(0, 120) + "..."}
                    </p>

                    {/* Read More Link */}
                    <Link
                      href={`/berita/${item.id}`}
                      className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors group-hover:translate-x-1 transform transition-transform"
                    >
                      Baca Selengkapnya
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* View All News Button */}
          <div className="text-center mt-12">
            <Link
              href="/berita"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Lihat Semua Berita
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeri" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Galeri <span className="text-red-600">Kegiatan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dokumentasi kegiatan dan momen berharga di Desa Lendang Belo
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={
                      item.url ||
                      "https://via.placeholder.com/300x300?text=Galeri"
                    }
                    alt={item.caption}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Overlay */}
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

          {/* View All Gallery Button */}
          <div className="text-center mt-12">
            <Link
              href="/galeri"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Lihat Semua Galeri
            </Link>
          </div>
        </div>
      </section>

      <section id="peta" className="py-20 px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-[#111C44]">
              Lokasi Wilayah Desa
            </h3>
            <div className="w-20 h-1.5 bg-red-600 mx-auto mt-2 rounded-full"></div>
          </div>
          <div className="rounded-[50px] overflow-hidden shadow-2xl h-[450px] border-8 border-white relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.541450286884!2d116.3986!3d-8.6212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzcnMTYuMyJTIDExNsKwMjMnNTUuMCJF!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="grayscale group-hover:grayscale-0 transition duration-1000"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Mari Bergabung Bersama Kami
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Jadilah bagian dari komunitas Desa Lendang Belo yang harmonis dan
            berkembang
          </p>
          <div
            id="kontak"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/kontak"
              className="inline-block bg-white text-red-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Hubungi Kami
            </Link>
            <Link
              href={profilHref}
              className="inline-block bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-red-600 transition-colors duration-300"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
