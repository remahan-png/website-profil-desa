import React from "react";
import { Users, Map, Home, TreePine } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: "2,450",
      label: "Jumlah Penduduk",
      color: "text-blue-600",
    },
    {
      icon: Map,
      value: "850 Ha",
      label: "Luas Wilayah",
      color: "text-green-600",
    },
    {
      icon: Home,
      value: "8",
      label: "Dusun",
      color: "text-purple-600",
    },
    {
      icon: TreePine,
      value: "Pertanian",
      label: "Potensi Alam",
      color: "text-orange-600",
    },
  ];

  return (
    <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-xl mb-4 group-hover:bg-red-50 transition-colors duration-300">
                    <IconComponent
                      className={`w-8 h-8 ${stat.color} group-hover:text-red-600 transition-colors duration-300`}
                    />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
