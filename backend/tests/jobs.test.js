/// <reference types="jest" />
import request from "supertest";
import app from "../src/app.js";
import { connect } from "../src/db.js";
const BASEURL = `/api/v1`;
describe(`GET ${BASEURL}/jobs`, () => {
  describe("All Jobs Query ", () => {
    test("must return a all queries", async () => {
      const response = await request(app).get(`${BASEURL}/jobs`).query({
        page: 1,
        limit: 10,
        sortby: "created_at",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("limit");
      expect(response.body).toHaveProperty("page");
      expect(response.body).toHaveProperty("total");
      expect(Array.isArray(response.body.message)).toBe(true);
    });
    test("Not Correct Query", async () => {
      const response = await request(app).get(`${BASEURL}/jobs`).query({
        page: 1,
        limit: 10,
        sortby: "password",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message");
    });
  });
});

describe(`GET ${BASEURL}/jobs/:id`, () => {
  describe("Single Job Query", () => {
    test("must return a Single queries", async () => {
      const response = await request(app).get(`${BASEURL}/jobs/:id`).query({
        page: 1,
        limit: 10,
        sortby: "created_at",
      });

    })
  })
})

afterAll(async () => {
  await connect.end();
});
