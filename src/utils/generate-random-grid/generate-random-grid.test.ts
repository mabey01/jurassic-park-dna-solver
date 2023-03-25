import { expect, test } from "vitest";
import { generateRandomGrid } from "./generate-random-grid";

test("should return an empty grid if rows and columns are length 0", () => {
  expect(generateRandomGrid(0, 0)).toStrictEqual([]);
});

test("should return a grid with correct dimensions", () => {
  const randomGrid = generateRandomGrid(1, 2);
  expect(randomGrid.length).toBe(1);
  expect(randomGrid[0]!.length).toBe(2);
});

test("should return a grid with equal amount of unique tile values", () => {
  const randomGrid = generateRandomGrid(2, 4);
  const tiles = randomGrid.flat();
  expect(tiles.length).toBe(8);

  const aTiles = tiles.filter((tile) => tile.type === "a");
  const cTiles = tiles.filter((tile) => tile.type === "c");
  const gTiles = tiles.filter((tile) => tile.type === "g");
  const tTiles = tiles.filter((tile) => tile.type === "t");

  expect(aTiles.length).toBe(2);
  expect(cTiles.length).toBe(2);
  expect(gTiles.length).toBe(2);
  expect(tTiles.length).toBe(2);
});
