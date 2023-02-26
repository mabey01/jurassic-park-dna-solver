import { expect, test } from "vitest";
import { Tile } from "../../../types";
import { getTilePositionById } from "./get-tile-position-by-id";

test("should return [0, 0] for the first entry", () => {
  expect(
    getTilePositionById(
      [
        [{ id: "1" } as Tile, { id: "2" } as Tile, { id: "3" } as Tile],
        [{ id: "4" } as Tile, { id: "5" } as Tile, { id: "6" } as Tile],
      ],
      "1"
    )
  ).toStrictEqual([0, 0]);
});

test("should return [1, 1] for the 4th entry", () => {
  expect(
    getTilePositionById(
      [
        [{ id: "1" } as Tile, { id: "2" } as Tile],
        [{ id: "3" } as Tile, { id: "4" } as Tile],
      ],
      "4"
    )
  ).toStrictEqual([1, 1]);
});

test("should return undefined for id that is not in grid", () => {
  expect(
    getTilePositionById(
      [
        [{ id: "1" } as Tile, { id: "2" } as Tile],
        [{ id: "3" } as Tile, { id: "4" } as Tile],
      ],
      "99"
    )
  ).toBeUndefined();
});
