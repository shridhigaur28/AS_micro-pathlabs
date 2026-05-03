import mongoose from "mongoose";
import dns from "dns";
import { Resolver } from "dns/promises";

dns.setDefaultResultOrder("ipv4first");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * If the MONGODB_URI uses mongodb+srv://, manually resolve the SRV records
 * via Google Public DNS (8.8.8.8) and convert it to a standard mongodb:// URI.
 * This fixes environments where the local DNS cannot resolve SRV records.
 */
async function resolveURI(uri) {
  if (!uri.startsWith("mongodb+srv://")) {
    return uri;
  }

  try {
    // Parse the srv URI
    const url = new URL(uri.replace("mongodb+srv://", "https://"));
    const hostname = url.hostname;
    const username = url.username;
    const password = url.password;
    const pathname = url.pathname; // e.g. /appointmentsDB
    const search = url.search; // e.g. ?retryWrites=true&w=majority

    // Resolve SRV records using Google DNS
    const resolver = new Resolver();
    resolver.setServers(["8.8.8.8", "8.8.4.4"]);

    const srvRecords = await resolver.resolveSrv(`_mongodb._tcp.${hostname}`);

    // Also resolve TXT records for connection options
    let txtOptions = "";
    try {
      const txtRecords = await resolver.resolveTxt(hostname);
      if (txtRecords.length > 0) {
        txtOptions = txtRecords[0].join("");
      }
    } catch {
      // TXT records are optional
    }

    // Build the hosts string (host:port,host:port,...)
    const hosts = srvRecords
      .map((record) => `${record.name}:${record.port}`)
      .join(",");

    // Collect all query params, deduplicating by key
    const params = new URLSearchParams();
    params.set("ssl", "true");
    params.set("authSource", "admin");

    // Merge TXT record options (usually replicaSet, authSource)
    if (txtOptions) {
      const txtParams = new URLSearchParams(txtOptions);
      for (const [key, value] of txtParams) {
        params.set(key, value);
      }
    }

    // Merge original URI search params
    if (search) {
      const origParams = new URLSearchParams(search);
      for (const [key, value] of origParams) {
        params.set(key, value);
      }
    }

    const newURI = `mongodb://${username}:${password}@${hosts}${pathname}?${params.toString()}`;

    console.log("✅ SRV resolved successfully via Google DNS");
    return newURI;
  } catch (err) {
    console.error("❌ SRV resolution failed:", err.message);
    // Fall back to original URI in case local DNS works
    return uri;
  }
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("🔄 Connecting to MongoDB...");

    // Wrap SRV resolution + connection in a single promise to prevent race conditions
    cached.promise = (async () => {
      const resolvedURI = await resolveURI(MONGODB_URI);
      return mongoose.connect(resolvedURI, {
        dbName: "appointmentsDB",
        family: 4, // Force IPv4
      });
    })()
      .then((mongoose) => {
        console.log("✅ MongoDB Connected Successfully");
        return mongoose;
      })
      .catch((err) => {
        // Reset promise so the next call retries
        cached.promise = null;
        console.error("❌ MongoDB Connection Error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;