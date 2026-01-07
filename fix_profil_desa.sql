-- fix_profil_desa.sql

-- 1. Tambahkan kolom yang hilang jika belum ada
ALTER TABLE profil_desa ADD COLUMN IF NOT EXISTS nama_desa TEXT;
ALTER TABLE profil_desa ADD COLUMN IF NOT EXISTS deskripsi_singkat TEXT;
ALTER TABLE profil_desa ADD COLUMN IF NOT EXISTS background_image TEXT;

-- 2. Isi data default jika tabel kosong
-- Diasumsikan tabel profil_desa hanya memiliki satu baris data profil.
-- Perintah ini akan memastikan setidaknya ada satu baris data.
INSERT INTO profil_desa (id, nama_desa, deskripsi_singkat, background_image)
SELECT 1, 'Nama Desa Default', 'Deskripsi singkat tentang desa Anda.', 'placeholder.jpg'
WHERE NOT EXISTS (SELECT 1 FROM profil_desa);

-- Jika tabel sudah ada dan baris id=1 sudah ada, Anda dapat memperbarui data yang mungkin kosong
UPDATE profil_desa
SET
  nama_desa = COALESCE(nama_desa, 'Nama Desa Default'),
  deskripsi_singkat = COALESCE(deskripsi_singkat, 'Deskripsi singkat tentang desa Anda.'),
  background_image = COALESCE(background_image, 'placeholder.jpg')
WHERE id = 1;
