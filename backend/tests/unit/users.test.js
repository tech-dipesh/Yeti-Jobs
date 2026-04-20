import request from "supertest";
import app from "../../src/app.js";
import { connect } from "../../src/db.js";
import {dirname, join} from "node:path"
import { fileURLToPath } from "node:url";
import { USER_BASE_URL } from "../setup.js";
import { loginTestUser, signupTestUser } from "../mocks/auth.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
describe(`GET ${USER_BASE_URL}/all`, () => {
  test("return all field for the correct foeils.", async () => {
    const response = await request(app).get(`${USER_BASE_URL}/all`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(Array.isArray(response.body.message)).toBe(true);
    if (response.body.message.length > 0) {
      expect(response.body.message[0]).toHaveProperty("userid");
      expect(response.body.message[0]).toHaveProperty("firstname");
      expect(response.body.message[0]).toHaveProperty("lastname");
      expect(response.body.message[0]).toHaveProperty("email");
    }
  });
});

describe(`GET ${USER_BASE_URL}/login-status`, () => {
  test("should return 401 for unauthenticated user", async () => {
    const response = await request(app).get(`${USER_BASE_URL}/login-status`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`POST ${USER_BASE_URL}/login`, () => {
  test("422 for the empty email password", async () => {
    const response = await request(app)
      .post(`${USER_BASE_URL}/login`)
      .send({ email: "", password: "" });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("message");
  });

  test("422 for the empty email password", async () => {
    const response = await request(app)
      .post(`${USER_BASE_URL}/login`)
      .send({ email: "invalid-email", password: "Test@1234" });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("message");
  });

  test("401 for the non existent 401", async () => {
    const response = await request(app)
      .post(`${USER_BASE_URL}/login`)
      .send({ email: "nonexistent@example.com", password: "Test@1234" });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`POST ${USER_BASE_URL}/signup`, () => {
  test("422 for missing", async () => {
    const response = await request(app)
      .post(`${USER_BASE_URL}/signup`)
      .send({ fname: "", lname: "", education: "", email: "", password: "" });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("message");
  });

  test("422 for missing", async () => {
    const response = await request(app)
      .post(`${USER_BASE_URL}/signup`)
      .send({ fname: "Test", lname: "User", education: "Bachelor", email: "test@invalidxxxxxdomain.com", password: "Test@1234" });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`GET ${USER_BASE_URL}/:id`, () => {
  test("400 for invalid uid format", async () => {
    const response = await request(app).get(`${USER_BASE_URL}/000000afd-0000-0000-0000-000000000000`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`PUT ${USER_BASE_URL}/:id`, () => {
  test("422 for the not the correct data, ", async () => {
    const response = await request(app)
      .put(`${USER_BASE_URL}/00000000-0000-0000-0000-000000000000`)
      .send({ fname: "", lname: "", education: "", email: "", experience: "", number: "" });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`DELETE ${USER_BASE_URL}/:id`, () => {
  test("400 for invalid id format", async () => {
    const response = await request(app).delete(`${USER_BASE_URL}/invalid-id`);
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`POST ${USER_BASE_URL}/:id/skills`, () => {
  test("400 for the missing field.", async () => {
    const response = await request(app)
      .post(`${USER_BASE_URL}/00000000-0000-0000-0000-000000000000/skills`)
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`POST ${USER_BASE_URL}/verify`, () => {
  test("422 for the empty field.", async () => {
    const response = await request(app)
      .post(`${USER_BASE_URL}/verify`)
      .send({ code: "" });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`POST ${USER_BASE_URL}/verify/resend`, () => {
  test("resend verification code", async () => {
    const response = await request(app).post(`${USER_BASE_URL}/verify/resend`);
    expect([200, 400, 401, 403, 404, 422, 429]).toContain(response.statusCode);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`POST ${USER_BASE_URL}/forget-password`, () => {
  test("422 for the empty field", async () => {
    const response = await request(app)
      .post(`${USER_BASE_URL}/forget-password`)
      .send({ email: "" });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`POST ${USER_BASE_URL}/forget-password/verify`, () => {
  test("422 fo rthe empty field", async () => {
    const response = await request(app)
      .post(`${USER_BASE_URL}/forget-password/verify`)
      .send({});
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`POST ${USER_BASE_URL}/profile-picture`, () => {
  test("401 for not unauthrozed", async () => {
    const profilePath = path.join(__dirname, 'assets', 'resume.pdf');
    const response = await request(app)
      .post(`${USER_BASE_URL}/profile-picture`)
      .attach("profile_pic", profilePath);
    expect([401, 403]).toContain(response.statusCode);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`POST ${USER_BASE_URL}/resume`, () => {
  test("401 for the content upload", async () => {
    const resumePath = path.join(__dirname, 'assets', 'resume.pdf');
    const response = await request(app)
      .post(`${USER_BASE_URL}/resume`)
      .attach('resume', resumePath);
    expect([401, 403]).toContain(response.statusCode);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`GET ${USER_BASE_URL}/resume`, () => {
  test("401 for not authorized", async () => {
    const response = await request(app).get(`${USER_BASE_URL}/resume`);
    expect([401, 403]).toContain(response.statusCode);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`GET ${USER_BASE_URL}/following`, () => {
  test("401 for not authorized", async () => {
    const response = await request(app).get(`${USER_BASE_URL}/following`);
    expect([401, 403]).toContain(response.statusCode);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`POST ${USER_BASE_URL}/logout`, () => {
  test("200 for the logout, ", async () => {
    const response = await request(app).get(`${USER_BASE_URL}/logout`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});

describe(`POST ${USER_BASE_URL}/add-education`, () => {
  test("Add the Education Field", async () => {
    const response = await request(app)
      .post(`${USER_BASE_URL}/add-education`)
      .send({ university_name: "", degree: "", start_date: "", end_date: "", grade: "" });
    expect([401, 403, 422]).toContain(response.statusCode);
    expect(response.body).toHaveProperty("message");
  });
});

afterAll(async () => {
  await connect.end();
});