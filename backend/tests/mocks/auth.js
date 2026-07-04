import request from "supertest";
import app from "../../src/app.js";
import { USER_BASE_URL } from "../setup.js";

export const loginTestUser = async () => {
  const response = await request(app)
    .post(`${USER_BASE_URL/login}`)
    .send({ email: "Test@example.com", password: "Test@1234" });
  const cookie = response.headers['set-cookie'];
  return cookie;
};
