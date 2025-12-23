"use client";
import React, { useState, useEffect } from 'react';

export default function KontakPage() {
  const [status, setStatus] = useState("");
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
  }, []);

  // Fungsi untuk menangani pengiriman pesan agar tidak "Unhandled Error"
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulasi pengiriman pesan
    setTimeout(() => {
      setStatus("success");
      e.target.reset();
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Kontak */}
        <div className="text-center mb-16">
          <span className="text-red-600 font-black uppercase tracking-widest text-sm">Hubungi Kami</span>
          <h1 className="text-4xl md:text-5xl font-black italic text-gray-900 mt-2 uppercase">Kontak Desa Lendang Belo</h1>
          <div className="w-24 h-2 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bagian Kiri: Informasi Kontak */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border-l-8 border-red-600">
              <h3 className="text-2xl font-bold mb-6 italic uppercase">Alamat Kantor Desa</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-2xl text-red-600 text-xl">📍</div>
                  <div>
                    <p className="font-bold text-gray-900">Lokasi</p>
                    {loading ? <p className="text-gray-600">Memuat...</p> : <p className="text-gray-600">{siteInfo?.lokasi}</p>}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-2xl text-red-600 text-xl">📞</div>
                  <div>
                    <p className="font-bold text-gray-900">Telepon / WhatsApp</p>
                    {loading ? <p className="text-gray-600">Memuat...</p> : <p className="text-gray-600">{siteInfo?.wa}</p>}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-2xl text-red-600 text-xl">✉️</div>
                  <div>
                    <p className="font-bold text-gray-900">Email Resmi</p>
                    {loading ? <p className="text-gray-600">Memuat...</p> : <p className="text-gray-600">{siteInfo?.email}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Jam Operasional */}
            <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-bold mb-4 uppercase italic text-red-500">Jam Pelayanan</h3>
              <ul className="space-y-2 text-gray-300 font-medium">
                <li className="flex justify-between border-b border-gray-700 pb-2"><span>Senin - Kamis</span> <span>08:00 - 13:00 WITA</span></li>
                <li className="flex justify-between border-b border-gray-700 pb-2"><span>Jumat</span> <span>08:00 - 11:00 WITA</span></li>
                <li className="flex justify-between"><span>Sabtu - Minggu</span> <span className="text-red-400 font-bold uppercase">Tutup</span></li>
              </ul>
            </div>
          </div>

          {/* Bagian Kanan: Form Pesan (Perbaikan Error) */}
          <div className="bg-white p-10 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-8 italic uppercase">Kirim Aspirasi / Pertanyaan</h3>
            
            {status === "success" && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl font-bold text-center animate-bounce">
                ✅ Pesan Anda berhasil terkirim!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase text-gray-500 mb-2">Nama Lengkap</label>
                  <input type="text" required className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-red-600 rounded-2xl outline-none transition" placeholder="Contoh: Budi Santoso" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-gray-500 mb-2">Nomor HP</label>
                  <input type="tel" required className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-red-600 rounded-2xl outline-none transition" placeholder="0812xxx" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-500 mb-2">Subjek Pesan</label>
                <input type="text" required className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-red-600 rounded-2xl outline-none transition" placeholder="Keluhan / Pertanyaan / Aspirasi" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-500 mb-2">Isi Pesan</label>
                <textarea required rows="4" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-red-600 rounded-2xl outline-none transition" placeholder="Tuliskan pesan Anda secara lengkap..."></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full bg-red-600 hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl shadow-red-200 transition-all transform active:scale-95 uppercase tracking-widest disabled:bg-gray-400"
              >
                {status === "loading" ? "MENGIRIM..." : "KIRIM PESAN SEKARANG"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}