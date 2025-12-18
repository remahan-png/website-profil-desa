import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Sejarah from "../components/Sejarah";
import VisiMisi from "../components/VisiMisi";
import Berita from "../components/Berita";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Desa Lendang Belo - Profil Desa Modern</title>
        <meta
          name="description"
          content="Website resmi Desa Lendang Belo - Desa yang maju, mandiri, dan berbudaya"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header />

      <main>
        <Hero />
        <Stats />
        <Sejarah />
        <VisiMisi />
        <Berita />
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <span className="ml-2 text-xl font-bold">
                  Desa Lendang Belo
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Desa yang harmonis, maju, dan berbudaya dengan masyarakat yang
                sejahtera dan harmonis.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Twitter
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Kontak</h3>
              <div className="space-y-2 text-gray-400">
                <p>Jl. Desa Lendang Belo</p>
                <p>Kecamatan Montong Gading</p>
                <p>Kabupaten Lombok Timur</p>
                <p>NTB, Indonesia</p>
                <p className="mt-4">📞 (021) 123-4567</p>
                <p>✉️ info@desalendangbelo.go.id</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Link Cepat</h3>
              <div className="space-y-2">
                <a
                  href="/"
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Beranda
                </a>
                <a
                  href="/profil"
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Profil Desa
                </a>
                <a
                  href="/sejarah"
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Sejarah
                </a>
                <a
                  href="/berita"
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Berita
                </a>
                <a
                  href="/kontak"
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Kontak
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Desa Lendang Belo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
