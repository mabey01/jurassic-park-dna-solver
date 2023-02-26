import { expect, test } from "vitest";
import { getUnflattenGrid } from "./unflatten-grid";

test("return unflatten grid of a single row grid", () => {
  expect(
    getUnflattenGrid([1, 2, 3], { numberOfColumns: 3, numberOfRows: 1 })
  ).toStrictEqual([[1, 2, 3]]);
});

test("return unflatten grid of a multi row grid", () => {
  expect(
    getUnflattenGrid([1, 2, 3, 4, 5, 6], {
      numberOfColumns: 3,
      numberOfRows: 2,
    })
  ).toStrictEqual([
    [1, 2, 3],
    [4, 5, 6],
  ]);
});
