import { supabase } from './supabase.js';

/**
 * Mengunggah file ke Supabase Storage dan mengembalikan URL publik.
 * @param {File} file File object dari form input.
 * @param {string} folder Nama folder di dalam bucket 'desa-assets' (contoh: 'news' atau 'backgrounds').
 * @returns {Promise<string | null>} URL publik file yang diunggah, atau null jika gagal.
 */
export async function uploadFileToStorage(file, folder) {
  if (!file) {
    return null;
  }

  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
    const filePath = `${folder}/${fileName}`;
    const bucket = 'desa-assets';

    // File object dari input form dapat di-upload langsung oleh supabase-js di browser
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return null;
    }
    
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;

  } catch (error) {
    console.error('General upload error:', error);
    return null;
  }
}
