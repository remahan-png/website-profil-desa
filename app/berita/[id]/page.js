"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function NewsDetail() {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch("/api/news");
        const allNews = await response.json();
        const newsItem = allNews.find(
          (item) => item.id === parseInt(params.id)
        );

        if (newsItem) {
          setNews(newsItem);
        } else {
          setError("Berita tidak ditemukan");
        }
      } catch (err) {
        console.error("Error loading news:", err);
        setError("Gagal memuat berita");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadNews();
    }
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !news) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Berita Tidak Ditemukan
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Maaf, berita yang Anda cari tidak tersedia.
            </p>
            <Link
              href="/berita"
              className="inline-block bg-white text-red-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Kembali ke Berita
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-32"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${
            news.image || "https://via.placeholder.com/1200x400?text=Berita"
          }")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="mb-4">
            <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {news.category || "Berita"}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {news.title}
          </h1>
          <div className="flex items-center justify-center space-x-6 text-lg opacity-90">
            <span>{news.date}</span>
            <span>•</span>
            <span>{news.readTime || "3 menit"}</span>
            <span>•</span>
            <span>{news.author || "Admin Desa"}</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Beranda
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/berita"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Berita
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{news.title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed mb-8 first-letter:text-6xl first-letter:font-bold first-letter:text-red-600 first-letter:mr-2 first-letter:float-left">
                  {news.content}
                </p>
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Bagikan Berita Ini
                </h3>
                <div className="flex space-x-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Facebook
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    WhatsApp
                  </button>
                  <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
