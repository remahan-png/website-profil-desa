"use client";
import React, { useEffect, useState } from 'react';

export default function PotensiLive() {
  const [site, setSite] = useState({});

  async function fetchSite(){
    try{
      const res = await fetch('/api/site');
      if(res.ok){const d = await res.json(); setSite(d || {});}
    }catch(e){}
  }

  useEffect(()=>{
    fetchSite();
    function onStorage(e){ if(e.key === 'siteSync') fetchSite(); }
    window.addEventListener('storage', onStorage);
    return ()=> window.removeEventListener('storage', onStorage);
  },[]);

  const { jalanJembatan, airBersih, listrikTelekom, wisataAlam, kearifanLokal } = site || {};

  return (
    <>
      <section id="infrastruktur" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Infrastruktur</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Kondisi fasilitas dan pembangunan desa</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-2">Jalan & Jembatan</h3>
              <p className="text-sm text-gray-600">{jalanJembatan || 'Paving jalan utama, akses ke dusun, dan perbaikan jembatan kecil.'}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-2">Air Bersih</h3>
              <p className="text-sm text-gray-600">{airBersih || 'Sumur bersama dan jaringan air bersih untuk beberapa RT.'}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-2">Listrik & Telekomunikasi</h3>
              <p className="text-sm text-gray-600">{listrikTelekom || 'Layanan listrik tersedia, jaringan seluler dan akses internet meningkat.'}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pariwisata" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Pariwisata</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Objek wisata dan potensi ekonomi kreatif di desa</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-2">Wisata Alam</h3>
              <p className="text-sm text-gray-600">{wisataAlam || 'Bukit pandang, sawah terasering, dan jalur trekking yang indah.'}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-2">Kearifan Lokal</h3>
              <p className="text-sm text-gray-600">{kearifanLokal || 'Festival budaya, kerajinan lokal, dan kuliner tradisional.'}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
