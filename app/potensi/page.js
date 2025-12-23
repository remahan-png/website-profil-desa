import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PotensiLive from "../../components/PotensiLive";

export const metadata = {
  title: "Potensi Desa - Desa Lendang Belo",
  description: "Potensi infrastruktur dan pariwisata Desa Lendang Belo",
};

export default function Potensi() {
  return (
    <main className="min-h-screen bg-white pt-16">
      <Header />

      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Potensi Desa</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Jelajahi potensi infrastruktur dan pariwisata yang dimiliki Desa Lendang Belo
          </p>
        </div>
      </section>

      <PotensiLive />

      <Footer />
    </main>
  );
}
