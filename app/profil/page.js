import Header from "../../components/Header";
import Footer from "../../components/Footer";
import VisiMisi from "../../components/VisiMisi";
import ProfileLive from "../../components/ProfileLive";

export const metadata = {
  title: "Profil Desa - Desa Lendang Belo",
  description:
    "Profil lengkap Desa Lendang Belo - sejarah, pemerintah, dan informasi desa",
};

export default function Profil() {
  return (
    <main className="min-h-screen bg-white pt-16">
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

      <ProfileLive />

      <Footer />
    </main>
  );
}
