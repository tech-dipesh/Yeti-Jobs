import request from "supertest";
import app from "../src/app.js";
import { connect } from "../src/db.js";
const BASEURL = `/api/v1`;
describe("GET /jobs", () => {
  describe("valid query is have ", () => {
    test("must return a all queries", async () => {
      const response = await request(app).get(`${BASEURL}/jobs`).query({
        page: 1,
        limit: 10,
        sortby: "created_at"
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("limit");
      expect(response.body).toHaveProperty("page");
      expect(response.body).toHaveProperty("total");
    });
    test("the message should be on the array field", async () => {
      const response = await request(app).get(`${BASEURL}/jobs`).query({
        page: 1,
        limit: 10,
        sortby: "created_at",
      });
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body.message)).toBe(true);
    });
  });
});

afterAll(async () => {
  await connect.end();
});
