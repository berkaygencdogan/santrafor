// app/admin/layout.js
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#ffffff] text-white">
      <AdminSidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
