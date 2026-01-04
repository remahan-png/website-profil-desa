"use client";

import { useState } from 'react';
import { handleUpdateProfileAndStats, handleAddNews, handleUpdatePotensi, handleUpdateAparat } from '../lib/adminActions';
import { supabaseClient } from '../lib/supabaseClient'; // Import client for storage operations if needed, though actions handle it.

// Komponen Pembantu untuk notifikasi
const Notification = ({ message, isSuccess }) => {
    if (!message) return null;
    const style = isSuccess ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';
    return (
        <div className={`border p-3 rounded mt-4 ${style}`}>
            <p className="font-bold">{isSuccess ? 'Sukses!' : 'Error!'}</p>
            <p>{message}</p>
        </div>
    );
};

// --- Form Update Profil Desa, Statistik, dan Background Hero ---
function UpdateProfileForm() {
    // State for profil_desa/statistik fields
    const [visi, setVisi] = useState('');
    const [misi, setMisi] = useState('');
    const [populasi, setPopulasi] = useState(0);
    const [jumlahKk, setJumlahKk] = useState(0);
    const [persentase, setPersentase] = useState(0);
    const [luasWilayah, setLuasWilayah] = useState(0);
    const [ketinggian, setKetinggian] = useState(0);
    const [alamat, setAlamat] = useState('');
    const [telepon, setTelepon] = useState('');
    const [email, setEmail] = useState('');
    const [heroImageFile, setHeroImageFile] = useState(null); // For background_hero upload

    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const profileFields = { 
            visi, 
            misi, 
            alamat, 
            telepon, 
            email 
        };
        
        const statsFields = { 
            populasi: parseInt(populasi), 
            jumlah_kk: parseInt(jumlahKk), 
            persentase: parseFloat(persentase),
            luas_wilayah: parseFloat(luasWilayah),
            ketinggian: parseFloat(ketinggian)
        };

        // Logika Wajib: Gunakan isUploading/isLoading untuk mengubah teks tombol
        
        const result = await handleUpdateProfileAndStats(profileFields, statsFields, heroImageFile);
        
        setIsSuccess(result.success);
        setMessage(result.message);
        setLoading(false);

        if (result.success) {
            // Logika Wajib: Tampilkan alert("Data Berhasil Diperbarui!")
            alert("Data Berhasil Diperbarui!");
        }
    };

    return (
        <div className="p-6 border rounded-lg shadow-md bg-white col-span-2">
            <h3 className="text-2xl font-semibold mb-4">1. Perbarui Profil Desa & Statistik (Tabel: profil_desa)</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Kolom Visi & Misi */}
                <div className="col-span-2">
                    <label className="block text-gray-700">Visi</label>
                    <textarea 
                        value={visi} 
                        onChange={(e) => setVisi(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        rows="2"
                        required
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700">Misi</label>
                    <textarea 
                        value={misi} 
                        onChange={(e) => setMisi(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        rows="3"
                        required
                    />
                </div>

                {/* Kolom Statistik (asumsi di profil_desa) */}
                <div>
                    <label className="block text-gray-700">Populasi</label>
                    <input type="number" value={populasi} onChange={(e) => setPopulasi(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-gray-700">Jumlah KK</label>
                    <input type="number" value={jumlahKk} onChange={(e) => setJumlahKk(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-gray-700">Persentase (%)</label>
                    <input type="number" step="0.01" value={persentase} onChange={(e) => setPersentase(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-gray-700">Luas Wilayah (Ha/Km²)</label>
                    <input type="number" step="0.01" value={luasWilayah} onChange={(e) => setLuasWilayah(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-gray-700">Ketinggian (mdpl)</label>
                    <input type="number" value={ketinggian} onChange={(e) => setKetinggian(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>

                {/* Kolom Kontak & Alamat */}
                <div>
                    <label className="block text-gray-700">Alamat</label>
                    <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-gray-700">Telepon</label>
                    <input type="text" value={telepon} onChange={(e) => setTelepon(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>

                {/* Menu Beranda: Upload Background Hero */}
                <div className="col-span-2">
                    <label className="block text-gray-700">Background Hero (URL akan disimpan di kolom background_hero)</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setHeroImageFile(e.target.files ? e.target.files[0] : null)}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>

                <div className="col-span-2">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition duration-150"
                    >
                        {loading ? 'Sedang Memproses...' : 'PERBARUI DATA (Profil & Statistik)'}
                    </button>
                </div>
                <Notification message={message} isSuccess={isSuccess} />
            </form>
        </div>
    );
}

// --- Form Tambah Berita Baru ---
function AddNewsForm() {
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('Admin');
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const newsData = { title, excerpt, content, author }; // author is used instead of penulis for consistency in component state
        
        // Note: handleAddNews expects title, excerpt, content, and image_url placeholder in newsData, but uses author internally for state tracking. 
        // We'll map title -> title, excerpt -> excerpt, content -> content.
        const result = await handleAddNews({ title, excerpt, content, image_url: null }, imageFile); 
        // Note: handleAddNews requires title, excerpt, content, image_url placeholder, and handles file upload internally.

        setIsSuccess(result.success);
        setMessage(result.message);
        setLoading(false);

        if (result.success) {
            setTitle('');
            setExcerpt('');
            setContent('');
            setImageFile(null);
            setAuthor('Admin');
        }
    };

    return (
        <div className="p-6 border rounded-lg shadow-md bg-white">
            <h3 className="text-2xl font-semibold mb-4">2. Tambah Berita Baru (Tabel: news)</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Judul (title)</label>
                    <input 
                        type="text"
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Excerpt (excerpt)</label>
                    <input 
                        type="text"
                        value={excerpt} 
                        onChange={(e) => setExcerpt(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Isi Berita (content)</label>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        rows="5"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Foto Berita (image_url)</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>
                <input type="hidden" value={author} onChange={(e) => setAuthor(e.target.value)} />
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-400 transition duration-150"
                >
                    {loading ? 'Sedang Memproses...' : 'PERBARUI DATA (INSERT Berita)'}
                </button>
                <Notification message={message} isSuccess={isSuccess} />
            </form>
        </div>
    );
}

// --- Form Update Potensi ---
function UpdatePotensiForm() {
    const [potensiData, setPotensiData] = useState({
        'Infrastruktur - Jalan & Jembatan': '',
        'Air Bersih': '',
        'Listrik': '',
        'Wisata': ''
    });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (key, value) => {
        setPotensiData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const result = await handleUpdatePotensi(potensiData);

        setIsSuccess(result.success);
        setMessage(result.message);
        setLoading(false);

        if (result.success) {
            alert("Data Berhasil Diperbarui!");
        }
    };

    const keys = Object.keys(potensiData);

    return (
        <div className="p-6 border rounded-lg shadow-md bg-white col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-semibold mb-4">3. Perbarui Potensi Desa (Tabel: potensi)</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {keys.map(key => (
                    <div key={key}>
                        <label className="block text-gray-700">{key}</label>
                        <textarea 
                            value={potensiData[key]} 
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                            rows="2"
                            required
                        />
                    </div>
                ))}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-2 px-4 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 disabled:bg-yellow-400 transition duration-150"
                >
                    {loading ? 'Sedang Memproses...' : 'PERBARUI DATA (Potensi)'}
                </button>
                <Notification message={message} isSuccess={isSuccess} />
            </form>
        </div>
    );
}

// --- Form Update Aparat Desa ---
function UpdateAparatForm() {
    const [updates, setUpdates] = useState([
        { id: 1, nama: 'H. Riadussholihin', jabatan: 'Kepala Desa', newNama: 'H. Riadussholihin', newJabatan: 'Kepala Desa' },
        { id: 2, nama: 'Muhammad Kamran', jabatan: 'Sekretaris Desa', newNama: 'Muhammad Kamran', newJabatan: 'Sekretaris Desa' },
    ]);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFieldChange = (id, field, value) => {
        setUpdates(prev => prev.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // Map state structure to the expected input for handleUpdateAparat
        const aparatUpdates = updates.map(u => ({
            nama: u.nama, // Nama lama (identifier)
            newNama: u.newNama,
            newJabatan: u.newJabatan
        }));

        const result = await handleUpdateAparat(aparatUpdates);

        setIsSuccess(result.success);
        setMessage(result.message);
        setLoading(false);

        if (result.success) {
            alert("Data Berhasil Diperbarui!");
            // Optionally, reset newNama/newJabatan back to original values or clear them
        }
    };

    return (
        <div className="p-6 border rounded-lg shadow-md bg-white col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-semibold mb-4">4. Perbarui Aparat Desa (Tabel: organisasi)</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {updates.map(item => (
                    <div key={item.id} className="border p-3 rounded bg-gray-50">
                        <p className="font-bold mb-2 text-blue-700">Record: {item.nama} ({item.jabatan})</p>
                        <div>
                            <label className="block text-sm text-gray-600">Nama Baru</label>
                            <input 
                                type="text"
                                value={item.newNama} 
                                onChange={(e) => handleFieldChange(item.id, 'newNama', e.target.value)}
                                className="w-full mt-1 p-2 border rounded text-sm"
                            />
                        </div>
                        <div className="mt-2">
                            <label className="block text-sm text-gray-600">Jabatan Baru</label>
                            <input 
                                type="text"
                                value={item.newJabatan} 
                                onChange={(e) => handleFieldChange(item.id, 'newJabatan', e.target.value)}
                                className="w-full mt-1 p-2 border rounded text-sm"
                            />
                        </div>
                    </div>
                ))}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-red-400 transition duration-150"
                >
                    {loading ? 'Sedang Memproses...' : 'PERBARUI DATA (Aparat)'}
                </button>
                <Notification message={message} isSuccess={isSuccess} />
            </form>
        </div>
    );
}


// --- Komponen Utama Admin Panel ---
export default function AdminControlPanel() {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Panel Kontrol Desa</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UpdateProfileForm />
                <AddNewsForm />
                <UpdatePotensiForm />
                <UpdateAparatForm />
            </div>
            
            <p className="mt-10 text-center text-sm text-gray-500">
                Pembaruan data akan memicu revalidasi instan pada halaman beranda berkat API revalidate dan Vercel.
            </p>
        </div>
    );
}
