import "./globals.css";

export const metadata = {
  title: "Desa Lendang Belo - Profil Desa Modern",
  description:
    "Website resmi Desa Lendang Belo - Desa yang maju, mandiri, dan berbudaya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
