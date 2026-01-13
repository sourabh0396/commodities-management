"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailAddress.trim() || !passwordInput.trim()) {
      toast.error("Email and password are required");
      return;
    }

    const loginResult = login(emailAddress, passwordInput);

    if (!loginResult.success) {
      toast.error(loginResult.error ?? "Login failed");
      return;
    }

    toast.success("Login successful");
    if (loginResult.role === "MANAGER") {
      router.push("/dashboard");
    } else {
      router.push("/products");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLoginSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow w-96"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-2 mb-3 border rounded"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
