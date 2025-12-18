import React from "react";
import { Eye, Target, Heart, Lightbulb } from "lucide-react";

const VisiMisi = () => {
  const visi = {
    title: "Visi",
    description:
      "Menjadi desa yang maju, mandiri, dan berbudaya dengan masyarakat yang sejahtera dan harmonis",
    icon: Eye,
    color: "text-blue-600",
  };

  const misiItems = [
    {
      icon: Target,
      title: "Pengembangan Ekonomi",
      description:
        "Meningkatkan perekonomian masyarakat melalui pengembangan sektor pertanian, pariwisata, dan UMKM",
      color: "text-green-600",
    },
    {
      icon: Heart,
      title: "Kesejahteraan Sosial",
      description:
        "Meningkatkan kualitas hidup masyarakat melalui program kesehatan, pendidikan, dan sosial",
      color: "text-red-600",
    },
    {
      icon: Lightbulb,
      title: "Inovasi dan Teknologi",
      description:
        "Mengadopsi teknologi modern untuk meningkatkan efisiensi pelayanan dan produktivitas masyarakat",
      color: "text-purple-600",
    },
  ];

  return (
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

        {/* Visi */}
        <div className="mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12 shadow-lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6">
                  <visi.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {visi.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  {visi.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Misi */}
        <div>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8">
            Misi Kami
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {misiItems.map((misi, index) => {
              const IconComponent = misi.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-lg mb-4">
                    <IconComponent className={`w-6 h-6 ${misi.color}`} />
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
  );
};

export default VisiMisi;
