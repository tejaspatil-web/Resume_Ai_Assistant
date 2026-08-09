import dotenv from 'dotenv'
import postgres from 'postgres'

dotenv.config({ quiet:true })
const sql = postgres(process.env.DATABASE_URL,{
     ssl: "require"
})

class Database {
  async query(query, params = []) {
    return sql.unsafe(query, params);
  }
}

export default new Database();