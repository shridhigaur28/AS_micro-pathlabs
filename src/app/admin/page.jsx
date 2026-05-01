"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (!isAdmin) {
      router.push("/admin/login");
      return;
    }

    // ✅ inline async function (BEST PRACTICE)
    const loadData = async () => {
      try {
        const res = await fetch("/api/appointments");
        const result = await res.json();
        setData(result.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    loadData();
  }, [router]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this booking?")) return;

    try {
      await fetch("/api/appointments", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      // reload data
      const res = await fetch("/api/appointments");
      const result = await res.json();
      setData(result.data || []);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Appointments</h1>

      <button
        onClick={() => {
          localStorage.removeItem("isAdmin");
          router.push("/admin/login");
        }}
      >
        Logout
      </button>

      {data.map((item) => (
        <div key={item._id} style={{ marginTop: "10px" }}>
          <p>
            {item.name} - {item.phone} - {item.test}
          </p>

          <button onClick={() => handleDelete(item._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}