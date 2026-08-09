import dotenv from 'dotenv';
import dns from 'dns';
import postgres from 'postgres';

dotenv.config({ quiet: true });

// Prefer IPv4 over IPv6
dns.setDefaultResultOrder('ipv4first');

const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require'
});

class Database {
  async query(query, params = []) {
    return sql.unsafe(query, params);
  }
}

export default new Database();