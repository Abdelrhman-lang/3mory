import "server-only";
import { drizzle } from 'drizzle-orm/neon-serverless'; // 👈 تغيير هنا لـ neon-serverless
import { neonConfig, Pool } from '@neondatabase/serverless';
import * as schema from "./schema";
import ws from 'ws';

// تفعيل الـ WebSockets للـ Local Environment
if (process.env.NODE_ENV === 'development') {
    neonConfig.webSocketConstructor = ws;
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });