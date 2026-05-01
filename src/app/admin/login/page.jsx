"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "123456") {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url('/bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* 🔥 LIGHT OVERLAY */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(255,255,255,0.75)", // 👈 light transparency
        }}
      ></div>

      {/* LOGIN CARD */}
      <form
        onSubmit={handleLogin}
        style={{
          position: "relative",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "14px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
          width: "350px",
          textAlign: "center",
        }}
      >
        {/* 🧬 LOGO CENTER */}
        <image
          src="/logo.png"
          alt="AS Micro Path Lab"
          style={{
            width: "120px",
            marginBottom: "10px",
            marginLeft: "72px",
          }}
        />

        {/* 🧪 BRAND NAME */}
        <h1
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            color: "#1a3c40",
            marginBottom: "5px",
          }}
        >
          AS Micro Path Lab
        </h1>

        <p
          style={{
            fontSize: "13px",
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Secure Admin Login
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
          }}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "6px",
          }}
        />

        {/* BUTTON */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#1a3c40",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login to Dashboard
        </button>

        {/* FOOTER */}
        <p
          style={{
            fontSize: "11px",
            color: "#999",
            marginTop: "20px",
          }}
        >
          Authorized Access Only
        </p>
      </form>
    </div>
  );
}