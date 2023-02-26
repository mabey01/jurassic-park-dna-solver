import { expect, test } from "vitest";
import { getManhattenDistance } from "./get-manhatten-distance";

test("return a distance of 2 of only 2 adjacent entries are out of place", () => {
  const grid = [
    [1, 2],
    [3, 4],
  ];

  const targetGrid = [
    [1, 2],
    [4, 3],
  ];

  const isValidTarget = (entry: number, targetEntry: number) =>
    entry === targetEntry;

  expect(getManhattenDistance(grid, targetGrid, isValidTarget)).toBe(2);
});

test("return a distance of 4 if 2 entries are 2 tiles out of place", () => {
  const grid = [
    [1, 2, 3],
    [6, 5, 4],
  ];

  const targetGrid = [
    [1, 2, 3],
    [4, 5, 6],
  ];

  const isValidTarget = (entry: number, targetEntry: number) =>
    entry === targetEntry;

  expect(getManhattenDistance(grid, targetGrid, isValidTarget)).toBe(4);
});
