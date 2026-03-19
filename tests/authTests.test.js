import request from "supertest";
import app from "../app.js";
import { prisma } from "../lib/prisma.js";

afterAll(async () => {
  await prisma.$disconnect();
});

describe("protected routes reject unauthenticated requests", () => {
  test("/conversations reject unauthenticated requests", (done) => {
    request(app).get("/api/conversations").expect(401, done);
  });
  test("/users reject unauthenticated requests", (done) => {
    request(app).get("/api/users").expect(401, done);
  });
});

describe("POST /auth/login", () => {
  test("valid request body returns 200", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        username: `test_1773927962259`,
        password: "123456",
      })
      .set("Accept", "application/json");
    expect(response.status).toEqual(200);
  });

  test("valid request body returns json", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        username: `test_1773927962259`,
        password: "123456",
      })
      .set("Accept", "application/json");
    expect(200);
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  test("invalid credentials returns 401", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        username: `nonexistent_user_${Date.now()}`,
        password: "wrongpassword",
      })
      .set("Accept", "application/json");
    expect(response.status).toEqual(401);
  });
});

describe("POST /auth/register", () => {
  test("valid request body returns 201", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        username: `test_${Date.now()}`,
        displayName: "Test User",
        password: "123456",
        passwordConfirmation: "123456",
      })
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(201);
  });

  test("valid request body returns JSON", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        username: `test_${Date.now()}`,
        displayName: "Test User",
        password: "123456",
        passwordConfirmation: "123456",
      })
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  test("invalid request body returns 400", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        username: `test_${Date.now()}`,
        displayName: "Test User",
      })
      .set("Accept", "application/json");
    expect(response.status).toEqual(400);
  });

  test("invalid request body returns validationErrors array", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        username: `test_${Date.now()}`,
        displayName: "Test User",
      });
    expect(Array.isArray(response.body.validationErrors)).toBe(true);
  });

  test("duplicate usernames returns 400", async () => {
    const username = `duplicate_${Date.now()}`;
    await request(app).post("/api/auth/register").send({
      username,
      displayName: "Test User",
      password: "123456",
      passwordConfirmation: "123456",
    });
    const response = await request(app).post("/api/auth/register").send({
      username,
      displayName: "Test User",
      password: "123456",
      passwordConfirmation: "123456",
    });
    expect(response.status).toEqual(400);
  });
});
