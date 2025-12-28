"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabaseClient } from "../../lib/supabaseClient"; // Import Supabase Client

export default function Admin() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profil');

  // State lengkap untuk semua bagian Beranda, disinkronkan dengan kolom Supabase baru
  const [formData, setFormData] = useState({
    profilDeskripsi: "Desa Lendang Belo adalah...",
    infoGeografis: "Terletak di dataran tinggi, berdampingan dengan sungai dan perbukitan.",
    visi: "Menjadi desa yang maju, mandiri, dan berbudaya dengan masyarakat yang sejahtera dan harmonis",
    sejarah: "Sejarah desa dimulai pada tahun...",
    misiItems: [
      { title: 'Pengembangan Ekonomi', description: 'Meningkatkan perekonomian masyarakat melalui pengembangan sektor pertanian, pariwisata, dan UMKM' },
      { title: 'Kesejahteraan Sosial', description: 'Meningkatkan kualitas hidup masyarakat melalui program kesehatan, pendidikan, dan sosial' },
      { title: 'Inovasi dan Teknologi', description: 'Mengadopsi teknologi modern untuk meningkatkan efisiensi pelayanan dan produktivitas masyarakat' }
    ],
    penduduk: "2.500",
    dusun: "5",
    luasWilayah: "12 km2",
    ketinggian: "350 m",
    kepala_keluarga: "750", // Diubah dari kk
    pertanian: "85%",
    beritaUtama: "Kegiatan Gotong Royong Desa",
    galeriLink: "",
    alamat: "Jl. Utama Desa Lendang Belo...", // Diubah dari lokasi
    whatsapp: "+62 812-3456-7890", // Diubah dari wa
    email: "info@lendangbelo.desa.id",
    // Menambahkan hero_image untuk konsistensi
    hero_image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1920&h=1080&fit=crop"
  });

  // New states for menu, projects, sections, gallery, news, sejarah
  const [menuItems, setMenuItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [sections, setSections] = useState([]);
  
  // GALLERY management state
  const [galleryItems, setGalleryItems] = useState([]);
  const [newGalleryFile, setNewGalleryFile] = useState(null);
  const [newGalleryCaption, setNewGalleryCaption] = useState('');
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [editGalleryCaption, setEditGalleryCaption] = useState('');
  const [editGalleryFile, setEditGalleryFile] = useState(null);
  
  // NEWS management state
  const [newsItems, setNewsItems] = useState([]);
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsExcerpt, setNewNewsExcerpt] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');
  const [newNewsImage, setNewNewsImage] = useState('');
  const [newNewsFile, setNewNewsFile] = useState(null);
  const [newNewsAuthor, setNewNewsAuthor] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState('');
  const [newNewsDate, setNewNewsDate] = useState('');
  const [newNewsReadTime, setNewNewsReadTime] = useState('');
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [editNewsTitle, setEditNewsTitle] = useState('');
  const [editNewsExcerpt, setEditNewsExcerpt] = useState('');
  const [editNewsContent, setEditNewsContent] = useState('');
  const [editNewsImage, setEditNewsImage] = useState('');
  const [editNewsFile, setEditNewsFile] = useState(null);
  const [editNewsAuthor, setEditNewsAuthor] = useState('');
  const [editNewsCategory, setEditNewsCategory] = useState('');
  const [editNewsDate, setEditNewsDate] = useState('');
  const [editNewsReadTime, setEditNewsReadTime] = useState('');
  
  // SEJARAH management state
  const [editingMilestoneId, setEditingMilestoneId] = useState(null);
  const [editMilestoneTitle, setEditMilestoneTitle] = useState('');
  const [editMilestoneDate, setEditMilestoneDate] = useState('');
  const [editMilestoneDescription, setEditMilestoneDescription] = useState('');
  const [editMilestoneImage, setEditMilestoneImage] = useState('');
  const [editMilestoneFile, setEditMilestoneFile] = useState(null);
  
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');
  const [newMilestoneDescription, setNewMilestoneDescription] = useState('');
  const [newMilestoneFile, setNewMilestoneFile] = useState(null);
  
  const [newHeroBgFile, setNewHeroBgFile] = useState(null);


  useEffect(() => {
    // load saved form data from server
    fetch('/api/site')
      .then((r) => r.json())
      .then((data) => {
        // Pemetaan data yang masuk dari API ke kolom baru
        const mappedData = {
          ...data,
          kepala_keluarga: data.kepala_keluarga || data.kk, // Handle kolom lama/baru
          whatsapp: data.whatsapp || data.wa,
          alamat: data.alamat || data.lokasi,
          sejarah: data.sejarah || data.sejarahDeskripsi || formData.sejarah,
          hero_image: data.hero_image || formData.hero_image,
        };
        
        if (data && Object.keys(data).length) setFormData((prev) => ({ ...prev, ...mappedData }));
      })
      .catch((err) => console.error('Failed to load site data', err));
      
    // fetch dynamic data
    fetch('/api/menu').then(r=>r.json()).then(d=>setMenuItems(Array.isArray(d)?d:[])).catch(()=>{});
    fetch('/api/projects').then(r=>r.json()).then(d=>setProjects(Array.isArray(d)?d:[])).catch(()=>{});
    fetch('/api/sections').then(r=>r.json()).then(d=>setSections(Array.isArray(d)?d:[])).catch(()=>{});
    fetch('/api/news').then(r=>r.json()).then(d=>setNewsItems(Array.isArray(d)?d:[])).catch(()=>{});
    fetch('/api/gallery').then(r=>r.json()).then(d=>setGalleryItems(Array.isArray(d)?d:[])).catch(()=>{});

    // listen to storage events from other tabs (sync)
    function handleStorage(e) {
      if (!e.key) return;
      if (e.key === 'sectionsSync') {
        fetch('/api/sections').then(r=>r.json()).then(d=>setSections(Array.isArray(d)?d:[])).catch(()=>{});
      }
      if (e.key === 'menuSync') {
        fetch('/api/menu').then(r=>r.json()).then(d=>setMenuItems(Array.isArray(d)?d:[])).catch(()=>{});
      }
      if (e.key === 'projectsSync') {
        fetch('/api/projects').then(r=>r.json()).then(d=>setProjects(Array.isArray(d)?d:[])).catch(()=>{});
      }
      if (e.key === 'newsSync') {
        fetch('/api/news').then(r=>r.json()).then(d=>setNewsItems(Array.isArray(d)?d:[])).catch(()=>{});
      }
      if (e.key === 'gallerySync') {
        fetch('/api/gallery').then(r=>r.json()).then(d=>setGalleryItems(Array.isArray(d)?d:[])).catch(()=>{});
      }
      if (e.key === 'siteSync') {
        fetch('/api/site').then(r=>r.json()).then(d=>{ 
          const mappedData = {
            ...d,
            kepala_keluarga: d.kepala_keluarga || d.kk,
            whatsapp: d.whatsapp || d.wa,
            alamat: d.alamat || d.lokasi,
            sejarah: d.sejarah || d.sejarahDeskripsi || formData.sejarah,
            hero_image: d.hero_image || formData.hero_image,
          };
          if (d && Object.keys(d).length) setFormData((prev) => ({ ...prev, ...mappedData })); 
        }).catch(()=>{});
      }
    }

    window.addEventListener('storage', handleStorage);
    return ()=> window.removeEventListener('storage', handleStorage);
  }, []); // Dependensi dikosongkan agar hanya berjalan sekali saat mount

  const handleUpdate = async () => {
    let updatedFormData = { ...formData };

    if (newHeroBgFile) {
      try {
        const fd = new FormData();
        fd.append('file', newHeroBgFile);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: fd });
        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          updatedFormData.hero_image = url; // Menggunakan hero_image
          setNewHeroBgFile(null); // Clear the file input
        } else {
          alert('Gagal mengunggah gambar background.');
          return; // Stop the update if upload fails
        }
      } catch (error) {
        console.error('Error uploading hero background:', error);
        alert('Terjadi kesalahan saat mengunggah gambar.');
        return;
      }
    }

    // send updated data to server
    fetch('/api/site', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedFormData) })
      .then((r) => r.json())
      .then((data) => {
        setFormData(data); // Update local state with the final saved data
        try{localStorage.setItem('siteSync', Date.now().toString());}catch(e){}
        alert(`Data ${activeTab} Berhasil diperbarui dan sudah konek ke Beranda!`);
      })
      .catch(() => alert('Gagal menyimpan data ke server'));
  };
  
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
      alert("Gagal keluar. Coba lagi.");
    } else {
      router.push('/login');
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">
      {/* SIDEBAR - SEMUA MENU ADA DI SINI */}
      <aside className="w-80 bg-[#111C44] p-8 text-white flex flex-col h-screen sticky top-0">
        <h2 className="text-xl font-black italic text-red-600 mb-10 uppercase">Panel Kontrol</h2>
        <nav className="flex-1 space-y-2 text-[10px] font-black uppercase tracking-widest overflow-y-auto pr-2 custom-scrollbar">
          <button onClick={() => setActiveTab('beranda')} className={`w-full text-left p-4 rounded-xl transition ${activeTab === 'beranda' ? 'bg-red-600' : 'hover:bg-white/5'}`}>Kelola Beranda</button>
          <button onClick={() => setActiveTab('profil')} className={`w-full text-left p-4 rounded-xl transition ${activeTab === 'profil' ? 'bg-red-600' : 'hover:bg-white/5'}`}>Kelola Profil Desa</button>
          <button onClick={() => setActiveTab('potensi')} className={`w-full text-left p-4 rounded-xl transition ${activeTab === 'potensi' ? 'bg-red-600' : 'hover:bg-white/5'}`}>Kelola Potensi Desa</button>
          <button onClick={() => setActiveTab('statistik')} className={`w-full text-left p-4 rounded-xl transition ${activeTab === 'statistik' ? 'bg-red-600' : 'hover:bg-white/5'}`}>Kelola Statistik</button>
          <button onClick={() => setActiveTab('berita')} className={`w-full text-left p-4 rounded-xl transition ${activeTab === 'berita' ? 'bg-red-600' : 'hover:bg-white/5'}`}>Kelola Berita</button>
          <button onClick={() => setActiveTab('galeri')} className={`w-full text-left p-4 rounded-xl transition ${activeTab === 'galeri' ? 'bg-red-600' : 'hover:bg-white/5'}`}>Kelola Galeri</button>
          <button onClick={() => setActiveTab('kontak')} className={`w-full text-left p-4 rounded-xl transition ${activeTab === 'kontak' ? 'bg-red-600' : 'hover:bg-white/5'}`}>Kelola Kontak</button>
          <button onClick={() => setActiveTab('sejarah')} className={`w-full text-left p-4 rounded-xl transition ${activeTab === 'sejarah' ? 'bg-red-600' : 'hover:bg-white/5'}`}>Kelola Sejarah</button>
          <button onClick={() => setActiveTab('menu')} className={`w-full text-left p-4 rounded-xl transition ${activeTab === 'menu' ? 'bg-red-600' : 'hover:bg-white/5'}`}>Kelola Menu Link</button>
          <button onClick={() => setActiveTab('projek')} className={`w-full text-left p-4 rounded-xl transition ${activeTab === 'projek' ? 'bg-red-600' : 'hover:bg-white/5'}`}>Kelola Projek</button>
          <button onClick={() => setActiveTab('sections')} className={`w-full text-left p-4 rounded-xl transition ${activeTab === 'sections' ? 'bg-red-600' : 'hover:bg-white/5'}`}>Kelola Halaman Statis</button>
        </nav>
        <Link href="/" className="mt-4 border-2 border-white text-white p-4 rounded-2xl font-black italic uppercase text-[10px] hover:bg-white hover:text-[#111C44] transition text-center block">Kembali ke Website</Link>
        <button onClick={handleLogout} className="mt-4 border-2 border-red-600 text-red-600 p-4 rounded-2xl font-black italic uppercase text-[10px] hover:bg-red-600 hover:text-white transition">Logout & Keluar</button>
      </aside>

      {/* AREA KONTEN UPDATE */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h2 className="text-2xl font-black italic uppercase border-b-4 border-red-600 inline-block mb-8 text-[#111C44]">Update {activeTab}</h2>

        <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 max-w-4xl">
          {activeTab === 'beranda' && (
            <div className="grid gap-4">
              <h3 className="font-bold">Edit Background Beranda</h3>
              <div>
                <label className="block text-sm font-medium mb-1">Gambar Background</label>
                <input type="file" accept="image/*" onChange={(e) => setNewHeroBgFile(e.target.files && e.target.files[0])} className="p-2" />
                {newHeroBgFile && <div className="text-xs text-gray-600">Dipilih: {newHeroBgFile.name}</div>}
                {formData.hero_image && !newHeroBgFile && <div className="text-xs text-gray-600">Saat ini: {formData.hero_image}</div>}
              </div>
            </div>
          )}

          {/* ISI FORM SESUAI TAB */}
          {activeTab === 'profil' && (
            <div className="grid gap-4">
              <textarea value={formData.profilDeskripsi || ''} onChange={(e) => setFormData({...formData, profilDeskripsi: e.target.value})} className="w-full p-5 bg-gray-50 border-2 rounded-[30px] font-bold italic" rows="5" placeholder="Masukkan Profil Desa..." />
              <textarea value={formData.infoGeografis || ''} onChange={(e) => setFormData({...formData, infoGeografis: e.target.value})} className="w-full p-4 bg-gray-50 border-2 rounded-[30px]" rows="3" placeholder="Informasi Geografis (letak, iklim, topografi)..." />

              <label className="font-bold">Visi Desa</label>
              <textarea value={formData.visi || ''} onChange={(e) => setFormData({...formData, visi: e.target.value})} className="w-full p-4 bg-gray-50 border-2 rounded-[12px]" rows="3" placeholder="Visi Desa..." />

              <div>
                <label className="font-bold">Misi Desa</label>
                <div className="space-y-3 mt-2">
                  {(formData.misiItems || []).map((m, idx) => (
                    <div key={idx} className="grid gap-2">
                      <input value={m.title} onChange={(e)=>{
                        const items = [...(formData.misiItems || [])]; items[idx] = {...items[idx], title: e.target.value}; setFormData({...formData, misiItems: items});
                      }} placeholder="Judul misi" className="p-2 border rounded" />
                      <textarea value={m.description} onChange={(e)=>{
                        const items = [...(formData.misiItems || [])]; items[idx] = {...items[idx], description: e.target.value}; setFormData({...formData, misiItems: items});
                      }} className="p-2 border rounded" rows="2" placeholder="Deskripsi misi" />
                      <div className="flex gap-2">
                        <button onClick={()=>{
                          const items = (formData.misiItems || []).filter((_,i)=>i!==idx); setFormData({...formData, misiItems: items});
                        }} className="text-red-600">Hapus Misi</button>
                      </div>
                    </div>
                  ))}
                  <button onClick={()=>{ const items = [...(formData.misiItems||[]), {title:'',description:''}]; setFormData({...formData, misiItems: items}); }} className="mt-2 bg-red-600 text-white p-2 rounded">Tambah Misi</button>
                </div>
              </div>

              <div>
                <label className="font-bold">Pemerintah Desa (Pejabat)</label>
                <div className="space-y-3 mt-2">
                  {(formData.officials || []).map((o, idx) => (
                    <div key={idx} className="grid gap-2 border rounded p-3">
                      <input value={o.role} onChange={(e)=>{ const arr=[...(formData.officials||[])]; arr[idx]={...arr[idx], role:e.target.value}; setFormData({...formData, officials:arr}); }} placeholder="Jabatan (role)" className="p-2 border rounded" />
                      <input value={o.name} onChange={(e)=>{ const arr=[...(formData.officials||[])]; arr[idx]={...arr[idx], name:e.target.value}; setFormData({...formData, officials:arr}); }} placeholder="Nama" className="p-2 border rounded" />
                      <input value={o.nip} onChange={(e)=>{ const arr=[...(formData.officials||[])]; arr[idx]={...arr[idx], nip:e.target.value}; setFormData({...formData, officials:arr}); }} placeholder="NIP / Identitas" className="p-2 border rounded" />
                      <div className="flex gap-2">
                        <button onClick={()=>{ const arr=(formData.officials||[]).filter((_,i)=>i!==idx); setFormData({...formData, officials:arr}); }} className="text-red-600">Hapus Pejabat</button>
                      </div>
                    </div>
                  ))}
                  <button onClick={()=>{ const arr=[...(formData.officials||[]), {role:'',name:'',nip:''}]; setFormData({...formData, officials:arr}); }} className="mt-2 bg-red-600 text-white p-2 rounded">Tambah Pejabat</button>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <input type="text" value={formData.penduduk || ''} onChange={(e) => setFormData({...formData, penduduk: e.target.value})} className="p-3 bg-gray-50 border-2 rounded-2xl font-black italic" placeholder="Jumlah Penduduk" />
                <input type="text" value={formData.dusun || ''} onChange={(e) => setFormData({...formData, dusun: e.target.value})} className="p-3 bg-gray-50 border-2 rounded-2xl font-black italic" placeholder="Jumlah Dusun" />
                <input type="text" value={formData.luasWilayah || ''} onChange={(e) => setFormData({...formData, luasWilayah: e.target.value})} className="p-3 bg-gray-50 border-2 rounded-2xl font-black italic" placeholder="Luas Wilayah (mis. 12 km2)" />
              </div>
              <input type="text" value={formData.ketinggian || ''} onChange={(e) => setFormData({...formData, ketinggian: e.target.value})} className="p-3 bg-gray-50 border-2 rounded-2xl font-black italic" placeholder="Ketinggian (m)" />
              <input type="text" value={formData.alamat || ''} onChange={(e) => setFormData({...formData, alamat: e.target.value})} className="p-3 bg-gray-50 border-2 rounded-2xl font-black italic" placeholder="Alamat / Lokasi Desa" />
            </div>
          )}

          {activeTab === 'potensi' && (
            <div className="grid gap-4">
              <label className="font-bold">Infrastruktur - Jalan & Jembatan</label>
              <textarea value={formData.jalanJembatan || ''} onChange={(e) => setFormData({...formData, jalanJembatan: e.target.value})} className="w-full p-4 bg-gray-50 border-2 rounded-[12px]" rows="3" placeholder="Deskripsi Jalan & Jembatan..." />

              <label className="font-bold">Infrastruktur - Air Bersih</label>
              <textarea value={formData.airBersih || ''} onChange={(e) => setFormData({...formData, airBersih: e.target.value})} className="w-full p-4 bg-gray-50 border-2 rounded-[12px]" rows="3" placeholder="Deskripsi Air Bersih..." />

              <label className="font-bold">Infrastruktur - Listrik & Telekomunikasi</label>
              <textarea value={formData.listrikTelekom || ''} onChange={(e) => setFormData({...formData, listrikTelekom: e.target.value})} className="w-full p-4 bg-gray-50 border-2 rounded-[12px]" rows="3" placeholder="Deskripsi Listrik & Telekomunikasi..." />

              <label className="font-bold">Pariwisata - Wisata Alam</label>
              <textarea value={formData.wisataAlam || ''} onChange={(e) => setFormData({...formData, wisataAlam: e.target.value})} className="w-full p-4 bg-gray-50 border-2 rounded-[12px]" rows="3" placeholder="Deskripsi Wisata Alam..." />

              <label className="font-bold">Pariwisata - Kearifan Lokal</label>
              <textarea value={formData.kearifanLokal || ''} onChange={(e) => setFormData({...formData, kearifanLokal: e.target.value})} className="w-full p-4 bg-gray-50 border-2 rounded-[12px]" rows="3" placeholder="Deskripsi Kearifan Lokal..." />
            </div>
          )}

          {activeTab === 'statistik' && (
            <div className="grid gap-4">
              <input type="text" value={formData.penduduk} onChange={(e) => setFormData({...formData, penduduk: e.target.value})} className="p-4 bg-gray-50 border-2 rounded-2xl font-black italic" placeholder="Total Penduduk" />
              <input type="text" value={formData.kepala_keluarga} onChange={(e) => setFormData({...formData, kepala_keluarga: e.target.value})} className="p-4 bg-gray-50 border-2 rounded-2xl font-black italic" placeholder="Kepala Keluarga" />
              <input type="text" value={formData.pertanian} onChange={(e) => setFormData({...formData, pertanian: e.target.value})} className="p-4 bg-gray-50 border-2 rounded-2xl font-black italic" placeholder="Persentase Pertanian" />
            </div>
          )}

          {activeTab === 'berita' && (
            <div className="grid gap-4">
              <h3 className="font-bold">Tambah Berita Baru</h3>
              <input value={newNewsTitle} onChange={(e)=>setNewNewsTitle(e.target.value)} placeholder="Judul Berita" className="p-3 border rounded" />
              <input value={newNewsExcerpt} onChange={(e)=>setNewNewsExcerpt(e.target.value)} placeholder="Ringkasan / Excerpt" className="p-3 border rounded" />
              <textarea value={newNewsContent} onChange={(e)=>setNewNewsContent(e.target.value)} placeholder="Isi Berita" className="p-3 border rounded" rows={4} />
              <div>
                <label className="block text-sm font-medium mb-1">Foto Berita (file)</label>
                <input type="file" accept="image/*" onChange={(e)=>setNewNewsFile(e.target.files && e.target.files[0])} className="p-2" />
                {newNewsFile && <div className="text-xs text-gray-600 mt-2">Dipilih: {newNewsFile.name}</div>}
              </div>
              <div className="grid md:grid-cols-3 gap-2">
                <input value={newNewsAuthor} onChange={(e)=>setNewNewsAuthor(e.target.value)} placeholder="Penulis" className="p-3 border rounded" />
                <input value={newNewsCategory} onChange={(e)=>setNewNewsCategory(e.target.value)} placeholder="Kategori" className="p-3 border rounded" />
                <input value={newNewsDate} onChange={(e)=>setNewNewsDate(e.target.value)} placeholder="Tanggal (YYYY-MM-DD)" className="p-3 border rounded" />
              </div>
              <input value={newNewsReadTime} onChange={(e)=>setNewNewsReadTime(e.target.value)} placeholder="Read time (mis. 2 min)" className="p-3 border rounded" />
              <div className="flex gap-2">
                <button onClick={async ()=>{
                  let imageUrl = newNewsImage || '';
                  if (newNewsFile) {
                    try {
                      const fd = new FormData(); fd.append('file', newNewsFile);
                      const up = await fetch('/api/upload',{method:'POST',body:fd});
                      if (up.ok) { const j = await up.json(); imageUrl = j.url || imageUrl; }
                    } catch (err) { console.error('Upload failed', err); }
                  }
                  const payload = { title: newNewsTitle, excerpt: newNewsExcerpt, content: newNewsContent, image: imageUrl, author: newNewsAuthor, category: newNewsCategory, date: newNewsDate, readTime: newNewsReadTime };
                  const res = await fetch('/api/news',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
                  if(res.ok){
                    const it = await res.json(); 
                    setNewsItems(prev=>[it,...prev]); 
                    setNewNewsTitle(''); setNewNewsExcerpt(''); setNewNewsContent(''); setNewNewsImage(''); setNewNewsAuthor(''); setNewNewsCategory(''); setNewNewsDate(''); setNewNewsReadTime(''); setNewNewsFile(null); 
                    try{localStorage.setItem('newsSync', Date.now().toString());}catch(e){}; 
                    alert('Berita ditambahkan');
                    // Refresh halaman publik agar revalidate berlaku segera
                    try { await fetch('/api/revalidate?path=/berita'); } catch(e) {}
                  }else{alert('Gagal menambahkan berita');}
                }} className="bg-red-600 text-white p-3 rounded">Tambah Berita</button>
              </div>

              <h3 className="font-bold mt-6">Daftar Berita</h3>
              <ul className="space-y-3">
                {newsItems.map(n=> (
                  <li key={n.id} className="p-3 border rounded">
                    {editingNewsId === n.id ? (
                      <div className="grid gap-2">
                        <input value={editNewsTitle} onChange={e=>setEditNewsTitle(e.target.value)} className="p-2 border rounded" />
                        <input value={editNewsExcerpt} onChange={e=>setEditNewsExcerpt(e.target.value)} className="p-2 border rounded" />
                        <textarea value={editNewsContent} onChange={e=>setEditNewsContent(e.target.value)} className="p-2 border rounded" rows={3} />
                        <div>
                          <label className="block text-sm font-medium mb-1">Ganti Foto (file)</label>
                          <input type="file" accept="image/*" onChange={(e)=>setEditNewsFile(e.target.files && e.target.files[0])} className="p-2" />
                          {editNewsImage && !editNewsFile && <div className="text-xs text-gray-600">Saat ini: {editNewsImage}</div>}
                          {editNewsFile && <div className="text-xs text-gray-600">Dipilih: {editNewsFile.name}</div>}
                        </div>
                        <div className="flex gap-2">
                          <button onClick={async ()=>{
                            let imageUrl = editNewsImage || '';
                            if (editNewsFile) {
                              try {
                                const fd = new FormData(); fd.append('file', editNewsFile);
                                const up = await fetch('/api/upload',{method:'POST',body:fd});
                                if (up.ok) { const j = await up.json(); imageUrl = j.url || imageUrl; }
                              } catch (err) { console.error('Upload failed', err); }
                            }
                            const payload = { id: n.id, title: editNewsTitle, excerpt: editNewsExcerpt, content: editNewsContent, image: imageUrl, author: editNewsAuthor, category: editNewsCategory, date: editNewsDate, readTime: editNewsReadTime };
                            const res = await fetch('/api/news',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
                            if(res.ok){
                              const updated = await res.json(); 
                              setNewsItems(prev=>prev.map(x=>x.id===updated.id?updated:x)); 
                              setEditingNewsId(null); setEditNewsFile(null); 
                              try{localStorage.setItem('newsSync', Date.now().toString());}catch(e){}
                              // Refresh halaman publik agar revalidate berlaku segera
                              try { await fetch('/api/revalidate?path=/berita'); } catch(e) {}
                            }else{alert('Gagal update berita');}
                          }} className="text-green-600">Simpan</button>
                          <button onClick={()=>setEditingNewsId(null)} className="text-gray-600">Batal</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="text-lg">{n.title}</strong>
                          <div className="text-sm text-gray-600">{n.date} — {n.author || 'Admin'} — {n.category || '-'}</div>
                          <p className="mt-2 text-sm">{n.excerpt}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button onClick={()=>{
                            setEditingNewsId(n.id);
                            setEditNewsTitle(n.title||''); setEditNewsExcerpt(n.excerpt||''); setEditNewsContent(n.content||''); setEditNewsImage(n.image||''); setEditNewsAuthor(n.author||''); setEditNewsCategory(n.category||''); setEditNewsDate(n.date||''); setEditNewsReadTime(n.readTime||''); setEditNewsFile(null);
                          }} className="text-blue-600">Edit</button>
                          <button onClick={async ()=>{ 
                            if(confirm('Hapus berita?')){ 
                              await fetch('/api/news',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:n.id})}); 
                              setNewsItems(prev=>prev.filter(x=>x.id!==n.id)); 
                              try{localStorage.setItem('newsSync', Date.now().toString());}catch(e){}
                              // Refresh halaman publik agar revalidate berlaku segera
                              try { await fetch('/api/revalidate?path=/berita'); } catch(e) {}
                            } 
                          }} className="text-red-600">Hapus</button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'galeri' && (
            <div className="grid gap-4">
              <h3 className="font-bold">Tambah Item Galeri</h3>
              <div>
                <label className="block text-sm font-medium mb-1">Foto</label>
                <input type="file" accept="image/*" onChange={(e)=>setNewGalleryFile(e.target.files && e.target.files[0])} className="p-2" />
                {newGalleryFile && <div className="text-xs text-gray-600">Dipilih: {newGalleryFile.name}</div>}
              </div>
              <input value={newGalleryCaption} onChange={(e)=>setNewGalleryCaption(e.target.value)} placeholder="Keterangan / Caption" className="p-3 border rounded" />
              <div className="flex gap-2">
                <button onClick={async ()=>{
                  if (!newGalleryFile) return alert('Pilih foto dulu');
                  let url = '';
                  try {
                    const fd = new FormData(); fd.append('file', newGalleryFile);
                    const up = await fetch('/api/upload',{method:'POST',body:fd});
                    if (up.ok) { const j = await up.json(); url = j.url || ''; }
                  } catch (err) { console.error('Upload failed', err); }
                  if (!url) return alert('Upload gagal');
                  const payload = { url, caption: newGalleryCaption };
                  const res = await fetch('/api/gallery',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
                  if (res.ok) { 
                    const it = await res.json(); 
                    setGalleryItems(prev=>[it,...prev]); 
                    setNewGalleryFile(null); setNewGalleryCaption(''); 
                    try{localStorage.setItem('gallerySync', Date.now().toString());}catch(e){}; 
                    alert('Item galeri ditambahkan'); 
                    // Refresh halaman publik agar revalidate berlaku segera
                    try { await fetch('/api/revalidate?path=/galeri'); } catch(e) {}
                  } else { alert('Gagal menambahkan'); }
                }} className="bg-red-600 text-white p-3 rounded">Tambah Foto</button>
              </div>

              <h3 className="font-bold mt-6">Daftar Galeri</h3>
              <ul className="space-y-3">
                {galleryItems.map(g=> (
                  <li key={g.id} className="p-3 border rounded">
                    {editingGalleryId === g.id ? (
                      <div className="grid gap-2">
                        <div>
                          <label className="block text-sm font-medium mb-1">Ganti Foto</label>
                          <input type="file" accept="image/*" onChange={(e)=>setEditGalleryFile(e.target.files && e.target.files[0])} className="p-2" />
                        </div>
                        <input value={editGalleryCaption} onChange={e=>setEditGalleryCaption(e.target.value)} placeholder="Keterangan / Caption" className="p-2 border rounded" />
                        <div className="flex gap-2">
                          <button onClick={async ()=>{
                            let url = g.url || '';
                            if (editGalleryFile) {
                              try { const fd = new FormData(); fd.append('file', editGalleryFile); const up = await fetch('/api/upload',{method:'POST',body:fd}); if (up.ok){ const j = await up.json(); url = j.url || url; } } catch(e){console.error('Upload failed',e);}
                            }
                            const payload = { id: g.id, url, caption: editGalleryCaption };
                            const res = await fetch('/api/gallery',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
                            if (res.ok) { 
                              const updated = await res.json(); 
                              setGalleryItems(prev=>prev.map(x=>x.id===updated.id?updated:x)); 
                              setEditingGalleryId(null); setEditGalleryFile(null); 
                              try{localStorage.setItem('gallerySync', Date.now().toString());}catch(e){} 
                              // Refresh halaman publik agar revalidate berlaku segera
                              try { await fetch('/api/revalidate?path=/galeri'); } catch(e) {}
                            } else { alert('Gagal update'); }
                          }} className="text-green-600">Simpan</button>
                          <button onClick={()=>setEditingGalleryId(null)} className="text-gray-600">Batal</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div>
                          <img src={g.url} alt={g.caption} className="w-40 h-28 object-cover rounded" />
                          <div className="text-sm mt-2">{g.caption}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button onClick={()=>{ setEditingGalleryId(g.id); setEditGalleryCaption(g.caption||''); setEditGalleryFile(null); }} className="text-blue-600">Edit</button>
                          <button onClick={async ()=>{ 
                            if(confirm('Hapus item galeri?')){ 
                              await fetch('/api/gallery',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:g.id})}); 
                              setGalleryItems(prev=>prev.filter(x=>x.id!==g.id)); 
                              try{localStorage.setItem('gallerySync', Date.now().toString());}catch(e){} 
                              // Refresh halaman publik agar revalidate berlaku segera
                              try { await fetch('/api/revalidate?path=/galeri'); } catch(e) {}
                            } 
                          }} className="text-red-600">Hapus</button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'kontak' && (
            <div className="grid gap-4">
              <textarea value={formData.alamat} onChange={(e) => setFormData({...formData, alamat: e.target.value})} className="p-4 bg-gray-50 border-2 rounded-2xl font-bold italic" rows="3" placeholder="Alamat Kantor Desa" />
              <input type="text" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="p-4 bg-gray-50 border-2 rounded-2xl font-black italic" placeholder="Nomor WhatsApp" />
              <input type="text" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="p-4 bg-gray-50 border-2 rounded-2xl font-black italic" placeholder="Email Resmi" />
              <input type="text" value={formData.facebookUrl} onChange={(e) => setFormData({...formData, facebookUrl: e.target.value})} className="p-4 bg-gray-50 border-2 rounded-2xl font-black italic" placeholder="URL Facebook" />
              <input type="text" value={formData.instagramUrl} onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})} className="p-4 bg-gray-50 border-2 rounded-2xl font-black italic" placeholder="URL Instagram" />
              <input type="text" value={formData.twitterUrl} onChange={(e) => setFormData({...formData, twitterUrl: e.target.value})} className="p-4 bg-gray-50 border-2 rounded-2xl font-black italic" placeholder="URL Twitter" />
            </div>
          )}

          {activeTab === 'sejarah' && (
            <div className="grid gap-4">
              <h3 className="font-bold">Deskripsi Sejarah</h3>
              <textarea value={formData.sejarah || ''} onChange={(e) => setFormData({...formData, sejarah: e.target.value})} className="w-full p-4 bg-gray-50 border-2 rounded-[12px]" rows="5" placeholder="Masukkan deskripsi sejarah desa..." />

              <h3 className="font-bold mt-6">Tambah Momen / Milestone Sejarah</h3>
              <input value={newMilestoneTitle} onChange={(e) => setNewMilestoneTitle(e.target.value)} placeholder="Judul Momen" className="p-3 border rounded" />
              <input value={newMilestoneDate} onChange={(e) => setNewMilestoneDate(e.target.value)} placeholder="Tanggal" className="p-3 border rounded" />
              <textarea value={newMilestoneDescription} onChange={(e) => setNewMilestoneDescription(e.target.value)} placeholder="Deskripsi Momen" className="p-3 border rounded" rows="2" />
              <div>
                <label className="block text-sm font-medium mb-1">Foto Momen</label>
                <input type="file" accept="image/*" onChange={(e) => setNewMilestoneFile(e.target.files && e.target.files[0])} className="p-2" />
                {newMilestoneFile && <div className="text-xs text-gray-600">Dipilih: {newMilestoneFile.name}</div>}
              </div>
              <div className="flex gap-2">
                <button onClick={async () => {
                  if (!newMilestoneFile) return alert('Pilih file gambar dulu');
                  let imageUrl = '';
                  try {
                    const fd = new FormData();
                    fd.append('file', newMilestoneFile);
                    const up = await fetch('/api/upload', { method: 'POST', body: fd });
                    if (up.ok) {
                      const j = await up.json();
                      imageUrl = j.url || '';
                    }
                  } catch (err) { console.error('Upload failed', err); }
                  if (!imageUrl) return alert('Upload gagal');

                  const newMilestone = {
                    title: newMilestoneTitle,
                    date: newMilestoneDate,
                    description: newMilestoneDescription,
                    image: imageUrl
                  };
                  const updatedMilestones = [...(formData.sejarahMilestones || []), newMilestone];
                  setFormData({...formData, sejarahMilestones: updatedMilestones});

                  setNewMilestoneTitle('');
                  setNewMilestoneDate('');
                  setNewMilestoneDescription('');
                  setNewMilestoneFile(null);
                  alert('Momen sejarah ditambahkan. Jangan lupa klik "Perbarui Data" untuk menyimpan permanen.');
                }} className="bg-red-600 text-white p-3 rounded">Tambah Momen</button>
              </div>

              <h3 className="font-bold mt-6">Daftar Momen / Milestone Sejarah</h3>
              <ul className="space-y-3">
                {(formData.sejarahMilestones || []).map((m, idx) => (
                  <li key={idx} className="p-3 border rounded">
                    {editingMilestoneId === idx ? (
                      <div className="grid gap-2">
                        <input value={editMilestoneTitle} onChange={(e) => setEditMilestoneTitle(e.target.value)} placeholder="Judul Momen" className="p-2 border rounded" />
                        <input value={editMilestoneDate} onChange={(e) => setEditMilestoneDate(e.target.value)} placeholder="Tanggal" className="p-2 border rounded" />
                        <textarea value={editMilestoneDescription} onChange={(e) => setEditMilestoneDescription(e.target.value)} placeholder="Deskripsi Momen" className="p-2 border rounded" rows="2" />
                        <div>
                          <label className="block text-sm font-medium mb-1">Ganti Foto</label>
                          <input type="file" accept="image/*" onChange={(e) => setEditMilestoneFile(e.target.files && e.target.files[0])} className="p-2" />
                          {editMilestoneImage && !editMilestoneFile && <div className="text-xs text-gray-600">Saat ini: {editMilestoneImage}</div>}
                          {editMilestoneFile && <div className="text-xs text-gray-600">Dipilih: {editMilestoneFile.name}</div>}
                        </div>

                        <div className="flex gap-2">
                          <button onClick={async () => {
                            let imageUrl = editMilestoneImage || '';
                            if (editMilestoneFile) {
                                try {
                                    const fd = new FormData(); fd.append('file', editMilestoneFile);
                                    const up = await fetch('/api/upload', { method: 'POST', body: fd });
                                    if (up.ok) { const j = await up.json(); imageUrl = j.url || imageUrl; }
                                } catch (e) { console.error('Upload failed', e); }
                            }
                            const updatedMilestone = {
                                title: editMilestoneTitle,
                                date: editMilestoneDate,
                                description: editMilestoneDescription,
                                image: imageUrl
                            };
                            const updatedMilestones = [...(formData.sejarahMilestones || [])];
                            updatedMilestones[idx] = updatedMilestone;
                            setFormData({...formData, sejarahMilestones: updatedMilestones});
                            setEditingMilestoneId(null);
                            setEditMilestoneFile(null);
                          }} className="text-green-600">Simpan</button>
                          <button onClick={() => setEditingMilestoneId(null)} className="text-gray-600">Batal</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <img src={m.image} alt={m.title} className="w-24 h-24 object-cover rounded" />
                          <div>
                            <strong className="text-lg">{m.title}</strong>
                            <div className="text-sm text-gray-600">{m.date}</div>
                            <p className="mt-1 text-sm">{m.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button onClick={() => {
                            setEditingMilestoneId(idx);
                            setEditMilestoneTitle(m.title || '');
                            setEditMilestoneDate(m.date || '');
                            setEditMilestoneDescription(m.description || '');
                            setEditMilestoneImage(m.image || '');
                            setEditMilestoneFile(null);
                          }} className="text-blue-600">Edit</button>
                          <button onClick={() => {
                            if (confirm('Hapus momen sejarah ini?')) {
                              const updatedMilestones = (formData.sejarahMilestones || []).filter((_, i) => i !== idx);
                              setFormData({...formData, sejarahMilestones: updatedMilestones});
                            }
                          }} className="text-red-600">Hapus</button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Menu, Project, Section Management ... (Dilewatkan sesuai instruksi pengguna, hanya fokus pada News, Galeri, Profil) */}
          
          {activeTab === 'menu' && (
            <div>
              {/* Menu Management JSX */}
              {/* Kode Menu Management dari file lama, biarkan saja */}
            </div>
          )}

          {activeTab === 'projek' && (
            <div>
              {/* Project Management JSX */}
              {/* Kode Project Management dari file lama, biarkan saja */}
            </div>
          )}

          {activeTab === 'sections' && (
            <div>
              {/* Sections Management JSX */}
              {/* Kode Sections Management dari file lama, biarkan saja */}
            </div>
          )}

          {/* TOMBOL UPDATE */}
          <div className="mt-10 flex gap-4">
            <button onClick={handleUpdate} className="flex-1 bg-red-600 text-white py-5 rounded-[25px] font-black uppercase text-xs shadow-xl"> Perbarui Data {activeTab}</button>
            <button onClick={() => alert('Data Dihapus')} className="flex-1 border-2 border-[#111C44] text-[#111C44] py-5 rounded-[25px] font-black uppercase text-xs">Hapus Data</button>
          </div>
        </div>
      </main>
    </div>
  );
}
