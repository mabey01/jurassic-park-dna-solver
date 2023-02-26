import { expect, test } from "vitest";
import { TileGrid } from "../../../types";
import { moveTileById } from "./move-tile-by-id";

test("move position of the 2nd entry in front of 1st entry", () => {
  const grid: TileGrid = [
    [
      { id: "1", type: "a" },
      { id: "2", type: "c" },
    ],
  ];

  expect(moveTileById(grid, "2", "1")).toStrictEqual([
    [
      { id: "2", type: "c" },
      { id: "1", type: "a" },
    ],
  ]);
});

test("move position (forwards) of the 6th entry in front of the 2nd entry", () => {
  const grid: TileGrid = [
    [
      { id: "1", type: "a" },
      { id: "2", type: "c" },
    ],
    [
      { id: "3", type: "a" },
      { id: "4", type: "c" },
    ],
    [
      { id: "5", type: "a" },
      { id: "6", type: "c" },
    ],
  ];

  expect(moveTileById(grid, "6", "2")).toStrictEqual([
    [
      { id: "1", type: "a" },
      { id: "6", type: "c" },
    ],
    [
      { id: "2", type: "c" },
      { id: "3", type: "a" },
    ],
    [
      { id: "4", type: "c" },
      { id: "5", type: "a" },
    ],
  ]);
});

test("move position (backwards) of the 1st entry to the last entry", () => {
  const grid: TileGrid = [
    [
      { id: "1", type: "a" },
      { id: "2", type: "c" },
    ],
    [
      { id: "3", type: "a" },
      { id: "4", type: "c" },
    ],
    [
      { id: "5", type: "a" },
      { id: "6", type: "c" },
    ],
  ];

  expect(moveTileById(grid, "1", "6")).toStrictEqual([
    [
      { id: "2", type: "c" },
      { id: "3", type: "a" },
    ],
    [
      { id: "4", type: "c" },
      { id: "5", type: "a" },
    ],
    [
      { id: "6", type: "c" },
      { id: "1", type: "a" },
    ],
  ]);
});
