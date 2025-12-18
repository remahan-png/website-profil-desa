import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="ml-2 text-xl font-bold">Desa Lendang Belo</span>
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
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Jl. Desa Lendang Belo</p>
                  <p>Kecamatan Montong Gading</p>
                  <p>Kabupaten Lombok Timur</p>
                  <p>NTB, Indonesia</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                <p>(021) 123-4567</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                <p>info@desalendangbelo.go.id</p>
              </div>
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
                href="/berita"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Berita
              </a>
              <a
                href="/galeri"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Galeri
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
  );
};

export default Footer;
