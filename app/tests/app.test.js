const request = require("supertest");
const app = require("../src/app");

describe("TechWave API", () => {

  test("GET /health returns UP", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("UP");
  });

  test("GET /version returns version", async () => {
    const response = await request(app).get("/version");

    expect(response.statusCode).toBe(200);
    expect(response.body.version).toBe("1.0.0");
  });

});
