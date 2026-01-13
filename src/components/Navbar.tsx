"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    router.push("/");
  };

  return (
    <nav className="flex items-center gap-4 p-4 bg-gray-200 dark:bg-gray-800">
      {user.role === "MANAGER" && <Link href="/dashboard">Dashboard</Link>}
      <Link href="/products">Products</Link>

      <ThemeToggle />

      <button
        onClick={handleLogout}
        className="ml-auto bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
}
