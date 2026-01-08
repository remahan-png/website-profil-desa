"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient.js";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Map username to email (you can customize this mapping)
    const emailMap = {
      "admin": "admin@desaweb.com",
      "superadmin": "superadmin@desaweb.com",
      // Add more username-email mappings as needed
    };

    const email = emailMap[username.toLowerCase()] || `${username}@desaweb.com`;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert("Username atau password salah: " + error.message);
    else window.location.href = "/admin";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login Admin</h1>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded font-bold"
        >
          Masuk
        </button>
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>Username default: <strong>admin</strong></p>
          <p>Password: sesuai yang dibuat di Supabase</p>
        </div>
      </form>
    </div>
  );
}
