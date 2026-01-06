"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase' 
import AdminControlPanel from '@/components/AdminControlPanel'

export default function AdminPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const { data: profil, error } = await supabase
          .from('profil_desa')
          .select('*')
          .single()
        
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-500">Menyiapkan Panel Admin...</p>
      </div>
    </div>
  )
  
  if (!data) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-red-600 font-bold text-2xl mb-2">Akses Terhambat</h1>
      <p className="text-gray-600">Data profil desa belum ada di database. Silakan jalankan script SQL di Supabase.</p>
    </div>
  )

  return <AdminControlPanel initialData={data} />
}