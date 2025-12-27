import Header from "../../components/Header";
import Footer from "../../components/Footer";
import VisiMisi from "../../components/VisiMisi";
import ProfileLive from "../../components/ProfileLive";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

// Metadata dibiarkan statis untuk sementara
export const metadata = {
  title: "Profil Desa - Desa Lendang Belo",
  description:
    "Profil lengkap Desa Lendang Belo - sejarah, pemerintah, dan informasi desa",
};

export default async function Profil() {
  // Ambil data profil_desa
  const { data: profilData, error: profilError } = await supabase
    .from("profil_desa")
    .select("*")
    .single();

  // Ambil data organisasi
  const { data: organisasiData, error: organisasiError } = await supabase
    .from("organisasi")
    .select("*")
    .order("order", { ascending: true });

  if (profilError) console.error("Error fetching profil_desa:", profilError);
  if (organisasiError)
    console.error("Error fetching organisasi:", organisasiError);

  // Variabel penampung
  const dataDesa = profilData || {};
  const dataOrganisasi = organisasiData || [];

  const heroTitle = dataDesa.nama_desa
    ? `Profil Desa ${dataDesa.nama_desa}`
    : "Profil Desa Lendang Belo";
  const heroDescription =
    dataDesa.description ||
    "Kenali lebih dalam tentang desa, desa yang harmonis dan berbudaya";

  return (
    <main className="min-h-screen bg-white pt-16">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{heroTitle}</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* Memberikan data ke ProfileLive untuk konsistensi, meskipun ProfileLive mungkin Client Component */}
      <ProfileLive dataDesa={dataDesa} dataOrganisasi={dataOrganisasi} />

      <Footer />
    </main>
  );
}
