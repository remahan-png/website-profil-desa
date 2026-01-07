"use client"
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import AdminControlPanel from '../../components/AdminControlPanel'

export default function AdminPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkData() {
      const { data: profil } = await supabase.from('profil_desa').select('*').single()
      setData(profil)
      setLoading(false)
    }
    checkData()
  }, [])

  if (loading) return <div className="p-20 text-center">Memvalidasi Dashboard...</div>
  if (!data) return <div className="p-20 text-center text-red-600">Data Database Kosong. Jalankan SQL Supabase!</div>

  return <AdminControlPanel initialData={data} />
}