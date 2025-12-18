import Header from "../components/Header";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Sejarah from "../components/Sejarah";
import VisiMisi from "../components/VisiMisi";
import Berita from "../components/Berita";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Stats />
      <Sejarah />
      <VisiMisi />
      <Berita />
      <Footer />
    </main>
  );
}
