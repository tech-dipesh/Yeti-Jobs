/// <reference types="jest" />
import request from "supertest";
import app from "../../src/app.js";
import { connect } from "../../src/db.js";
import { JOB_BASE_URL } from "../setup.js";

describe(`GET ${JOB_BASE_URL}`, () => {
  test("Return all the Jobs with teh Pagination", async () => {
    const response = await request(app).get(`${JOB_BASE_URL}`).query({
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

  test("sort by testing whether correct or not", async () => {
    const response = await request(app).get(`${JOB_BASE_URL}`).query({
      page: 1,
      limit: 10,
      sortby: "invalid_column",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`GET ${JOB_BASE_URL}/search`, () => {
  test("When there is no search", async () => {
    const response = await request(app).get(`${JOB_BASE_URL}/search`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("Unauthorized User Search", async () => {
    const response = await request(app).get(`${JOB_BASE_URL}/search`).query({ title: "developer" });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`GET ${JOB_BASE_URL}/:id`, () => {
  test("Invalid Jobs Id", async () => {
    const response = await request(app).get(`${JOB_BASE_URL}/random_uuid`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("No Exist Jobs Id", async () => {
    const response = await request(app).get(`${JOB_BASE_URL}/00000000-0000-0000-0000-000000000000`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`POST ${JOB_BASE_URL}/new`, () => {
  test("UnAuthorized Job Creation", async () => {
    const response = await request(app)
      .post(`${JOB_BASE_URL}/new`)
      .send({ title: "Test Job", description: "Test Description", job_type: "Full-time", salary: 50000, skills: ["JavaScript"], experience_years: 2 });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Invalid Job Data", async () => {
    const response = await request(app)
      .post(`${JOB_BASE_URL}/new`)
      .send({ title: "", description: "", job_type: "", salary: "", skills: "", experience_years: "" });
    expect([401, 404, 422]).toContain(response.statusCode);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`PUT ${JOB_BASE_URL}/:id/edit`, () => {
  test("Invalid UUid", async () => {
    const response = await request(app)
      .put(`${JOB_BASE_URL}/random_uuid/edit`)
      .send({ title: "Updated Job", description: "Updated Description", job_type: "Part-time", salary: 60000, skills: ["React"], location: "Remote" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("Unauthorized", async () => {
    const response = await request(app)
      .put(`${JOB_BASE_URL}/00000000-0000-0000-0000-000000000000/edit`)
      .send({ title: "Updated Job", description: "Updated Description", job_type: "Part-time", salary: 60000, skills: ["React"], location: "Remote" });
    expect([401, 403, 400]).toContain(response.statusCode);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`DELETE ${JOB_BASE_URL}/:id/delete`, () => {
  test("Invalid uuid", async () => {
    const response = await request(app).delete(`${JOB_BASE_URL}/random_uuid/delete`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("UnAuthroized Access", async () => {
    const response = await request(app).delete(`${JOB_BASE_URL}/00000000-0000-0000-0000-000000000000/delete`);
    expect([401, 403]).toContain(response.statusCode);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`GET ${JOB_BASE_URL}/saved_jobs/list`, () => {
  test("UnAuthroized Access", async () => {
    const response = await request(app).get(`${JOB_BASE_URL}/saved_jobs/list`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`POST ${JOB_BASE_URL}/:id/bookmark_job`, () => {
  test("Invalid uuid", async () => {
    const response = await request(app).post(`${JOB_BASE_URL}/random_uuid/bookmark_job`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

});

describe(`DELETE ${JOB_BASE_URL}/:id/remove_from_bookmark`, () => {
  test("invalid uuid", async () => {
    const response = await request(app).delete(`${JOB_BASE_URL}/random_uuid/remove_from_bookmark`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

});

describe(`GET ${JOB_BASE_URL}/:id/verify-owner`, () => {
  test("invalid uuid", async () => {
    const response = await request(app).get(`${JOB_BASE_URL}/random_uuid/verify-owner`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("unaothorized access", async () => {
    const response = await request(app).get(`${JOB_BASE_URL}/00000000-0000-0000-0000-000000000000/verify-owner`);
    expect([401, 403]).toContain(response.statusCode);
    expect(response.body).toHaveProperty("message");
  });
});

afterAll(async () => {
  await connect.end();
});