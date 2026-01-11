  "use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { handleUpdateProfileAndStats, handleAddNews, handleUpdatePotensi, handleUpdateAparat, handleAddGallery } from '../lib/adminActions';

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

// --- Form Update Profil Desa & Statistik ---
function ProfileStatsForm() {
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
    const [heroImageFile, setHeroImageFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const { data } = await supabase.from('profil_desa').select('*').single();
            if (data) {
                setVisi(data.visi || '');
                setMisi(data.misi || '');
                setPopulasi(data.populasi || 0);
                setJumlahKk(data.jumlah_kk || 0);
                setPersentase(data.persentase || 0);
                setLuasWilayah(data.luas_wilayah || 0);
                setKetinggian(data.ketinggian || 0);
                setAlamat(data.alamat || '');
                setTelepon(data.telepon || '');
                setEmail(data.email || '');
            }
        };
        loadData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const profileFields = { visi, misi, alamat, telepon, email };
        const statsFields = {
            populasi: parseInt(populasi),
            jumlah_kk: parseInt(jumlahKk),
            persentase: parseFloat(persentase),
            luas_wilayah: parseFloat(luasWilayah),
            ketinggian: parseFloat(ketinggian)
        };

        const result = await handleUpdateProfileAndStats(profileFields, statsFields, heroImageFile);

        setIsSuccess(result.success);
        setMessage(result.message);
        setLoading(false);

        if (result.success) {
            alert("Data Profil & Statistik Berhasil Diperbarui!");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Profil Desa & Statistik</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Visi</label>
                        <textarea value={visi} onChange={(e) => setVisi(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows="2" required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Misi</label>
                        <textarea value={misi} onChange={(e) => setMisi(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows="3" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Populasi</label>
                        <input type="number" value={populasi} onChange={(e) => setPopulasi(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Jumlah KK</label>
                        <input type="number" value={jumlahKk} onChange={(e) => setJumlahKk(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Persentase (%)</label>
                        <input type="number" step="0.01" value={persentase} onChange={(e) => setPersentase(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Luas Wilayah (Ha/Km²)</label>
                        <input type="number" step="0.01" value={luasWilayah} onChange={(e) => setLuasWilayah(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ketinggian (mdpl)</label>
                        <input type="number" value={ketinggian} onChange={(e) => setKetinggian(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Alamat</label>
                        <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telepon</label>
                        <input type="text" value={telepon} onChange={(e) => setTelepon(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Background Hero</label>
                        <input type="file" accept="image/*" onChange={(e) => setHeroImageFile(e.target.files ? e.target.files[0] : null)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                </div>
                <button type="submit" disabled={loading}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition duration-150">
                    {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
                <Notification message={message} isSuccess={isSuccess} />
            </form>
        </div>
    );
}

// --- Form Manajemen Berita ---
function NewsManagementForm() {
    const [news, setNews] = useState([]);
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false });
        setNews(data || []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const result = await handleAddNews({ title, excerpt, content }, imageFile);

        setIsSuccess(result.success);
        setMessage(result.message);
        setLoading(false);

        if (result.success) {
            setTitle('');
            setExcerpt('');
            setContent('');
            setImageFile(null);
            loadNews();
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Manajemen Berita</h3>

            <form onSubmit={handleSubmit} className="mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Judul Berita</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ringkasan</label>
                    <input type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Isi Berita</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows="4" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Foto Berita</label>
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <button type="submit" disabled={loading}
                    className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-green-400 transition duration-150">
                    {loading ? 'Menambah...' : 'Tambah Berita'}
                </button>
            </form>

            <div className="border-t pt-4">
                <h4 className="text-lg font-medium mb-3">Daftar Berita</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {news.map(item => (
                        <div key={item.id} className="p-3 border rounded-md bg-gray-50">
                            <h5 className="font-medium">{item.title}</h5>
                            <p className="text-sm text-gray-600">{item.excerpt}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Notification message={message} isSuccess={isSuccess} />
        </div>
    );
}

// --- Form Manajemen Galeri ---
function GalleryManagementForm() {
    const [gallery, setGallery] = useState([]);
    const [caption, setCaption] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadGallery();
    }, []);

    const loadGallery = async () => {
        const { data } = await supabase.from('galeri').select('*').order('created_at', { ascending: false });
        setGallery(data || []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const result = await handleAddGallery({ caption }, imageFile);

        setIsSuccess(result.success);
        setMessage(result.message);
        setLoading(false);

        if (result.success) {
            setCaption('');
            setImageFile(null);
            loadGallery();
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Manajemen Galeri</h3>

            <form onSubmit={handleSubmit} className="mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Caption Gambar</label>
                    <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Gambar</label>
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <button type="submit" disabled={loading}
                    className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 disabled:bg-purple-400 transition duration-150">
                    {loading ? 'Mengupload...' : 'Tambah ke Galeri'}
                </button>
            </form>

            <div className="border-t pt-4">
                <h4 className="text-lg font-medium mb-3">Galeri Foto</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                    {gallery.map(item => (
                        <div key={item.id} className="border rounded-md p-2 bg-gray-50">
                            <img src={item.image_url} alt={item.caption} className="w-full h-20 object-cover rounded" />
                            <p className="text-xs mt-1 text-center">{item.caption}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Notification message={message} isSuccess={isSuccess} />
        </div>
    );
}

// --- Form Update Potensi ---
function PotensiForm() {
    const [potensiData, setPotensiData] = useState({
        'Infrastruktur - Jalan & Jembatan': '',
        'Air Bersih': '',
        'Listrik': '',
        'Wisata': ''
    });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            for (const key of Object.keys(potensiData)) {
                const { data } = await supabase.from('potensi').select('deskripsi').eq('nama', key).single();
                if (data) {
                    setPotensiData(prev => ({ ...prev, [key]: data.deskripsi }));
                }
            }
        };
        loadData();
    }, []);

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
            alert("Data Potensi Berhasil Diperbarui!");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Potensi Desa</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {Object.keys(potensiData).map(key => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-700">{key}</label>
                        <textarea value={potensiData[key]} onChange={(e) => handleChange(key, e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" rows="3" required />
                    </div>
                ))}
                <button type="submit" disabled={loading}
                    className="w-full py-2 px-4 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 disabled:bg-orange-400 transition duration-150">
                    {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
                <Notification message={message} isSuccess={isSuccess} />
            </form>
        </div>
    );
}

// --- Form Update Aparat ---
function AparatForm() {
    const [aparatData, setAparatData] = useState([]);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const { data } = await supabase.from('organisasi').select('*').order('jabatan', { ascending: true });
            setAparatData(data || []);
        };
        loadData();
    }, []);

    const handleChange = (id, field, value) => {
        setAparatData(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const updates = aparatData.map(item => ({
            nama: item.nama,
            jabatan: item.jabatan,
            newNama: item.nama,
            newJabatan: item.jabatan
        }));

        const result = await handleUpdateAparat(updates);

        setIsSuccess(result.success);
        setMessage(result.message);
        setLoading(false);

        if (result.success) {
            alert("Data Aparat Berhasil Diperbarui!");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Perangkat Desa</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {aparatData.map(item => (
                    <div key={item.id} className="border p-4 rounded-md bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama</label>
                                <input type="text" value={item.nama} onChange={(e) => handleChange(item.id, 'nama', e.target.value)}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                                <input type="text" value={item.jabatan} onChange={(e) => handleChange(item.id, 'jabatan', e.target.value)}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                            </div>
                        </div>
                    </div>
                ))}
                <button type="submit" disabled={loading}
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 transition duration-150">
                    {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
                <Notification message={message} isSuccess={isSuccess} />
            </form>
        </div>
    );
}

export default function AdminControlPanel() {
    const [activeTab, setActiveTab] = useState('profil');
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const tabs = [
        { id: 'profil', label: 'Profil & Statistik', component: ProfileStatsForm },
        { id: 'berita', label: 'Berita', component: NewsManagementForm },
        { id: 'potensi', label: 'Potensi', component: PotensiForm },
        { id: 'galeri', label: 'Galeri', component: GalleryManagementForm },
        { id: 'aparat', label: 'Perangkat', component: AparatForm },
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ProfileStatsForm;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Fixed Header */}
            <header className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Panel Admin Desa</h1>
                <div className="flex space-x-4">
                    <button
                        onClick={() => router.push('/')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-150"
                    >
                        Kembali ke Website
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Tab Navigation */}
                <div className="bg-white rounded-lg shadow-md mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Active Tab Content */}
                <div className="max-w-4xl mx-auto">
                    <ActiveComponent />
                </div>
            </div>
        </div>
    );
}
