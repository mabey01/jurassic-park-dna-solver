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

  expect(serializeGrid(tileGrid)).toEqual("[1,a],[2,c]|[3,g],[4,t]");
});

test("should return an unserialized grid", () => {
  const serializedGrid = "a,c|g,t";

  const unserializedGrid = unserializeGrid(serializedGrid);

  expect(unserializedGrid.length).toEqual(2);
  expect(unserializedGrid[0].length).toEqual(2);
  expect(unserializedGrid[1].length).toEqual(2);

  expect(unserializedGrid[0][0].type).toEqual("a");
  expect(unserializedGrid[0][1].type).toEqual("c");

  expect(unserializedGrid[1][0].type).toEqual("g");
  expect(unserializedGrid[1][1].type).toEqual("t");
});

test("should throw if serialized grid is empty string", () => {
  const serializedGrid = "";

  expect(() => unserializeGrid(serializedGrid)).toThrowError();
});

test("should throw if serialized grid contains unsupported tile values", () => {
  const serializedGrid = "a,c|g,X";

  expect(() => unserializeGrid(serializedGrid)).toThrowError();
});
