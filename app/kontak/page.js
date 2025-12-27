import { supabase } from "../../lib/supabase";
import KontakClient from "../../components/KontakClient";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kontak Desa - Desa Lendang Belo",
  description: "Hubungi Kantor Desa Lendang Belo",
};

export default async function KontakPage() {
  const { data: profilData, error: profilError } = await supabase
    .from('profil_desa')
    .select('nama_desa, lokasi, wa, email')
    .single();

  if (profilError) console.error("Error fetching profil_desa:", profilError);

  const dataDesa = profilData || {
      nama_desa: 'Lendang Belo',
      lokasi: 'Jl. Contoh No. 1, Desa Lendang Belo',
      wa: '0812-xxx-xxx',
      email: 'desa@lendangbelo.go.id',
  };

  const contactInfo = {
    lokasi: dataDesa.lokasi,
    wa: dataDesa.wa,
    email: dataDesa.email,
    nama_desa: dataDesa.nama_desa,
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
      <Header />
      <div className="max-w-7xl mx-auto">
        {/* Header Kontak (Static, diambil dari dataDesa) */}
        <div className="text-center mb-16">
          <span className="text-red-600 font-black uppercase tracking-widest text-sm">Hubungi Kami</span>
          <h1 className="text-4xl md:text-5xl font-black italic text-gray-900 mt-2 uppercase">Kontak Desa {contactInfo.nama_desa}</h1>
          <div className="w-24 h-2 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <KontakClient contactInfo={contactInfo} />
      </div>
      <Footer />
    </main>
  );
}