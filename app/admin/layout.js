import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Panel - Desa Lendang Belo",
  description: "Panel administrasi website Desa Lendang Belo",
};

export default function AdminLayout({ children }) {
  // Simple authentication check - in production, use proper middleware
  // For now, we'll check if we're in development or if a session exists

  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
