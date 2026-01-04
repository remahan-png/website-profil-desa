"use client";

import { useState } from 'react';
import { handleUpdateProfile, handleAddNews } from '@/lib/adminActions';

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

// --- Form Update Profil dan Statistik ---
function UpdateProfileForm() {
    const [visi, setVisi] = useState('');
    const [misi, setMisi] = useState('');
    const [populasi, setPopulasi] = useState(0);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // Data hanya di-update jika ada perubahan dari form, 
        // tapi untuk contoh ini kita kirim semua yang ada di state.
        const profileData = { visi, misi };
        const statsData = { populasi: parseInt(populasi) };

        const result = await handleUpdateProfile(profileData, statsData);
        
        setIsSuccess(result.success);
        setMessage(result.message);
        setLoading(false);
    };

    return (
        <div className="p-6 border rounded-lg shadow-md bg-white">
            <h3 className="text-2xl font-semibold mb-4">Perbarui Profil Desa & Statistik</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Visi</label>
                    <textarea 
                        value={visi} 
                        onChange={(e) => setVisi(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        rows="3"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Misi</label>
                    <textarea 
                        value={misi} 
                        onChange={(e) => setMisi(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        rows="3"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Populasi</label>
                    <input 
                        type="number"
                        value={populasi} 
                        onChange={(e) => setPopulasi(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                >
                    {loading ? 'Memperbarui...' : 'PERBARUI DATA (Visi, Misi, Populasi)'}
                </button>
                <Notification message={message} isSuccess={isSuccess} />
            </form>
        </div>
    );
}

// --- Form Tambah Berita Baru ---
function AddNewsForm() {
    const [judul, setJudul] = useState('');
    const [isi, setIsi] = useState('');
    const [penulis, setPenulis] = useState('Admin');
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const newsData = { judul, isi, penulis };
        
        const result = await handleAddNews(newsData, imageFile); 

        setIsSuccess(result.success);
        setMessage(result.message);
        setLoading(false);

        if (result.success) {
            setJudul('');
            setIsi('');
            setImageFile(null);
            // Anda mungkin ingin mengatur ulang input file secara manual jika menggunakan ref.
        }
    };

    return (
        <div className="p-6 border rounded-lg shadow-md bg-white">
            <h3 className="text-2xl font-semibold mb-4">Tambah Berita Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Judul</label>
                    <input 
                        type="text"
                        value={judul} 
                        onChange={(e) => setJudul(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Isi Berita</label>
                    <textarea 
                        value={isi} 
                        onChange={(e) => setIsi(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        rows="5"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Penulis</label>
                    <input 
                        type="text"
                        value={penulis} 
                        onChange={(e) => setPenulis(e.target.value)}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Foto Berita</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-400"
                >
                    {loading ? 'Menambahkan...' : 'TAMBAH BERITA'}
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
            </div>
            
            <p className="mt-10 text-center text-sm text-gray-500">
                Pembaruan data akan memicu revalidasi instan pada halaman beranda berkat API revalidate dan Vercel.
            </p>
        </div>
    );
}
