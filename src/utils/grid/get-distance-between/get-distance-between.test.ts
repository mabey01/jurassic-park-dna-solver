import { expect, test } from "vitest";
import { getDistanceBetween } from "./get-distance-between";

test("get distance of 1 between directly adjacent grid entries", () => {
  const grid = [[1, 2, 3, 4]];

  expect(
    getDistanceBetween(
      grid,
      (entry) => entry === 1,
      (entry) => entry === 2
    )
  ).toBe(1);
});

test("get distance of 1 between vertically adjacent grid entries", () => {
  const grid = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ];

  expect(
    getDistanceBetween(
      grid,
      (entry) => entry === 1,
      (entry) => entry === 5
    )
  ).toBe(1);
});

test("get distance of 2 between diagonally adjacent grid entries", () => {
  const grid = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ];

  expect(
    getDistanceBetween(
      grid,
      (entry) => entry === 1,
      (entry) => entry === 6
    )
  ).toBe(2);
});

test("get distance of NaN if at least 1 entry doesnt exist in grid", () => {
  const grid = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ];

  expect(
    getDistanceBetween(
      grid,
      (entry) => entry === 1,
      (entry) => entry === 99
    )
  ).toBeNaN();

  expect(
    getDistanceBetween(
      grid,
      (entry) => entry === 100,
      (entry) => entry === 99
    )
  ).toBeNaN();
});
