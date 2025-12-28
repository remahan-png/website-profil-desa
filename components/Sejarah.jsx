import React from "react";

const Sejarah = ({ sejarah }) => {
  return (
    <section id="sejarah" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Sejarah Desa
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Perjalanan panjang Desa Lendang Belo dari masa ke masa
          </p>
        </div>
        <div className="prose prose-lg max-w-4xl mx-auto text-center">
            {sejarah ? (
                 <p className="text-gray-700 leading-relaxed">{sejarah}</p>
            ) : (
                <p className="text-gray-700 leading-relaxed">
                    Informasi sejarah desa sedang diperbarui. Silakan periksa kembali nanti.
                </p>
            )}
        </div>
      </div>
    </section>
  );
};

export default Sejarah;