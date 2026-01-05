import { getAllDataForHomepage } from '../lib/data.js'
import Header from '../components/Header.jsx'
import Stats from '../components/Stats.jsx'
import Sejarah from '../components/Sejarah.jsx'
import VisiMisi from '../components/VisiMisi.jsx'
import ProfileLive from '../components/ProfileLive.jsx'
import PotensiLive from '../components/PotensiLive.jsx'
import GalleryClient from '../components/GalleryClient.js' // Perhatikan ekstensi .js sesuai folder Anda
import KontakClient from '../components/KontakClient.jsx'
import Footer from '../components/Footer.jsx'

export default async function Home() {
  const data = await getAllDataForHomepage()
  
  if (!data || !data.profil) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-xl font-bold animate-pulse">Memuat Data Desa Lendang Belo...</p>
      </div>
    )
  }

  const { profil, statistik, potensi, berita, galeri } = data

  return (
    <main className="scroll-smooth">
      {/* 1. HERO / BERANDA - ID ini untuk navigasi Navbar */}
      <section id="beranda" className="relative">
        <Header 
          title={profil.nama_desa} 
          subtitle={profil.deskripsi_singkat}
          backgroundImage={profil.background_image}
        />
      </section>
      
      {/* 2. STATISTIK DESA */}
      <Stats data={statistik} />
      
      {/* 3. PROFIL DESA (Sejarah & Visi Misi) */}
      <section id="profil" className="py-16 bg-white">
        <Sejarah sejarah={profil.sejarah} />
        <VisiMisi visi={profil.visi} misi={profil.misi} />
      </section>

      {/* 4. PEMERINTAH DESA */}
      <ProfileLive data={profil} />

      {/* 5. POTENSI DESA */}
      <section id="potensi" className="py-12 bg-gray-50">
        <PotensiLive data={potensi} />
      </section>

      {/* 6. BERITA TERBARU - Menampilkan data dari tabel 'news' */}
      <section id="berita" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Berita Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {berita && berita.map((item) => (
              <a href={`/berita/${item.id}`} key={item.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:-translate-y-2">
                <div className="relative h-56 w-full">
                  <img src={item.image} alt={item.judul} className="object-cover w-full h-full" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors">{item.judul}</h3>
                  <span className="text-blue-500 font-semibold text-sm">Baca Selengkapnya →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GALERI DESA - Menampilkan data dari tabel 'gallery' */}
      <section id="galeri" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-4xl font-bold mb-10">Galeri Desa</h2>
           <GalleryClient data={galeri} />
        </div>
      </section>

      {/* 8. KONTAK & LOKASI WILAYAH */}
      <section id="kontak">
        <KontakClient profil={profil} />
      </section>

      {/* 9. FOOTER */}
      <Footer profil={profil} />
    </main>
  )
}