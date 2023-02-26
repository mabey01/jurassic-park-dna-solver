import { expect, test } from "vitest";
import { TileGrid } from "../../../types";
import { getAllNeighborObjects } from "./get-all-neighbors";

test("return a list for each grid tile times enabled moves", () => {
  const tileGrid: TileGrid = [
    [
      { id: "1", type: "a" },
      { id: "2", type: "a" },
    ],
  ];

  const results = getAllNeighborObjects(tileGrid, ["HORIZONTAL_SWITCH"]);

  expect(results.length).toBe(1);
  expect(results[0].grid).toStrictEqual([
    [
      { id: "2", type: "a" },
      { id: "1", type: "a" },
    ],
  ]);
});
