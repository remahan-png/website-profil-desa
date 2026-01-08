"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import AdminControlPanel from '../../components/AdminControlPanel';

export default function AdminPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { data: profil } = await supabase.from('profil_desa').select('*').single();
        setData(profil);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div>Memuat...</div>;
  return <AdminControlPanel data={data} />;
}
