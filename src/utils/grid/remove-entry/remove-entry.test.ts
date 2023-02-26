import { expect, test } from "vitest";
import { removeEntry } from "./remove-entry";

test("remove first entry from grid", () => {
  expect(
    removeEntry(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      [0, 0]
    )
  ).toStrictEqual([
    [2, 3, 4],
    [5, 6],
  ]);
});

test("remove last entry from grid", () => {
  expect(
    removeEntry(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      [1, 2]
    )
  ).toStrictEqual([
    [1, 2, 3],
    [4, 5],
  ]);
});

test("remove center entry from grid", () => {
  expect(
    removeEntry(
      [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ],
      [1, 2]
    )
  ).toStrictEqual([
    [1, 2, 3, 4],
    [5, 6, 8, 9],
    [10, 11, 12],
  ]);
});
