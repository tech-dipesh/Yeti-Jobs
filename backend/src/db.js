import { Client } from "pg";
import "dotenv/config"

const client = new Client({
  connectionString: process.env.DATABASE_PASSWORD,
  ssl: {rejectUnauthorized: false}
});
try {
  await client.connect()
  console.log('connected to database');
} catch (error) {
    console.log('unable to connect', error)
}
export { client as connect };
export default client;