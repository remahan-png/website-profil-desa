"use client";

import AdminCheck from "../../components/AdminCheck";

export default function AdminLayout({ children }) {
  // AdminCheck akan menangani loading dan redirect ke /login jika tidak terautentikasi
  return (
    <AdminCheck showIfAdmin={true}>
      {children}
    </AdminCheck>
  );
}
