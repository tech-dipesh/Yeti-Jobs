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

describe(`GET ${BASEURL}/jobs/f989f97-361c-4b58-9e91-95b5d478392a`, () => {
  describe("Single Job Query", () => {
    test("Not Correct Job id", async () => {
      const response = await request(app).get(
        `${BASEURL}/jobs/f989f97-361c-4b58-9e91-95b5d478392`,
      );
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message");
    });
    test("Correct Job Id", async () => {
      const response = await request(app).get(
        `${BASEURL}/jobs/f3517f94-968f-4494-9db7-7d898b5dd61a`,
      );
      console.log('res', response)
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("message");
    });
  });
});
afterAll(async () => {
  await connect.end();
});
