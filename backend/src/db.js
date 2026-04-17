import { Client } from "pg";
import "dotenv/config"

const client = new Client({
  connectionString: process.env.DATABASE_PASSWORD,
  ssl: {rejectUnauthorized: false},
});
try {
  if(!(process.env.DATABASE_PASSWORD)){
    throw new Error("Please Enter DATABASE_PASSWORD")
  }
  await client.connect()
  console.log('connected to database');
} catch (error) {
  console.log('err', error)
  console.log('unable to connect', error.message)
}
export { client as connect };
export default client;