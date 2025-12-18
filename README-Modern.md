# Website Profil Desa Lendang Belo - Modern Next.js

Website profil desa modern yang dibangun dengan Next.js, Tailwind CSS, dan sistem manajemen konten yang lengkap.

## 🚀 Fitur Utama

### ✅ Halaman Website

- **Beranda** - Hero section, statistik, sejarah, visi misi, berita terbaru
- **Profil Desa** - Informasi lengkap tentang desa, pemerintah, geografis
- **Berita** - Sistem berita dengan kategori dan pencarian
- **Galeri** - Koleksi foto kegiatan desa dengan filter kategori
- **Kontak** - Informasi kontak lengkap dan lokasi

### ✅ Sistem Admin

- **Panel Admin** - Interface untuk mengelola konten
- **Manajemen Berita** - Tambah, edit, hapus berita
- **Manajemen Galeri** - Upload dan kelola foto kegiatan
- **Real-time Updates** - Perubahan langsung terlihat di website

### ✅ Backend Integration

- **API Routes** - RESTful API untuk CRUD operations
- **JSON Storage** - Penyimpanan data dalam file JSON
- **Error Handling** - Penanganan error yang robust

## 🛠️ Teknologi

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify ready
- **Data Storage**: JSON files (dapat diupgrade ke database)

## 📁 Struktur Proyek

```
desaweb/
├── app/
│   ├── api/
│   │   ├── news/
│   │   │   ├── route.js          # API untuk berita
│   │   │   └── [id]/
│   │   │       └── route.js      # API untuk berita individual
│   │   └── gallery/
│   │       ├── route.js          # API untuk galeri
│   │       └── [id]/
│   │           └── route.js      # API untuk galeri individual
│   ├── admin/
│   │   └── page.js               # Panel admin
│   ├── berita/
│   │   └── page.js               # Halaman berita
│   ├── galeri/
│   │   └── page.js               # Halaman galeri
│   ├── kontak/
│   │   └── page.js               # Halaman kontak
│   ├── profil/
│   │   └── page.js               # Halaman profil
│   ├── layout.js                 # Root layout
│   └── page.js                   # Halaman utama
├── components/
│   ├── Header.jsx                # Header dengan navigasi
│   ├── Footer.jsx                # Footer lengkap
│   ├── Hero.jsx                  # Hero section
│   ├── Stats.jsx                 # Komponen statistik
│   ├── Sejarah.jsx               # Section sejarah
│   ├── VisiMisi.jsx              # Visi & misi
│   └── Berita.jsx                # Komponen berita
├── data/
│   ├── news.json                 # Data berita
│   └── gallery.json              # Data galeri
├── package.json                  # Dependencies
├── tailwind.config.js            # Konfigurasi Tailwind
├── vercel.json                   # Konfigurasi Vercel
└── README-Modern.md              # Dokumentasi ini
```

## 🚀 Instalasi & Menjalankan

### Prerequisites

- Node.js 18+
- npm atau yarn

### Setup Development

```bash
# Clone repository
git clone <repository-url>
cd desaweb

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka http://localhost:3000
```

### Build Production

```bash
# Build aplikasi
npm run build

# Jalankan production server
npm start
```

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Untuk production deployment
vercel --prod
```

### Netlify

```bash
# Build aplikasi
npm run build

# Upload folder .next ke Netlify
# Atau gunakan Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir .next
```

## 🎨 Kustomisasi Konten

### Mengubah Data Desa

Edit file berikut untuk mengubah konten:

- **Informasi Desa**: `app/profil/page.js`
- **Kontak**: `app/kontak/page.js`
- **Data Berita**: `data/news.json` atau via admin panel
- **Data Galeri**: `data/gallery.json` atau via admin panel

### Mengubah Styling

- **Warna**: Edit `tailwind.config.js`
- **Layout**: Edit komponen di folder `components/`
- **Typography**: Edit `app/layout.js`

## 🔧 API Endpoints

### Berita

- `GET /api/news` - Ambil semua berita
- `POST /api/news` - Tambah berita baru
- `PUT /api/news/[id]` - Update berita
- `DELETE /api/news/[id]` - Hapus berita

### Galeri

- `GET /api/gallery` - Ambil semua galeri
- `POST /api/gallery` - Tambah item galeri baru
- `PUT /api/gallery/[id]` - Update item galeri
- `DELETE /api/gallery/[id]` - Hapus item galeri

## 📱 Responsive Design

Website ini fully responsive dengan breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Admin Panel

Akses admin panel di `/admin` untuk:

- Mengelola berita (tambah/edit/hapus)
- Mengelola galeri (tambah/edit/hapus)
- Real-time updates ke website

## 🎯 Roadmap

### Fitur Mendatang

- [ ] Authentication untuk admin panel
- [ ] Upload gambar langsung (saat ini URL)
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Rich text editor untuk berita
- [ ] Comment system
- [ ] SEO optimization lanjutan
- [ ] PWA (Progressive Web App)

### Improvements

- [ ] Image optimization
- [ ] Loading states
- [ ] Error boundaries
- [ ] Unit tests
- [ ] E2E tests

## 📄 Lisensi

Proyek ini dibuat untuk Desa Lendang Belo dan dapat digunakan sebagai template untuk website desa lainnya.

## 🤝 Kontribusi

Untuk kontribusi atau pertanyaan, silakan hubungi tim development.

---

**Dibuat dengan ❤️ untuk Desa Lendang Belo**
