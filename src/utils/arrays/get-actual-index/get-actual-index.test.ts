import { expect, test } from "vitest";
import { getActualIndex } from "./get-actual-index";

test("should return same index if index is between 0 and array.length", () => {
  expect(getActualIndex([0, 1, 2], 0)).toBe(0);
  expect(getActualIndex([0, 1, 2], 1)).toBe(1);
  expect(getActualIndex([0, 1, 2], 3)).toBe(3);
});

test("should return array.length if provided index is bigger than array.length", () => {
  expect(getActualIndex([0, 1, 2], 4)).toBe(3);
  expect(getActualIndex([0, 1, 2], 40000)).toBe(3);
});

test("should return array.length - 1 if provided index is -1", () => {
  expect(getActualIndex([0, 1, 2], -1)).toBe(2);
});

test("should return 0 if provided index is smaller array.length * -1", () => {
  expect(getActualIndex([0, 1, 2], -99)).toBe(0);
});
