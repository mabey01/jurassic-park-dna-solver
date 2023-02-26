import { expect, test } from "vitest";
import { popRandomEntry } from "./pop-random-entry";

test("should return undefined when popping from an empty array", () => {
  expect(popRandomEntry([])).toBe(undefined);
});

test("should return a random entry and remove that entry from array", () => {
  const array = [1, 2, 3, 4, 5];
  const poppedElement = popRandomEntry(array);
  expect(poppedElement).toBeDefined();
  expect(array.length).toBe(4);
  expect(array).not.toContain(poppedElement);
});
