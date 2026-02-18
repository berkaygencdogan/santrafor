import Navbar from "@/components/admin/Navbar";
import React from "react";

export default function page() {
  return (
    <div className="p-10 text-white">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>
        Welcome to the admin dashboard. Here you can manage your application.
      </p>
    </div>
  );
}
