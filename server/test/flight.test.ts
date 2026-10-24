import { describe, expect, it } from "vitest";
import { validateFlightData } from "../src/utils/flight.utils.js";

describe("flight validation", () => {
  it("accepts inclusive limits", () => {
    expect(validateFlightData(0, 0, -100)).toBe(true);
    expect(validateFlightData(3000, 360, 100)).toBe(true);
  });

  it.each(["0", null, undefined, true, [], {}, NaN, Infinity, -Infinity])("rejects non-finite or non-numeric values: %j", (value) => {
    expect(validateFlightData(value, 0, 0)).toBe(false);
    expect(validateFlightData(0, value, 0)).toBe(false);
    expect(validateFlightData(0, 0, value)).toBe(false);
  });
});
