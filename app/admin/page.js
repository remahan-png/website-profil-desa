"use client"
import { useState, useEffect } from 'react'
// Menggunakan jalur manual agar Vercel tidak bingung lagi
import { supabase } from '../../lib/supabase' 
import AdminControlPanel from '../../components/AdminControlPanel'

export default function AdminPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const { data: profil, error } = await supabase.from('profil_desa').select('*').single()
        if (error) console.error("Database belum siap:", error.message)
        setData(profil)
      } catch (err) {
        console.error("System Error:", err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-20 text-center">Menyambungkan ke Server...</div>

  // Jika data profil belum ada di Supabase, admin tetap bisa masuk tapi melihat pesan ini
  if (!data) return (
    <div className="p-20 text-center">
      <h1 className="text-xl font-bold">Data Profil Desa Kosong</h1>
      <p>Silakan jalankan SQL ALTER TABLE di Supabase agar kolom 'nama_desa' muncul.</p>
    </div>
  )

  return <AdminControlPanel initialData={data} />
}