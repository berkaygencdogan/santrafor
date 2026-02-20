// app/admin/layout.js
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0B1220] text-white">
      <AdminSidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
