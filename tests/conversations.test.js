import request from "supertest";
import app from "../app.js";
import { prisma } from "../lib/prisma.js";

afterAll(async () => {
  await prisma.$disconnect();
});

describe("GET /conversations", () => {
  test("return 401 when unauthorized", async () => {
    await request(app).get("/api/conversations").expect(401);
  });

  test("return 200 when authorized", async () => {
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ username: `test_1773927962259`, password: "123456" });

    const token = loginResponse.body.token;

    await request(app)
      .get("/api/conversations")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
  test("return array of conversations when authorized", async () => {
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ username: `test_1773927962259`, password: "123456" });

    const token = loginResponse.body.token;

    const response = await request(app)
      .get("/api/conversations")
      .set("Authorization", `Bearer ${token}`);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /conversations", () => {
  test("rejects unauthenticated requests", async () => {
    await request(app)
      .post("/api/conversations")
      .send({ participants: [1, 2] })
      .expect(401);
  });

  test("creates new conversation when none exists", async () => {
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ username: `test_1773927962259`, password: "123456" });
    const token = loginResponse.body.token;
    const response = await request(app)
      .post("/api/conversations")
      .set("Authorization", `Bearer ${token}`)
      .send({ user1Id: 21, user2Id: 22 }); // update each id for every test run
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  test("returns existing conversation if already exists", async () => {
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ username: `test_1773927962259`, password: "123456" });
    const token = loginResponse.body.token;
    
    // Create first
    await request(app)
      .post("/api/conversations")
      .set("Authorization", `Bearer ${token}`)
      .send({ participants: [1, 2] });
    
      // Try to create again
    const response = await request(app)
      .post("/api/conversations")
      .set("Authorization", `Bearer ${token}`)
      .send({ participants: [1, 2] });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });
});

describe("GET /conversations/:id", () => {
  test("returns 401 if unauthorized", async () => {
    await request(app).get("/api/conversations/1").expect(401);
  });

  test("returns 404 if conversation does not exist", async () => {
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ username: `test_1773927962259`, password: "123456" });
    const token = loginResponse.body.token;
    await request(app)
      .get("/api/conversations/999999")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("returns 200 and conversation if authorized", async () => {
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ username: `test_1773927962259`, password: "123456" });
    const token = loginResponse.body.token;
    // Create conversation
    const createResponse = await request(app)
      .post("/api/conversations")
      .set("Authorization", `Bearer ${token}`)
      .send({ participants: [1, 2] });
    const conversationId = createResponse.body.id;
    const response = await request(app)
      .get(`/api/conversations/${conversationId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });
});
