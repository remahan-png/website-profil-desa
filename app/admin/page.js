"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import AdminControlPanel from "../../components/AdminControlPanel";

export default function AdminPage() {
  const [allData, setAllData] = useState({
    profil: null,
    berita: [],
    galeri: [],
    perangkat: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllData() {
      try {
        // Mengambil data dari 4 tabel sekaligus
        const [profilRes, beritaRes, galeriRes, perangkatRes] =
          await Promise.all([
            supabase.from("profil_desa").select("*").single(),
            supabase
              .from("berita")
              .select("*")
              .order("tanggal", { ascending: false }),
            supabase.from("galeri").select("*"),
            supabase.from("perangkat_desa").select("*"),
          ]);

        setAllData({
          profil: profilRes.data,
          berita: beritaRes.data || [],
          galeri: galeriRes.data || [],
          perangkat: perangkatRes.data || [],
        });
      } catch (err) {
        console.error("Gagal mengambil data lengkap:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, []);

  if (loading)
    return (
      <div className="p-20 text-center font-bold text-blue-600">
        Menghubungkan ke Seluruh Database...
      </div>
    );

  // Mengirim semua data ke komponen Panel Utama
  return <AdminControlPanel data={allData} />;
}
