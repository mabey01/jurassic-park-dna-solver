import { expect, test } from "vitest";
import { TileGrid } from "../../../types";
import { isEqual } from "./is-equal";

test("return true for an equal grid", () => {
  const grid: TileGrid = [
    [
      { id: "1", type: "a" },
      { id: "2", type: "a" },
    ],
  ];

  const equalGrid: TileGrid = [
    [
      { id: "1", type: "a" },
      { id: "2", type: "a" },
    ],
  ];

  expect(isEqual(grid, equalGrid)).toBeTruthy();
});

test("return true for a grid which equals in type but not id", () => {
  const grid: TileGrid = [
    [
      { id: "1", type: "a" },
      { id: "2", type: "a" },
    ],
  ];

  const equalGrid: TileGrid = [
    [
      { id: "99", type: "a" },
      { id: "109", type: "a" },
    ],
  ];

  expect(isEqual(grid, equalGrid)).toBeTruthy();
});

test("return false for a grid which does not equal in type", () => {
  const grid: TileGrid = [
    [
      { id: "1", type: "a" },
      { id: "2", type: "a" },
    ],
  ];

  const equalGrid: TileGrid = [
    [
      { id: "99", type: "c" },
      { id: "109", type: "a" },
    ],
  ];

  expect(isEqual(grid, equalGrid)).toBeFalsy();
});
