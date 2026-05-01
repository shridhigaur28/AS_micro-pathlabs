"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminPage() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const prevCountRef = useRef(0);
  const firstLoadRef = useRef(true);

  const loadData = useCallback(async (showAlert = false) => {
    try {
      const res = await fetch("/api/appointments", {
        cache: "no-store",
      });

      const result = await res.json();
      const newData = Array.isArray(result?.data) ? result.data : [];

      if (
        !firstLoadRef.current &&
        showAlert &&
        newData.length > prevCountRef.current
      ) {
        alert("🔔 New booking received!");
      }

      prevCountRef.current = newData.length;
      firstLoadRef.current = false;
      setData(newData);

      return newData;
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      loadData(true);
    }, 5000);

    return () => clearInterval(interval);
  }, [loadData]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadData(true);
    }, 5000);

    return () => clearInterval(interval);
  }, [loadData]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch("/api/appointments", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      const result = await res.json();

      if (!result?.success) {
        alert(result?.message || "Status update failed");
        return false;
      }

      await loadData(false);
      return true;
    } catch (error) {
      console.error("Status error:", error);
      alert("Status update failed");
      return false;
    }
  };

  const handleDelete = async (id) => {
    const ok = confirm("Delete this booking?");
    if (!ok) return;

    try {
      const res = await fetch("/api/appointments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();

      if (!result?.success) {
        alert(result?.message || "Delete failed");
        return;
      }

      await loadData(false);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    }
  };

  const filtered = data.filter((item) => {
    const q = search.toLowerCase();
    return (
      (item.name || "").toLowerCase().includes(q) ||
      (item.mobile || "").includes(search)
    );
  });

  const getStatusStyles = (status) => {
    if (status === "confirmed") {
      return {
        background: "#d4edda",
        color: "#155724",
      };
    }

    if (status === "cancelled") {
      return {
        background: "#f8d7da",
        color: "#721c24",
      };
    }

    return {
      background: "#fff3cd",
      color: "#856404",
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255,255,255,0.8)",
        }}
      />

      <div style={{ position: "relative", padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Image
              src="/logo.png"
              alt="AS Micro Path Lab"
              width={54}
              height={54}
              style={{ objectFit: "contain" }}
            />
            <div>
              <h1
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  fontSize: "24px",
                  color: "#1a3c40",
                }}
              >
                AS Micro Path Lab
              </h1>
              <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
                Admin Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("isAdmin");
              router.replace("/admin/login");
            }}
            style={{
              padding: "8px 12px",
              background: "#d9534f",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Logout
          </button>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <input
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px 12px",
              width: "min(320px, 100%)",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "20px",
              outline: "none",
            }}
          />

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ background: "#f4f6f8" }}>
                  {[
                    "Name",
                    "Mobile",
                    "Test",
                    "Date",
                    "Time",
                    "City",
                    "Collection",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        textAlign: "left",
                        padding: "12px",
                        borderBottom: "1px solid #e6e6e6",
                        color: "#333",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ padding: "16px", color: "#666" }}>
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item._id}>
                      <td style={cellStyle}>{item.name}</td>
                      <td style={cellStyle}>{item.mobile}</td>
                      <td style={cellStyle}>{item.testRequired}</td>
                      <td style={cellStyle}>
                        {item.preferredDate
                          ? new Date(item.preferredDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td style={cellStyle}>{item.preferredTimeSlot || "-"}</td>
                      <td style={cellStyle}>{item.city}</td>
                      <td style={cellStyle}>{item.collectionType}</td>
                      <td style={cellStyle}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 10px",
                            borderRadius: "999px",
                            fontWeight: 600,
                            textTransform: "capitalize",
                            ...getStatusStyles(item.status),
                          }}
                        >
                          {item.status || "pending"}
                        </span>
                      </td>
                      <td style={cellStyle}>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          <button
                            onClick={async () => {
                              const ok = await updateStatus(item._id, "confirmed");
                              if (!ok) return;

                              const message = `Dear ${item.name},\n\nYour ${item.testRequired} appointment has been confirmed.\n\n📅 Date: ${item.preferredDate
                                ? new Date(item.preferredDate).toLocaleDateString()
                                : "-"
                                }\n⏰ Time: ${item.preferredTimeSlot || "-"}\n\nAS Micro Path Lab`;

                              const url = `https://wa.me/91${item.mobile}?text=${encodeURIComponent(
                                message
                              )}`;

                              window.open(url, "_blank", "noopener,noreferrer");
                            }}
                            style={confirmBtn}
                          >
                            Confirm
                          </button>

                          <button
                            onClick={() => updateStatus(item._id, "cancelled")}
                            style={cancelBtn}
                          >
                            Cancel
                          </button>

                          <button
                            onClick={() => handleDelete(item._id)}
                            style={deleteBtn}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const cellStyle = {
  padding: "12px",
  borderBottom: "1px solid #f0f0f0",
  color: "#333",
  verticalAlign: "top",
  whiteSpace: "nowrap",
};

const confirmBtn = {
  background: "#28a745",
  color: "#fff",
  padding: "6px 10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 600,
};

const cancelBtn = {
  background: "#dc3545",
  color: "#fff",
  padding: "6px 10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 600,
};

const deleteBtn = {
  background: "#6c757d",
  color: "#fff",
  padding: "6px 10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 600,
};