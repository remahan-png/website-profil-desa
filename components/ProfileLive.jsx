import React from "react";
import { Eye, Target, Heart, Lightbulb } from "lucide-react";

const FallbackText = (section) => (
  <div className="text-center p-8 bg-gray-100 rounded-xl">
    <h3 className="text-xl font-semibold text-gray-700">
      Informasi {section} sedang diperbarui
    </h3>
    <p className="text-gray-500 mt-2">Data belum tersedia.</p>
  </div>
);

// Renaming component to Profile and making it a presentational component
export default function Profile({ profil, organisasi }) {
  const profileData =
    Array.isArray(profil) && profil.length > 0 ? profil[0] : {};
  const officials = Array.isArray(organisasi) ? organisasi : [];

  const {
    profilDeskripsi,
    infoGeografis,
    penduduk,
    dusun,
    luasWilayah,
    ketinggian,
    lokasi,
    visi,
    misiItems,
    title = "Tentang Desa",
    subtitle = "Visi, Misi, dan Struktur Organisasi Desa",
  } = profileData;

  const hasProfileContent = !!profilDeskripsi || !!visi || officials.length > 0;

  if (!hasProfileContent) {
    return (
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
          {FallbackText("Profil Desa")}
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="prose prose-lg max-w-none">
                {profilDeskripsi ? (
                  <p className="text-gray-700 leading-relaxed">
                    {profilDeskripsi}
                  </p>
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    Deskripsi profil desa sedang diperbarui.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {penduduk || "N/A"}
                  </div>
                  <div className="text-gray-600">Jumlah Penduduk</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {luasWilayah || "N/A"}
                  </div>
                  <div className="text-gray-600">Luas Wilayah</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {dusun || "N/A"}
                  </div>
                  <div className="text-gray-600">Jumlah Dusun</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {ketinggian || "N/A"}
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
                {infoGeografis ? (
                  <p className="text-gray-700">{infoGeografis}</p>
                ) : (
                  <p className="text-gray-700">
                    Informasi geografis sedang diperbarui.
                  </p>
                )}
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
                  <span className="text-gray-900">
                    {ketinggian ? `${ketinggian} dpl` : "N/A dpl"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Lokasi</span>
                  <span className="text-gray-900">{lokasi || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Visi & Misi */}
      <section id="visi-misi" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Visi & Misi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Arah dan tujuan pembangunan Desa Lendang Belo untuk mencapai
              kemajuan dan kesejahteraan bersama
            </p>
          </div>

          <div className="mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12 shadow-lg">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6">
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    Visi
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    {visi || "Visi sedang diperbarui"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8">
              Misi Kami
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {(
                misiItems || [
                  {
                    title: "Informasi sedang diperbarui",
                    description:
                      "Silakan periksa panel admin untuk memasukkan data misi.",
                  },
                  {
                    title: "Informasi sedang diperbarui",
                    description:
                      "Silakan periksa panel admin untuk memasukkan data misi.",
                  },
                  {
                    title: "Informasi sedang diperbarui",
                    description:
                      "Silakan periksa panel admin untuk memasukkan data misi.",
                  },
                ]
              )
                .slice(0, 3)
                .map((misi, index) => {
                  const Icon = [Target, Heart, Lightbulb][index] || Target;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-lg mb-4">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">
                        {misi.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {misi.description}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      {/* Pemerintah Desa - Organisasi */}
      <section id="organisasi" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Struktur Perangkat Desa
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Informasi detail mengenai struktur organisasi dan perangkat desa
            </p>
          </div>

          {officials.length === 0 ? (
            FallbackText("Struktur Organisasi")
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {officials.map((o, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-lg text-center"
                >
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    {/* Assuming 'image' column is available for organization data as requested */}
                    {o.image ? (
                      <img
                        src={o.image}
                        alt={o.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl">👤</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {o.role}
                  </h3>
                  <p className="text-red-600 font-semibold">{o.name}</p>
                  <p className="text-gray-600 text-sm mt-2">
                    {o.nip || "NIP: N/A"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
