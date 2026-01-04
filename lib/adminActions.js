import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { uploadFileToStorage } from './storage';

// Inisialisasi Supabase Client untuk Client Component
// Menggunakan createClientComponentClient yang secara default akan mengambil
// NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY dari env.
const supabase = createClientComponentClient(); 

const REVALIDATION_TOKEN = process.env.NEXT_PUBLIC_REVALIDATION_TOKEN; // Asumsi token juga diakses client (KURANG AMAN)
// ALTERNATIF: Gunakan Server Action atau Route Handler untuk memanggil revalidate
// Namun, karena permintaan sebelumnya meminta API GET, kita akan menggunakan fetch ke API Route.

/**
 * Memicu revalidasi halaman utama (ISR on-demand).
 */
const revalidateHomepage = async () => {
  if (!REVALIDATION_TOKEN) {
    console.error("REVALIDATION_TOKEN is not set in NEXT_PUBLIC_ environment variables.");
    return false;
  }
  
  try {
    const url = `/api/revalidate?secret=${REVALIDATION_TOKEN}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Revalidation failed:', errorData);
      return false;
    }
    console.log('Homepage revalidated successfully.');
    return true;
  } catch (error) {
    console.error('Error during revalidation:', error);
    return false;
  }
};

/**
 * Handle update data profil_desa dan statistik.
 * @param {object} profileData Data untuk profil_desa (visi, misi, dll.)
 * @param {object} statsData Data untuk statistik (populasi, KK, dll.)
 */
export async function handleUpdateProfile(profileData, statsData) {
  try {
    // 1. Update profil_desa (Asumsi id=1 untuk data tunggal desa)
    const { error: profileError } = await supabase
      .from('profil_desa')
      .update(profileData)
      .eq('id', 1);

    if (profileError) {
      throw new Error(`Update profil_desa failed: ${profileError.message}`);
    }

    // 2. Update statistik (Asumsi id=1 untuk data statistik tunggal)
    const { error: statsError } = await supabase
      .from('statistik')
      .update(statsData)
      .eq('id', 1); 

    if (statsError) {
      throw new Error(`Update statistik failed: ${statsError.message}`);
    }

    // 3. Revalidate Homepage
    const revalidated = await revalidateHomepage();
    
    if (revalidated) {
        return { success: true, message: 'Data Beranda berhasil diperbarui secara instan!' };
    } else {
        return { success: false, message: 'Data di database diperbarui, tetapi revalidasi gagal. Cache mungkin akan diperbarui nanti.' };
    }

  } catch (error) {
    console.error('handleUpdateProfile error:', error);
    return { success: false, message: error.message || 'Terjadi kesalahan saat memperbarui data.' };
  }
}

/**
 * Handle penambahan berita baru, termasuk upload gambar.
 * @param {object} newsData Data berita (judul, isi, penulis)
 * @param {File | null} imageFile File gambar untuk diupload
 */
export async function handleAddNews(newsData, imageFile) {
    try {
        let imageUrl = null;

        // 1. Upload Gambar jika ada
        if (imageFile) {
            imageUrl = await uploadFileToStorage(imageFile, 'news-images'); // Subfolder 'news-images' di bucket 'desa-assets'
            if (!imageUrl) {
                return { success: false, message: 'Gagal mengupload gambar ke Supabase Storage.' };
            }
        }

        // 2. Insert data berita ke tabel news
        const dataToInsert = {
            ...newsData,
            gambar_url: imageUrl, // Simpan URL publik
        };

        const { error: insertError } = await supabase
            .from('news')
            .insert([dataToInsert]);

        if (insertError) {
            throw new Error(`Insert news failed: ${insertError.message}`);
        }

        // 3. Revalidate Homepage
        const revalidated = await revalidateHomepage();

        if (revalidated) {
            return { success: true, message: 'Berita baru berhasil ditambahkan dan beranda diperbarui secara instan!' };
        } else {
            return { success: false, message: 'Berita ditambahkan, tetapi revalidasi gagal. Cache mungkin akan diperbarui nanti.' };
        }

    } catch (error) {
        console.error('handleAddNews error:', error);
        return { success: false, message: error.message || 'Terjadi kesalahan saat menambahkan berita.' };
    }
}

// Tambahkan inisialisasi revalidation token di .env.local:
// NEXT_PUBLIC_REVALIDATION_TOKEN="your_client_accessible_revalidation_token"
// Ini kurang aman, tetapi memungkinkan client-side untuk memanggil API route revalidate. 
// Alternatif yang lebih aman adalah menggunakan Server Action.
