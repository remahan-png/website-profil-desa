"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { Calendar, User, ArrowRight, Search } from "lucide-react";

export default function Berita() {
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function getNews() {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/news`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await res.json();
        setNewsData(data);
        setFilteredNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNewsData([]);
        setFilteredNews([]);
      } finally {
        setLoading(false);
      }
    }
    getNews();
  }, []);

  useEffect(() => {
    const results = newsData.filter(news =>
      (news.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (news.excerpt?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (news.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
    setFilteredNews(results);
  }, [searchTerm, newsData]);

  const featuredNews = filteredNews.length > 0 ? filteredNews[0] : null;
  const otherNews = filteredNews.length > 1 ? filteredNews.slice(1) : [];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Berita Desa</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Informasi terkini tentang kegiatan dan perkembangan Desa Lendang
            Belo
          </p>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            {/* Filter buttons are not implemented yet */}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
             <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                <p className="mt-4 text-gray-500">Memuat berita...</p>
              </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm ? `Tidak ada berita yang cocok dengan "${searchTerm}".` : "Belum ada berita yang tersedia."}
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {featuredNews && (
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden mb-6">
                      <img
                        src={
                          featuredNews.image ||
                          "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop"
                        }
                        alt={featuredNews.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <span className="inline-block bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                      {featuredNews.category}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      {featuredNews.title}
                    </h2>
                    <p className="text-gray-600 text-lg mb-6">
                      {featuredNews.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-6 space-x-6">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{featuredNews.date}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>{featuredNews.author}</span>
                      </div>
                      <span>{featuredNews.readTime}</span>
                    </div>
                    <Link
                      href={`/berita/${featuredNews.id}`}
                      className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </div>
                </div>
              )}

              {otherNews.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherNews.map((item) => (
                    <article
                      key={item.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                    >
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img
                          src={
                            item.image ||
                            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop"
                          }
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-6">
                        <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                          {item.category}
                        </span>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {item.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{item.date}</span>
                          </div>
                          <Link
                            href={`/berita/${item.id}`}
                            className="text-red-600 font-semibold hover:text-red-700 transition-colors duration-200"
                          >
                            Baca
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
