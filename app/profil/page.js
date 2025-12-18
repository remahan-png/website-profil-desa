import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Profil Desa - Desa Lendang Belo",
  description:
    "Profil lengkap Desa Lendang Belo - sejarah, pemerintah, dan informasi desa",
};

export default function Profil() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Profil Desa Lendang Belo
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Kenali lebih dalam tentang Desa Lendang Belo, desa yang harmonis dan
            berbudaya
          </p>
        </div>
      </section>

      {/* Tentang Desa */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tentang Desa
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Desa Lendang Belo terletak di Kecamatan Montong Gading, Kabupaten
              Lombok Timur, Provinsi Nusa Tenggara Barat
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Desa Lendang Belo merupakan salah satu desa di Kecamatan
                  Montong Gading yang memiliki potensi besar dalam bidang
                  pertanian, pariwisata, dan kerajinan tangan. Desa ini
                  dikelilingi oleh hamparan sawah yang hijau dan perbukitan yang
                  indah, menciptakan suasana yang tenang dan nyaman untuk
                  ditinggali.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Masyarakat Desa Lendang Belo dikenal dengan keramahan dan
                  gotong royong yang tinggi. Tradisi budaya lokal masih sangat
                  kuat di desa ini, terlihat dari berbagai kegiatan adat dan
                  seni yang masih dilestarikan hingga saat ini.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    2,450
                  </div>
                  <div className="text-gray-600">Jumlah Penduduk</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    850 Ha
                  </div>
                  <div className="text-gray-600">Luas Wilayah</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-2">8</div>
                  <div className="text-gray-600">Jumlah Dusun</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    1,850 m
                  </div>
                  <div className="text-gray-600">Ketinggian</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informasi Geografis
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Kecamatan</span>
                  <span className="text-gray-900">Montong Gading</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Kabupaten</span>
                  <span className="text-gray-900">Lombok Timur</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Provinsi</span>
                  <span className="text-gray-900">Nusa Tenggara Barat</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Kode Pos</span>
                  <span className="text-gray-900">83663</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Ketinggian</span>
                  <span className="text-gray-900">1,850 m dpl</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pemerintah Desa */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pemerintah Desa
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Struktur organisasi pemerintah Desa Lendang Belo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Kepala Desa
              </h3>
              <p className="text-red-600 font-semibold">H. Ahmad Yani, S.Pd</p>
              <p className="text-gray-600 text-sm mt-2">
                NIP: 19751231 199803 1 001
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👩‍💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Sekretaris Desa
              </h3>
              <p className="text-blue-600 font-semibold">Hj. Siti Aminah</p>
              <p className="text-gray-600 text-sm mt-2">
                NIP: 19800515 200604 2 002
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Bendahara Desa
              </h3>
              <p className="text-green-600 font-semibold">Ahmad Sudirman</p>
              <p className="text-gray-600 text-sm mt-2">
                NIP: 19821020 200801 1 003
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
