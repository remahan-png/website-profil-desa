"use client"
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import AdminControlPanel from '../../components/AdminControlPanel.jsx'

export default function AdminPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      // Mengambil data profil desa untuk memastikan koneksi database aman
      const { data: profil, error } = await supabase.from('profil_desa').select('*').single()
      if (error) {
        console.error("Gagal memuat data:", error.message)
      }
      setData(profil)
      setLoading(false)
    }
    loadData()
  }, [])

  // Tampilan saat menunggu data dari Supabase
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Membuka Panel Kendali...</p>
      </div>
    </div>
  )
  
  // Jika database profil_desa kosong, tampilkan ini (Bukan error putih)
  if (!data) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="bg-red-50 p-8 rounded-2xl border border-red-200 shadow-sm">
        <h1 className="text-2xl font-bold text-red-700 mb-2">Data Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-6">Tabel 'profil_desa' di Supabase mungkin kosong atau kolom 'nama_desa' belum ada.</p>
        <button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
          Segarkan Halaman
        </button>
      </div>
    </div>
  )

  // Jika data ada, tampilkan komponen Admin yang asli
  return <AdminControlPanel initialData={data} />
}