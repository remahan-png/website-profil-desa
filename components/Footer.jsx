"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const [menu, setMenu] = useState([]);
  const [profilHref, setProfilHref] = useState('#profil');
  const [siteInfo, setSiteInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/site')
      .then(res => res.json())
      .then(data => {
        setSiteInfo(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch site info", err);
        setLoading(false);
      });

    fetch('/api/menu')
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setMenu(list);
        const found = list.find((m) => m.label && String(m.label).toLowerCase().includes('profil'));
        if (found && found.href) {
          const resolved = String(found.href).startsWith('#') ? '/profil' : found.href;
          setProfilHref(resolved);
        }
      })
      .catch(() => setMenu([]));
    function handleStorage(e){
      if(e.key === 'menuSync'){
        fetch('/api/menu').then(r=>r.json()).then(d=>{
          const list = Array.isArray(d) ? d : [];
          setMenu(list);
          const found = list.find((m) => m.label && String(m.label).toLowerCase().includes('profil'));
          if (found && found.href) {
            const resolved = String(found.href).startsWith('#') ? '/profil' : found.href;
            setProfilHref(resolved);
          }
        }).catch(()=>{});
      }
    }
    window.addEventListener('storage', handleStorage);
    return ()=> window.removeEventListener('storage', handleStorage);
  }, []);

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
                href={siteInfo?.facebookUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={siteInfo?.instagramUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteInfo?.twitterUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
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
                  {loading ? <p>Memuat...</p> : <p>{siteInfo?.lokasi}</p>}
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                {loading ? <p>Memuat...</p> : <p>{siteInfo?.wa}</p>}
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                {loading ? <p>Memuat...</p> : <p>{siteInfo?.email}</p>}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Link Cepat</h3>
            <div className="space-y-2">
              {menu && menu.length > 0 ? (
                menu.map((m) => {
                  const isProfil = m.label && String(m.label).toLowerCase().includes('profil');
                  const raw = isProfil ? profilHref : m.href;
                  const hrefResolved = raw && String(raw).startsWith('#') ? '/' + String(raw) : raw;
                  if (String(hrefResolved).startsWith('http')) {
                    return (
                      <a key={m.id} href={hrefResolved} className="block text-gray-400 hover:text-white transition-colors duration-200" target="_blank" rel="noopener noreferrer">{m.label}</a>
                    );
                  }
                  return (
                    <Link key={m.id} href={hrefResolved || '/'} className="block text-gray-400 hover:text-white transition-colors duration-200">{m.label}</Link>
                  );
                })
              ) : (
                <>
                  <Link href="/#beranda" className="block text-gray-400 hover:text-white transition-colors duration-200">Beranda</Link>
                  <Link href={profilHref} className="block text-gray-400 hover:text-white transition-colors duration-200">Profil Desa</Link>
                  <Link href="/#statistik" className="block text-gray-400 hover:text-white transition-colors duration-200">Statistik</Link>
                  <Link href="/#berita" className="block text-gray-400 hover:text-white transition-colors duration-200">Berita</Link>
                  <Link href="/#galeri" className="block text-gray-400 hover:text-white transition-colors duration-200">Galeri</Link>
                  <Link href="/#kontak" className="block text-gray-400 hover:text-white transition-colors duration-200">Kontak</Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; KKN Bina Desa Lendang Belo 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
