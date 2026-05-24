import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Add a global variable for cache persistence in development
declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (!MONGODB_URI) {
    console.warn("⚠️ MONGODB_URI is not set in environment variables. Database operations will fall back to local simulations.");
    return null;
  }

  if (cached && cached.conn) {
    return cached.conn;
  }

  if (cached && !cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("🔌 Successfully connected to MongoDB.");
      return mongooseInstance;
    }).catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    });
  }

  try {
    if (cached) {
      cached.conn = await cached.promise;
      return cached.conn;
    }
  } catch (e) {
    if (cached) {
      cached.promise = null;
    }
    console.error("❌ Failed to resolve MongoDB connection promise.", e);
  }
  return null;
}

// Memory failover backup for preview when MongoDB is unconfigured
const memoryState = {
  orders: [] as any[],
  subscribers: [] as any[],
  submissions: [] as any[]
};

export function saveInMemoryOrder(order: any) {
  memoryState.orders.push(order);
  console.log("💾 Order saved to preview in-memory DB since real MongoDB MongoDB is not connected:", order);
}

export function saveInMemorySubscriber(subscriber: any) {
  memoryState.subscribers.push(subscriber);
  console.log("💾 Subscriber saved to preview in-memory DB:", subscriber);
}

export function saveInMemorySubmission(submission: any) {
  memoryState.submissions.push(submission);
  console.log("💾 Submission saved to preview in-memory DB:", submission);
}

export function getInMemoryData() {
  return memoryState;
}
