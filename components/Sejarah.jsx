import React from "react";
import { Calendar, Users, Award } from "lucide-react";

const FallbackText = () => (
    <p className="text-gray-700 leading-relaxed">
        Informasi sejarah desa sedang diperbarui. Silakan periksa kembali nanti.
    </p>
);

const Sejarah = ({ sejarah }) => {
  const description = sejarah?.description || "";
  const activities = Array.isArray(sejarah?.milestones) ? sejarah.milestones : [];
  const hasContent = description.trim() || activities.length > 0;

  if (!hasContent) {
    return (
        <section id="sejarah" className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Sejarah Desa
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Informasi sedang diperbarui
                    </p>
                </div>
                <div className="text-center">
                    <FallbackText />
                </div>
            </div>
        </section>
    )
  }

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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              {description ? (
                description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))
              ) : (
                <FallbackText />
              )}
            </div>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                    <img
                      // The image column is now expected to be named 'image'
                      src={activity.image || "/path/to/fallback/image.jpg"}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      {activity.title || "Momen Sejarah"}
                    </h4>
                    <p className="text-xs text-gray-600">{activity.date || "Tanggal tidak diketahui"}</p>
                  </div>
                </div>
              ))
            ) : (
                <div className="lg:col-span-2 text-center p-8 bg-white rounded-xl shadow">
                    <p className="text-gray-600">Dokumentasi sejarah sedang diupdate.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sejarah;


