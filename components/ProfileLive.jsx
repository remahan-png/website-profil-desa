import React from "react";

// Fungsi pembantu untuk menampilkan pesan jika data kosong
const FallbackText = (section) => (
  <div className="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
    <p className="text-gray-500 italic">
      Data {section} belum tersedia di database.
    </p>
  </div>
);

const ProfileLive = ({ profile, officials = [] }) => {
  // Jika seluruh data profil tidak ada
  if (!profile) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {FallbackText("Profil Desa")}
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white">
      {/* Bagian 1: Tentang Desa / Sejarah */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Tentang Desa</h2>
          {profile.sejarah ? (
            <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
              {profile.sejarah}
            </p>
          ) : (
            FallbackText("Sejarah")
          )}
        </div>
      </section>

      {/* Bagian 2: Visi & Misi */}
      <section className="py-16 bg-gray-50 border-b">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Visi & Misi</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Visi</h3>
              <p className="text-gray-600">{profile.visi || "Belum diatur"}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Misi</h3>
              <p className="text-gray-600 whitespace-pre-line">
                {profile.misi || "Belum diatur"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian 3: Pemerintah Desa (Organisasi) */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Pemerintah Desa</h2>
          {officials && officials.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {officials.map((person, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md border"
                >
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-400 text-3xl">👤</span>
                  </div>
                  <h4 className="text-xl font-bold">{person.nama}</h4>
                  <p className="text-blue-600 font-medium">{person.jabatan}</p>
                </div>
              ))}
            </div>
          ) : (
            FallbackText("Pemerintah Desa")
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfileLive;
