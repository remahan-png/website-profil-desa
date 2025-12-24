import React from 'react';

const FallbackText = (type) => (
  <p className="text-sm text-gray-600">
    Informasi {type} sedang diperbarui.
  </p>
);

// Renaming component to Potensi and making it a presentational component
export default function Potensi({ potensi }) {
  const data = Array.isArray(potensi) && potensi.length > 0 ? potensi[0] : {};
  const { 
    jalanJembatan, 
    airBersih, 
    listrikTelekom, 
    wisataAlam, 
    kearifanLokal, 
    title: potensiTitle = "Potensi Desa",
    subtitle: potensiSubtitle = "Potensi ekonomi, infrastruktur, dan pariwisata desa",
  } = data;

  const infrastructureItems = [
    { title: 'Jalan & Jembatan', description: jalanJembatan, fallback: 'Paving jalan utama, akses ke dusun, dan perbaikan jembatan kecil.' },
    { title: 'Air Bersih', description: airBersih, fallback: 'Sumur bersama dan jaringan air bersih untuk beberapa RT.' },
    { title: 'Listrik & Telekomunikasi', description: listrikTelekom, fallback: 'Layanan listrik tersedia, jaringan seluler dan akses internet meningkat.' },
  ];

  const tourismItems = [
    { title: 'Wisata Alam', description: wisataAlam, fallback: 'Bukit pandang, sawah terasering, dan jalur trekking yang indah.' },
    { title: 'Kearifan Lokal', description: kearifanLokal, fallback: 'Festival budaya, kerajinan lokal, dan kuliner tradisional.' },
  ];

  const hasContent = !!jalanJembatan || !!airBersih || !!listrikTelekom || !!wisataAlam || !!kearifanLokal;

  return (
    <>
      <section id="potensi-desa" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{potensiTitle}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{potensiSubtitle}</p>
          </div>

          {!hasContent ? (
            <div className="text-center p-10 bg-gray-100 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-700">Informasi sedang diperbarui</h3>
              <p className="text-gray-500 mt-2">Data potensi desa belum tersedia.</p>
            </div>
          ) : (
            <>
              {/* Infrastruktur Section */}
              <div id="infrastruktur" className="mb-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-red-600 pl-4">Infrastruktur</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {infrastructureItems.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow">
                      <h4 className="font-semibold text-xl mb-2">{item.title}</h4>
                      {item.description ? (
                        <p className="text-sm text-gray-600">{item.description}</p>
                      ) : (
                        FallbackText(item.title)
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pariwisata Section */}
              <div id="pariwisata">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-red-600 pl-4">Pariwisata & Kearifan Lokal</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {tourismItems.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow">
                      <h4 className="font-semibold text-xl mb-2">{item.title}</h4>
                      {item.description ? (
                        <p className="text-sm text-gray-600">{item.description}</p>
                      ) : (
                        FallbackText(item.title)
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

