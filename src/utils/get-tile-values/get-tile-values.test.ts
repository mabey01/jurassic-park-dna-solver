import { expect, test } from "vitest";
import { getTileValues } from "./get-tile-values";

test("should get 2 of each colors for a 2x4 grid", () => {
  const result = getTileValues(8);
  expect(result.length).toBe(8);

  const aValues = result.filter((value) => value === "a");
  const cValues = result.filter((value) => value === "c");
  const gValues = result.filter((value) => value === "g");
  const tValues = result.filter((value) => value === "t");

  expect(aValues.length).toBe(2);
  expect(cValues.length).toBe(2);
  expect(gValues.length).toBe(2);
  expect(tValues.length).toBe(2);
});

test("should get 4 of each colors for a 2x8 grid", () => {
  const result = getTileValues(16);
  expect(result.length).toBe(16);

  const aValues = result.filter((value) => value === "a");
  const cValues = result.filter((value) => value === "c");
  const gValues = result.filter((value) => value === "g");
  const tValues = result.filter((value) => value === "t");

  expect(aValues.length).toBe(4);
  expect(cValues.length).toBe(4);
  expect(gValues.length).toBe(4);
  expect(tValues.length).toBe(4);
});
