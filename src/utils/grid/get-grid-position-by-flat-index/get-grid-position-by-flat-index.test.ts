import { expect, test } from "vitest";
import { getGridPositionByFlatIndex } from "./get-grid-position-by-flat-index";

test("get position of first grid entry", () => {
  expect(getGridPositionByFlatIndex([[1]], 0)).toStrictEqual([0, 0]);
});

test("get position of last grid entry", () => {
  expect(
    getGridPositionByFlatIndex(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      5
    )
  ).toStrictEqual([1, 2]);
});

test("get position of center grid entry", () => {
  expect(
    getGridPositionByFlatIndex(
      [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ],
      6
    )
  ).toStrictEqual([1, 2]);
});
