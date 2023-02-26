import { expect, test } from "vitest";
import { removeEntry } from "./remove-entry";

test("remove entry at index 0", () => {
  expect(removeEntry([0, 1, 2], 0)).toStrictEqual([1, 2]);
});

test("remove entry at index 2", () => {
  expect(removeEntry([0, 1, 2], 2)).toStrictEqual([0, 1]);
});
