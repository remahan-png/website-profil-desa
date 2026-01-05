import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { uploadFileToStorage } from "./storage.js";

// Inisialisasi Supabase Client untuk Client Component
// Menggunakan createClientComponentClient yang secara default akan mengambil
// NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY dari env.
const supabase = createClientComponentClient();

const REVALIDATION_TOKEN = process.env.NEXT_PUBLIC_REVALIDATION_TOKEN;
// Asumsi token juga diakses client (KURANG AMAN)
// ALTERNATIF: Gunakan Server Action atau Route Handler untuk memanggil revalidate
// Namun, karena permintaan sebelumnya meminta API GET, kita akan menggunakan fetch ke API Route.

/**
 * Memicu revalidasi halaman utama (ISR on-demand).
 */
const revalidateHomepage = async () => {
  if (!REVALIDATION_TOKEN) {
    console.error(
      "REVALIDATION_TOKEN is not set in NEXT_PUBLIC_ environment variables."
    );
    return false;
  }

  try {
    // Wajib panggil API revalidate
    const url = `/api/revalidate?secret=${REVALIDATION_TOKEN}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Revalidation failed:", errorData);
      return false;
    }
    console.log("Homepage revalidated successfully.");
    return true;
  } catch (error) {
    console.error("Error during revalidation:", error);
    return false;
  }
};

// --- LOGIKA PROFIL DESA & STATISTIK (Tabel: profil_desa) ---

/**
 * Handle update data profil_desa (termasuk statistik dan background hero)
 * @param {object} profileFields Data untuk kolom visi, misi, alamat, telepon, email, dll.
 * @param {object} statsFields Data untuk kolom populasi, jumlah_kk, persentase, luas_wilayah, ketinggian.
 * @param {File | null} heroImageFile File gambar baru untuk background_hero.
 */
export async function handleUpdateProfileAndStats(
  profileFields,
  statsFields,
  heroImageFile
) {
  try {
    let finalProfileData = { ...profileFields };

    // Gabungkan statistik ke dalam profil_desa sesuai permintaan (jika diperlukan, tapi akan di-update terpisah jika tabelnya beda)
    // Berdasarkan permintaan: "Menu Statistik & Profil (Tabel: profil_desa)"
    // Kita akan menggabungkan semua field yang diminta ke profil_desa, kecuali jika statistik dipisah secara eksplisit.
    // Mengikuti permintaan: Update input UI ke kolom di profil_desa.

    // 1. Handle Image Upload untuk background_hero
    if (heroImageFile) {
      const imageUrl = await uploadFileToStorage(
        heroImageFile,
        "profile-background"
      ); // Folder 'profile-background' di bucket 'desa-assets'
      if (!imageUrl) {
        return {
          success: false,
          message: "Gagal mengupload gambar background hero.",
        };
      }
      finalProfileData.background_hero = imageUrl;
    }

    // Gabungkan semua data yang akan di-update ke profil_desa.
    // Asumsi: Kolom statistik yang diminta (populasi, jumlah_kk, persentase) ada di profil_desa
    // Jika asumsi ini salah, tabel 'statistik' harus dibuat/digunakan. Karena diminta di 'profil_desa', kita gabungkan.
    const updateData = {
      ...finalProfileData,
      ...statsFields,
    };

    // 2. Update profil_desa (Asumsi id=1 untuk data tunggal desa)
    const { error: profileError } = await supabase
      .from("profil_desa")
      .upsert(updateData, { onConflict: "id" }) // Menggunakan upsert untuk mendukung INSERT jika ID belum ada (id=1)
      .eq("id", 1); // Tetap membatasi ke id=1 untuk operasi UPDATE/INSERT tunggal

    if (profileError) {
      throw new Error(`Update profil_desa failed: ${profileError.message}`);
    }

    // 3. Revalidate Homepage
    await revalidateHomepage();

    return {
      success: true,
      message:
        "Data Statistik & Profil berhasil diperbarui! **PERINGATAN: Jika ada kolom baru yang Anda tambahkan (seperti populasi, visi, dll.), pastikan sudah dibuat manual di tabel profil_desa Supabase.**",
    };
  } catch (error) {
    console.error("handleUpdateProfileAndStats error:", error);
    return {
      success: false,
      message:
        error.message ||
        "Terjadi kesalahan saat memperbarui data Profil/Statistik.",
    };
  }
}

// --- LOGIKA POTENSI (Tabel: potensi) ---

/**
 * Update kolom deskripsi berdasarkan nama spesifik di tabel potensi.
 * @param {object} potensiMap Map dari nama kunci ke deskripsi baru.
 * Misalnya: { 'Infrastruktur - Jalan & Jembatan': 'Deskripsi baru infrastruktur...', ... }
 */
export async function handleUpdatePotensi(potensiMap) {
  try {
    let success = true;
    let errorMsg = "";

    // Update berurutan untuk setiap potensi yang didefinisikan
    for (const [nama, deskripsi] of Object.entries(potensiMap)) {
      const { error } = await supabase
        .from("potensi")
        .update({ deskripsi: deskripsi })
        .eq("nama", nama); // Menggunakan 'nama' sebagai pembeda

      if (error) {
        errorMsg += `Update potensi '${nama}' gagal: ${error.message}. `;
        success = false;
      }
    }

    if (!success) {
      throw new Error(`Beberapa potensi gagal diperbarui: ${errorMsg}`);
    }

    // 2. Revalidate Homepage
    await revalidateHomepage();

    return {
      success: true,
      message:
        "Data Potensi berhasil diperbarui! **PERINGATAN: Pastikan kolom deskripsi sudah ada untuk setiap nama potensi yang di-update di tabel potensi Supabase.**",
    };
  } catch (error) {
    console.error("handleUpdatePotensi error:", error);
    return {
      success: false,
      message:
        error.message || "Terjadi kesalahan saat memperbarui data Potensi.",
    };
  }
}

// --- LOGIKA BERITA (Tabel: news) ---

/**
 * Handle penambahan berita baru, termasuk upload gambar.
 * @param {object} newsData Data berita (title, excerpt, content, image_url placeholder)
 * @param {File | null} imageFile File gambar untuk diupload
 */
export async function handleAddNews(newsData, imageFile) {
  try {
    let imageUrl = newsData.image_url || null; // Gunakan nilai dari form jika ada, atau null

    // 1. Upload Gambar jika ada
    if (imageFile) {
      imageUrl = await uploadFileToStorage(imageFile, "news-images"); // Subfolder 'news-images' di bucket 'desa-assets'
      if (!imageUrl) {
        return {
          success: false,
          message: "Gagal mengupload gambar ke Supabase Storage.",
        };
      }
    }

    // 2. Insert data berita ke tabel news
    const dataToInsert = {
      title: newsData.title,
      excerpt: newsData.excerpt,
      content: newsData.content,
      image_url: imageUrl,
    };

    const { error: insertError } = await supabase
      .from("news")
      .insert([dataToInsert]);

    if (insertError) {
      throw new Error(`Insert news failed: ${insertError.message}`);
    }

    // 3. Revalidate Homepage
    await revalidateHomepage();

    return {
      success: true,
      message:
        "Berita baru berhasil ditambahkan dan beranda diperbarui secara instan! **PERINGATAN: Pastikan kolom title, excerpt, content, dan image_url sudah ada di tabel news Supabase.**",
    };
  } catch (error) {
    console.error("handleAddNews error:", error);
    return {
      success: false,
      message: error.message || "Terjadi kesalahan saat menambahkan berita.",
    };
  }
}

// --- LOGIKA APARAT (Tabel: organisasi) ---

/**
 * Update data aparat desa berdasarkan nama yang cocok.
 * @param {Array<{nama: string, jabatan: string, newNama?: string, newJabatan?: string}>} aparatUpdates Array objek update.
 *
 * Contoh input yang diharapkan:
 * [{ nama: 'H. Riadussholihin', jabatan: 'Kepala Desa', newJabatan: 'Kepala Desa Terpilih' }, ...]
 */
export async function handleUpdateAparat(aparatUpdates) {
  try {
    let success = true;
    let errorMsg = "";

    for (const update of aparatUpdates) {
      const filterNama = update.nama;
      const updates = {};

      if (update.newJabatan) {
        updates.jabatan = update.newJabatan;
      }

      // Asumsi: Jika newNama ada, update nama, jika tidak, hanya update jabatan.
      // Karena permintaan bilang "Update kolom nama dan jabatan", kita harus menentukan bagaimana mengidentifikasi record.
      // Kita asumsikan 'nama' yang ada di input adalah nama lama/identifier.
      if (update.newNama) {
        updates.nama = update.newNama;
      }

      // Jika tidak ada update yang valid, lewati
      if (Object.keys(updates).length === 0) continue;

      const { error } = await supabase
        .from("organisasi")
        .update(updates)
        .eq("nama", filterNama);

      if (error) {
        errorMsg += `Update aparat '${filterNama}' gagal: ${error.message}. `;
        success = false;
      }
    }

    if (!success) {
      throw new Error(`Beberapa data Aparat gagal diperbarui: ${errorMsg}`);
    }

    // 2. Revalidate Homepage
    await revalidateHomepage();

    return {
      success: true,
      message:
        "Data Aparat berhasil diperbarui! **PERINGATAN: Pastikan kolom nama dan jabatan sudah ada di tabel organisasi Supabase.**",
    };
  } catch (error) {
    console.error("handleUpdateAparat error:", error);
    return {
      success: false,
      message:
        error.message || "Terjadi kesalahan saat memperbarui data Aparat.",
    };
  }
}
