"use client"
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminBeranda() {
  const [desa, setDesa] = useState(null)

  useEffect(() => {
    async function ambilData() {
      const { data } = await supabase.from('profil_desa').select('nama_desa').single()
      setDesa(data)
    }
    ambilData()
  }, [])

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Panel Admin Desa Lendang Belo</h1>
      <p>Koneksi Database: {desa ? '✅ Tersambung' : '❌ Belum Ada Data'}</p>
      <a href="/">Kembali ke Halaman Utama</a>
    </div>
  )
}