-- 1. Matikan RLS atau buat policy untuk tabel gallery
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Access" ON gallery;
CREATE POLICY "Public Access" ON gallery FOR ALL USING (true) WITH CHECK (true);

-- 2. Matikan RLS atau buat policy untuk tabel news
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Access" ON news;
CREATE POLICY "Public Access" ON news FOR ALL USING (true) WITH CHECK (true);

-- 3. Pastikan tabel memiliki kolom ID yang benar (UUID atau BIGSERIAL)
-- Jika Anda menggunakan BIGSERIAL (int8)
-- ALTER TABLE gallery ADD COLUMN IF NOT EXISTS id BIGSERIAL PRIMARY KEY;
-- ALTER TABLE news ADD COLUMN IF NOT EXISTS id BIGSERIAL PRIMARY KEY;

-- Jika tabel belum ada, jalankan ini:
/*
CREATE TABLE IF NOT EXISTS gallery (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  author TEXT,
  category TEXT,
  date TEXT,
  read_time TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
*/
