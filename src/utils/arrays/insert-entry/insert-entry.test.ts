import { expect, test } from "vitest";
import { insertEntry } from "./insert-entry";

test("insert entry at the correct index", () => {
  expect(insertEntry([1, 2, 3], 0, 99)).toStrictEqual([99, 1, 2, 3]);
  expect(insertEntry([1, 2, 3], 1, 99)).toStrictEqual([1, 99, 2, 3]);
});

test("insert entry at the last position if provided index is bigger than array length", () => {
  expect(insertEntry([1, 2, 3], 99, 99)).toStrictEqual([1, 2, 3, 99]);
});

test("insert entry at the last position if provided index is -1", () => {
  expect(insertEntry([1, 2, 3], -1, 99)).toStrictEqual([1, 2, 3, 99]);
});
