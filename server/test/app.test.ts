import { afterEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";
import FlightData from "../src/models/flight.model.js";

afterEach(() => vi.restoreAllMocks());

describe("flight API", () => {
  it("returns API health without connecting to MongoDB", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Flight Instruments API");
  });

  it("persists valid numeric data", async () => {
    const save = vi.spyOn(FlightData.prototype, "save").mockResolvedValueOnce(undefined);
    const response = await request(app).post("/api/flight").send({ altitude: 1700, his: 45, adi: 50 });
    expect(response.status).toBe(201);
    expect(save).toHaveBeenCalledOnce();
    expect(save.mock.instances[0]).toMatchObject({ altitude: 1700, his: 45, adi: 50 });
  });

  it.each([
    {},
    { altitude: "1700", his: 45, adi: 50 },
    { altitude: null, his: 45, adi: 50 },
    { altitude: 3001, his: 45, adi: 50 },
    { altitude: 1700, his: 361, adi: 50 },
    { altitude: 1700, his: 45, adi: -101 },
  ])("rejects invalid data: %j", async (body) => {
    const save = vi.spyOn(FlightData.prototype, "save");
    const response = await request(app).post("/api/flight").send(body);
    expect(response.status).toBe(400);
    expect(save).not.toHaveBeenCalled();
  });

  it("rejects missing and malformed bodies", async () => {
    expect((await request(app).post("/api/flight")).status).toBe(400);
    const response = await request(app).post("/api/flight").set("Content-Type", "application/json").send("{");
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid JSON body");
  });

  it("rejects oversized bodies", async () => {
    const response = await request(app).post("/api/flight").send({ data: "x".repeat(17_000) });
    expect(response.status).toBe(413);
  });

  it("does not expose database errors", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(FlightData.prototype, "save").mockRejectedValueOnce(new Error("private database details"));
    const response = await request(app).post("/api/flight").send({ altitude: 1700, his: 45, adi: 50 });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Error saving flight data" });
  });

  it("returns JSON for unknown API routes", async () => {
    const response = await request(app).get("/api/missing");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("API endpoint not found");
  });
});
