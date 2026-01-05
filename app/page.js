import { getAllDataForHomepage } from '../lib/data.js'
import Header from '../components/Header.jsx'
import Stats from '../components/Stats.jsx'
import Sejarah from '../components/Sejarah.jsx'
import VisiMisi from '../components/VisiMisi.jsx'

// Next.js 13+ App Router automatically caches the results of `fetch` or database queries 
// used in Server Components. The cache is automatically revalidated when using 
// the revalidatePath or revalidateTag functions.

export default async function Home() {
  const data = await getAllDataForHomepage()
  
  if (!data || !data.profil) {
    // Handle error or loading state
    return <div className="p-10 text-center">Gagal memuat data desa atau data profil tidak ditemukan.</div>
  }

  const { profil, statistik, potensi, berita } = data

  // For background image, assume Header component uses profil.background_image
  // For optimization, ensure Stats component directly receives statistics data
  
  return (
    <main>
      <Header 
        title={profil.nama_desa || "Nama Desa"} 
        subtitle={profil.deskripsi_singkat || "Selamat Datang"}
        backgroundImage={profil.background_image}
      />
      
      {/* Meneruskan data statistik sebagai props agar sinkron instan */}
      {statistik && <Stats data={statistik} />}
      
      {/* Menggunakan data profil untuk Sejarah dan VisiMisi */}
      {profil.sejarah && <Sejarah sejarah={profil.sejarah} />}
      {profil.visi && profil.misi && <VisiMisi visi={profil.visi} misi={profil.misi} />}

      {/* Bagian Potensi */}
      {potensi.length > 0 && (
        <section id="potensi" className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Potensi Desa</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {potensi.map(item => (
              <div key={item.id} className="p-6 border rounded-lg shadow-md bg-white">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.nama}</h3>
                <p className="text-gray-600">{item.deskripsi}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bagian Berita */}
      {berita.length > 0 && (
        <section id="berita" className="container mx-auto py-16 px-4 bg-gray-50">
          <h2 className="text-3xl font-bold mb-8 text-center">Berita Terbaru</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {berita.map(item => (
              <a href={`/berita/${item.id}`} key={item.id} className="block group bg-white border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {item.image && <img src={item.image} alt={item.judul} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />}
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{new Date(item.created_at).toLocaleDateString('id-ID')}</p>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{item.judul}</h3>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
