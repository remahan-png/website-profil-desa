import { getAllDataForHomepage } from '../lib/data.js'
import Header from '../components/Header.jsx'
import Stats from '../components/Stats.jsx'
import Sejarah from '../components/Sejarah.jsx'
import VisiMisi from '../components/VisiMisi.jsx'
import ProfileLive from '../components/ProfileLive.jsx'
import PotensiLive from '../components/PotensiLive.jsx'
import GalleryClient from '../components/GalleryClient.js'
import KontakClient from '../components/KontakClient.jsx'
import Footer from '../components/Footer.jsx'

export default async function Home() {
  const data = await getAllDataForHomepage()
  
  if (!data || !data.profil) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-blue-600 animate-pulse">
          Memuat Data Desa Lendang Belo...
        </p>
      </div>
    )
  }

  const { profil, statistik, potensi, berita, galeri } = data

  return (
    <main className="scroll-smooth">
      {/* 1. HERO SECTION */}
      <section id="beranda">
        <Header 
          title={profil.nama_desa} 
          subtitle={profil.deskripsi_singkat}
          backgroundImage={profil.background_image}
        />
      </section>
      
      {/* 2. STATISTIK */}
      <Stats data={statistik} />
      
      {/* 3. PROFIL (Sejarah & Visi Misi) */}
      <section id="profil" className="py-10">
        <Sejarah sejarah={profil.sejarah} />
        <VisiMisi visi={profil.visi} misi={profil.misi} />
      </section>

      {/* 4. PEMERINTAH DESA */}
      <ProfileLive data={profil} />

      {/* 5. POTENSI DESA */}
      <section id="potensi">
        <PotensiLive data={potensi} />
      </section>

      {/* 6. BERITA TERBARU (Mengambil dari tabel news) */}
      <section id="berita" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Berita Terbaru</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {berita && berita.map(item => (
              <a href={`/berita/${item.id}`} key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <img src={item.image} alt={item.judul} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{item.judul}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GALERI (Mengambil dari tabel gallery) */}
      <section id="galeri">
        <GalleryClient data={galeri} />
      </section>

      {/* 8. KONTAK & LOKASI */}
      <section id="kontak">
        <KontakClient profil={profil} />
      </section>

      {/* 9. FOOTER */}
      <Footer profil={profil} />
    </main>
  )
}