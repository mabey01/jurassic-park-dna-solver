import { expect, test } from "vitest";
import { getFlatGridIndex } from "./get-flat-grid-index";

test("return correct index for first entry", () => {
  expect(
    getFlatGridIndex(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      [0, 0]
    )
  ).toBe(0);
});

test("return correct index for last grid entry", () => {
  expect(
    getFlatGridIndex(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      [1, 2]
    )
  ).toBe(5);
});

test("return correct index for middle of grid items", () => {
  expect(
    getFlatGridIndex(
      [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ],
      [1, 2]
    )
  ).toBe(6);
});
