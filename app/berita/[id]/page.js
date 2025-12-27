import Link from 'next/link';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { supabase } from '../../../lib/supabase';

export const dynamic = "force-dynamic";

export default async function BeritaDetailPage({ params }) {
  const { id } = params;

  const { data: newsItem, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single();

  if (error) console.error("Error fetching news item:", error);

  if (!newsItem) {
    return (
      <main className="min-h-screen bg-gray-50 pt-16">
        <Header />
        <div className="max-w-4xl mx-auto py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Berita Tidak Ditemukan</h1>
          <p className="mt-4 text-gray-600">ID: {id}</p>
          <Link href="/berita" className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
            Kembali ke Daftar Berita
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Variabel penampung dataBerita
  const dataBerita = newsItem;
  const formattedDate = new Date(dataBerita.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const category = dataBerita.category || "Umum";

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Header />
      <article className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <Link href="/berita" className="text-red-600 hover:text-red-800">
            Berita Desa
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-500">{dataBerita.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            {category}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {dataBerita.title}
          </h1>
          <p className="text-gray-500 text-sm">
            Diposting pada <time dateTime={dataBerita.created_at}>{formattedDate}</time>
          </p>
        </header>

        {/* Featured Image */}
        {dataBerita.image && (
          <div className="relative w-full h-96 mb-10 rounded-xl overflow-hidden shadow-xl">
            <Image
              src={dataBerita.image}
              alt={dataBerita.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <p>{dataBerita.content}</p>
        </div>
      </article>
      <Footer />
    </main>
  );
}
