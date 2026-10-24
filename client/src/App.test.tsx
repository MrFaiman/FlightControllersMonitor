// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  // Layout and canvas painting are browser responsibilities, not exercised here.
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("dashboard", () => {
  it("switches repeatedly between text and canvas without changing Hook order", () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll("canvas")).toHaveLength(3);
    fireEvent.click(screen.getByRole("button", { name: "Text" }));
    expect(container.querySelectorAll("canvas")).toHaveLength(0);
    expect(screen.getByText("1700")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Visual" }));
    expect(container.querySelectorAll("canvas")).toHaveLength(3);
    fireEvent.click(screen.getByRole("button", { name: "Text" }));
    expect(screen.getByText("1700")).toBeTruthy();
  });

  it("opens and reopens the dialog with fresh instrument state", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    const altitude = screen.getByLabelText("Altitude") as HTMLInputElement;
    expect(altitude.value).toBe("1700");
    fireEvent.change(altitude, { target: { value: "1000" } });
    fireEvent.click(screen.getByRole("button", { name: "X" }));
    expect(screen.queryByLabelText("Altitude")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect((screen.getByLabelText("Altitude") as HTMLInputElement).value).toBe("1700");
  });

  it("reports a failed API write as an error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "Database unavailable" }), { status: 500 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    fireEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(await screen.findByText("Error sending flight data")).toBeTruthy();
    expect(screen.queryByText("Flight data sent successfully")).toBeNull();
  });
});
