import { afterEach, describe, expect, it, vi } from "vitest";
import { createFlightData } from "./api";

const flight = { altitude: 1700, his: 45, adi: 50 };
afterEach(() => vi.unstubAllGlobals());

describe("createFlightData", () => {
  it("sends JSON and returns the success message", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "saved" }), { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(createFlightData(flight)).resolves.toEqual({ message: "saved" });
    expect(fetchMock).toHaveBeenCalledWith("/api/flight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flight),
    });
  });

  it("rejects non-success responses instead of reporting success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "Invalid flight data" }), { status: 400 })));
    await expect(createFlightData(flight)).rejects.toThrow("Invalid flight data");
  });

  it("propagates network failures", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    await expect(createFlightData(flight)).rejects.toThrow("offline");
  });
});
