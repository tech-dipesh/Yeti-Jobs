/// <reference types="jest" />
import { pool } from "../src/db.js";
import "./unit/jobs.test.js"
import "./unit/users.test.js"

afterAll(async () => {
  await pool.end();
});