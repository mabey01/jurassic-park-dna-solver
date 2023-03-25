import { expect, test } from "vitest";
import { type TileGrid } from "../../../types";
import { serializeGrid, unserializeGrid } from "./serialize-grid";

test("should return serialized string", () => {
  const tileGrid: TileGrid = [
    [
      { id: "1", type: "a" },
      { id: "2", type: "c" },
    ],
    [
      { id: "3", type: "g" },
      { id: "4", type: "t" },
    ],
  ];

  expect(serializeGrid(tileGrid)).toEqual("1-a,2-c|3-g,4-t");
});

test("should return an unserialized grid", () => {
  const grid: TileGrid = [
    [
      { id: "1", type: "a" },
      { id: "2", type: "c" },
    ],
    [
      { id: "3", type: "g" },
      { id: "4", type: "t" },
    ],
  ];

  const serializedGrid = "1-a,2-c|3-g,4-t";

  const unserializedGrid = unserializeGrid(serializedGrid);

  expect(unserializedGrid).toEqual(grid);
});

test("should throw if serialized grid is empty string", () => {
  const serializedGrid = "";

  expect(() => unserializeGrid(serializedGrid)).toThrowError();
});

test("should throw if serialized grid contains unsupported tile values", () => {
  const serializedGrid = "a,c|g,X";

  expect(() => unserializeGrid(serializedGrid)).toThrowError();
});
