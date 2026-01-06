"use client"
import { useState, useEffect } from 'react'
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
        console.error("Gagal memuat data admin:", err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-20 text-center text-blue-600 font-bold">Membuka Dashboard Admin...</div>
  
  // Jika data profil ditemukan, tampilkan Panel Admin yang asli (tempat Anda bisa update data)
  if (data) {
    return <AdminControlPanel initialData={data} />
  }

  return (
    <div className="p-20 text-center">
      <h1 className="text-red-600 font-bold">Tabel Database Kosong</h1>
      <p>Jalankan SQL di Supabase agar Panel Admin ini bisa menampilkan form update.</p>
    </div>
  )
}