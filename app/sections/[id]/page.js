"use client";
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';

export default function SectionPage({ params }) {
  const { id } = params;
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSection = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sections');
      const items = await res.json();
      const found = Array.isArray(items) ? items.find((s) => String(s.id) === String(id)) : null;
      setSection(found || null);
    } catch (e) {
      setSection(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSection();
    function handleStorage(e) {
      if (e.key === 'sectionsSync') fetchSection();
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [id]);

  return (
    <main className="min-h-screen bg-white pt-16">
      <Header />
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {loading ? (
            <div className="py-20 text-center">Memuat...</div>
          ) : !section ? (
            <div className="py-20 text-center">Section tidak ditemukan. <Link href="/admin">Kembali ke admin</Link></div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-6">{section.name}</h1>
              <div className="prose">
                <p>{section.content}</p>
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
