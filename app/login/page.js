"use client"
import { useState } from 'react'
// Pastikan path ini benar-benar mengarah ke file supabase Anda
import { supabase } from '../../lib/supabase' 

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert("Gagal Masuk: " + error.message)
    } else {
      window.location.href = '/admin'
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login Admin</h1>
        <div className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200">Masuk</button>
        </div>
      </form>
    </div>
  )
}