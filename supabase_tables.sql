-- Table: Aparat
CREATE TABLE Aparat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama VARCHAR(255) NOT NULL,
    jabatan VARCHAR(255) NOT NULL,
    foto_url TEXT,
    pendidikan VARCHAR(255),
    nipd VARCHAR(50) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Table: Layanan
CREATE TABLE Layanan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_layanan VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    syarat TEXT,
    prosedur TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Table: Agenda
CREATE TABLE Agenda (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    tanggal DATE NOT NULL,
    waktu TIME,
    tempat VARCHAR(255),
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
