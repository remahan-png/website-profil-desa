"use client";
import React, { useState, useEffect } from 'react';
import { Eye, Target, Heart, Lightbulb } from 'lucide-react';

export default function ProfileLive() {
  const [site, setSite] = useState({});

  async function fetchSite() {
    try {
      const res = await fetch('/api/site');
      if (res.ok) {
        const data = await res.json();
        setSite(data || {});
      }
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => {
    fetchSite();
    function onStorage(e) {
      if (!e.key) return;
      if (e.key === 'siteSync') fetchSite();
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const {
    profilDeskripsi,
    infoGeografis,
    penduduk,
    dusun,
    luasWilayah,
    ketinggian,
    lokasi,
  } = site || {};

  const { visi, misiItems, officials } = site || {};

  return (
    <>
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Tentang Desa</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Desa Lendang Belo terletak di Kecamatan Montong Gading, Kabupaten Lombok Timur, Provinsi Nusa Tenggara Barat</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              {profilDeskripsi ? (
                <p className="text-gray-700 leading-relaxed">{profilDeskripsi}</p>
              ) : (
                <>
                  <p className="text-gray-700 leading-relaxed">Desa Lendang Belo merupakan salah satu desa di Kecamatan Montong Gading yang memiliki potensi besar dalam bidang pertanian, pariwisata, dan kerajinan tangan.</p>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-red-600 mb-2">{penduduk || '2,450'}</div>
                <div className="text-gray-600">Jumlah Penduduk</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-red-600 mb-2">{luasWilayah || '850 Ha'}</div>
                <div className="text-gray-600">Luas Wilayah</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-red-600 mb-2">{dusun || '8'}</div>
                <div className="text-gray-600">Jumlah Dusun</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-red-600 mb-2">{ketinggian || '1,850 m'}</div>
                <div className="text-gray-600">Ketinggian</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi Geografis</h3>
            <div className="space-y-4">
              {infoGeografis ? <p className="text-gray-700">{infoGeografis}</p> : null}
              <div className="flex justify-between items-center py-2 border-b border-gray-200"><span className="font-medium text-gray-700">Kecamatan</span><span className="text-gray-900">Montong Gading</span></div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200"><span className="font-medium text-gray-700">Kabupaten</span><span className="text-gray-900">Lombok Timur</span></div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200"><span className="font-medium text-gray-700">Provinsi</span><span className="text-gray-900">Nusa Tenggara Barat</span></div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200"><span className="font-medium text-gray-700">Kode Pos</span><span className="text-gray-900">83663</span></div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200"><span className="font-medium text-gray-700">Ketinggian</span><span className="text-gray-900">{ketinggian ? `${ketinggian} dpl` : '1,850 m dpl'}</span></div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200"><span className="font-medium text-gray-700">Lokasi</span><span className="text-gray-900">{lokasi || 'Jl. Utama Desa Lendang Belo...'}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Visi & Misi */}
    <section id="visi-misi" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Visi & Misi</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Arah dan tujuan pembangunan Desa Lendang Belo untuk mencapai kemajuan dan kesejahteraan bersama</p>
        </div>

        <div className="mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12 shadow-lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Visi</h3>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">{visi || 'Menjadi desa yang maju, mandiri, dan berbudaya dengan masyarakat yang sejahtera dan harmonis'}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8">Misi Kami</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {(misiItems || [
              { title: 'Pengembangan Ekonomi', description: 'Meningkatkan perekonomian masyarakat melalui pengembangan sektor pertanian, pariwisata, dan UMKM' },
              { title: 'Kesejahteraan Sosial', description: 'Meningkatkan kualitas hidup masyarakat melalui program kesehatan, pendidikan, dan sosial' },
              { title: 'Inovasi dan Teknologi', description: 'Mengadopsi teknologi modern untuk meningkatkan efisiensi pelayanan dan produktivitas masyarakat' }
            ]).map((misi, index) => {
              const Icon = [Target, Heart, Lightbulb][index] || Target;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{misi.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{misi.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    {/* Pemerintah Desa */}
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Pemerintah Desa</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Struktur organisasi pemerintah Desa Lendang Belo</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(officials || [
            { role: 'Kepala Desa', name: 'H. Ahmad Yani, S.Pd', nip: '19751231 199803 1 001' },
            { role: 'Sekretaris Desa', name: 'Hj. Siti Aminah', nip: '19800515 200604 2 002' },
            { role: 'Bendahara Desa', name: 'Ahmad Sudirman', nip: '19821020 200801 1 003' }
          ]).map((o, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{o.role}</h3>
              <p className="text-red-600 font-semibold">{o.name}</p>
              <p className="text-gray-600 text-sm mt-2">{o.nip}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
