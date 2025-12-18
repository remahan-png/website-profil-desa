import React from "react";
import { Calendar, Users, Award } from "lucide-react";

const Sejarah = () => {
  const activities = [
    {
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      title: "Kegiatan Gotong Royong",
      date: "15 Desember 2024",
      description: "Membersihkan lingkungan desa bersama warga",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop",
      title: "Panen Padi",
      date: "20 November 2024",
      description: "Musim panen padi tahun ini sangat melimpah",
    },
    {
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
      title: "Festival Budaya",
      date: "10 Oktober 2024",
      description: "Pesta rakyat dengan tarian dan musik tradisional",
    },
    {
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
      title: "Pelatihan Pertanian",
      date: "5 September 2024",
      description: "Pelatihan teknologi pertanian modern",
    },
  ];

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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Desa Lendang Belo memiliki sejarah yang kaya dan panjang.
                Didirikan pada tahun 1800-an, desa ini awalnya merupakan
                pemukiman kecil yang dikelilingi oleh perkebunan dan sawah yang
                subur. Nama "Lendang Belo" sendiri berasal dari bahasa daerah
                yang berarti "tanah yang subur dan indah".
              </p>
              <p className="text-gray-700 leading-relaxed">
                Seiring berjalannya waktu, Desa Lendang Belo berkembang menjadi
                salah satu desa terkemuka di kecamatan dengan berbagai potensi
                yang dimiliki. Masyarakat desa yang ramah dan gotong royong yang
                kuat menjadi ciri khas yang membedakan desa ini dari desa
                lainnya.
              </p>
            </div>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {activities.map((activity, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                    {activity.title}
                  </h4>
                  <p className="text-xs text-gray-600">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sejarah;
