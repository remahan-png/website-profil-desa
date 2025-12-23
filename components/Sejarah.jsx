"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Users, Award } from "lucide-react";

const Sejarah = () => {
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

  const activities = siteInfo?.sejarahMilestones || [];
  const description = siteInfo?.sejarahDeskripsi || "";

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
              {loading ? (
                <div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              ) : (
                description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))
              )}
            </div>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden mb-3 animate-pulse"></div>
                  <div className="text-center">
                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : (
              activities.map((activity, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={activity.image || "https://via.placeholder.com/400x400?text=Sejarah"}
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
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sejarah;

