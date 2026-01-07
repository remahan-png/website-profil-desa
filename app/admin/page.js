"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import AdminControlPanel from "../../components/AdminControlPanel";

export default function AdminPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: profil, error } = await supabase
          .from("profil_desa")
          .select("*")
          .single();
        if (error) throw error;
        setData(profil);
      } catch (err) {
        console.error("Gagal memuat data:", err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading)
    return <div className="p-20 text-center">Memuat Panel Admin...</div>;
  if (!data)
    return (
      <div className="p-20 text-center text-red-600 font-bold">
        Data Database Kosong. Jalankan SQL di Supabase!
      </div>
    );

  return <AdminControlPanel initialData={data} />;
}
