"use client"
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import AdminControlPanel from '../../components/AdminControlPanel'

export default function AdminPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const { data: profil, error } = await supabase.from('profil_desa').select('*').single()
        if (error) throw error
        setData(profil)
      } catch (err) {
        console.error("Gagal memuat data:", err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-20 text-center font-medium">Memuat Dashboard...</div>

  // Jika data profil ditemukan, tampilkan Panel Kontrol yang bisa Anda gunakan untuk update
  if (data) {
    return <AdminControlPanel initialData={data} />
  }

  return (
    <div className="p-20 text-center text-red-600">
      <h1 className="font-bold text-xl">Database Belum Siap</h1>
      <p>Silakan jalankan perintah SQL di Supabase agar data profil muncul.</p>
    </div>
  )
}