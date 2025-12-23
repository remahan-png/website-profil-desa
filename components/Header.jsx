"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menu, setMenu] = useState([]);
  const [profilHref, setProfilHref] = useState('#profil');

  useEffect(() => {
    fetch('/api/menu')
      .then((r) => r.json())
        .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setMenu(list);
        const found = list.find((m) => m.label && String(m.label).toLowerCase().includes('profil'));
        if (found && found.href) {
          const resolved = String(found.href).startsWith('#') ? '/profil' : found.href;
          setProfilHref(resolved);
        }
      })
      .catch((_) => setMenu([]));
    function handleStorage(e){
      if(e.key === 'menuSync'){
        fetch('/api/menu').then(r=>r.json()).then(d=>{
          const list = Array.isArray(d)?d:[];
          setMenu(list);
          const found = list.find((m) => m.label && String(m.label).toLowerCase().includes('profil'));
          if (found && found.href) {
            const resolved = String(found.href).startsWith('#') ? '/profil' : found.href;
            setProfilHref(resolved);
          }
        }).catch(()=>{});
      }
    }
    window.addEventListener('storage', handleStorage);
    return ()=> window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-[100] px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img src="pemda.jpg" alt="Logo Desa" className="h-10 w-10" />
        <h1 className="font-black text-lg italic tracking-tighter">LENDANG BELO</h1>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        {menu && menu.length > 0 ? (
            menu.map((m) => {
              const isProfil = m.label && String(m.label).toLowerCase().includes('profil');
              const raw = isProfil ? profilHref : m.href;
              const hrefResolved = raw && String(raw).startsWith('#') ? '/' + String(raw) : raw;
              if (String(hrefResolved).startsWith('http')) {
                return (
                  <a key={m.id} href={hrefResolved} className="text-sm font-bold uppercase hover:text-red-600 transition" target="_blank" rel="noopener noreferrer">{m.label}</a>
                );
              }
              return (
                <Link key={m.id} href={hrefResolved || '/'} className="text-sm font-bold uppercase hover:text-red-600 transition">{m.label}</Link>
              );
            })
          ) : (
            <>
              <Link href="/#beranda" className="text-sm font-bold uppercase hover:text-red-600 transition">Beranda</Link>
              <Link href={profilHref} className="text-sm font-bold uppercase hover:text-red-600 transition">Profil Desa</Link>
              <Link href="/#statistik" className="text-sm font-bold uppercase hover:text-red-600 transition">Statistik</Link>
              <Link href="/#berita" className="text-sm font-bold uppercase hover:text-red-600 transition">Berita</Link>
              <Link href="/#galeri" className="text-sm font-bold uppercase hover:text-red-600 transition">Galeri</Link>
              <Link href="/#kontak" className="text-sm font-bold uppercase hover:text-red-600 transition">Kontak</Link>
            </>
          )}

        <Link href="/admin" className="bg-[#414b62] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-red-600 transition">
          Panel Admin
        </Link>
      </div>
    </nav>
  );
}