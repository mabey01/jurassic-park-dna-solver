import { expect, test } from "vitest";
import { moveEntry } from "./move-entry";

test("move entry from 0 to 1", () => {
  const array = [1, 2, 3];
  expect(moveEntry(array, 0, 1)).toStrictEqual([2, 1, 3]);
});

test("move entry from 0 to  -1", () => {
  const array = [1, 2, 3];
  expect(moveEntry(array, 0, -1)).toStrictEqual([2, 3, 1]);
});
