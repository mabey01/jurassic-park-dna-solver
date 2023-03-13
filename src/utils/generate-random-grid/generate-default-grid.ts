import { Tile, TileGrid, TileType } from "../../types";
import { getTileValues } from "../get-tile-values/get-tile-values";
import { popRandomEntry } from "../arrays/pop-random-entry/pop-random-entry";

function uid() {
  return crypto.randomUUID();
}

const DEFAULT_GRID_POSITIONS: Tile[][] = [
  [
    { type: "g", id: uid() },
    { type: "a", id: uid() },
  ],
  [],
  [],
  [
    {
      type: "t",
      id: uid(),
    },
    {
      type: "c",
      id: uid(),
    },
  ],
];

const numberOfDefaultTiles = DEFAULT_GRID_POSITIONS.flat().length;

export function generateDefaultGrid(
  numberOfRows = 4,
  numberOfColumns = 2
): TileGrid {
  const tileValues: TileType[] = getTileValues(
    numberOfRows * numberOfColumns - numberOfDefaultTiles
  );
  const rows = new Array(numberOfRows).fill(0);

  return rows.map((_, rowIndex) => {
    const columns = new Array(numberOfColumns).fill(0);
    return columns.map((_, columnIndex) => {
      if (DEFAULT_GRID_POSITIONS[rowIndex][columnIndex]) {
        return DEFAULT_GRID_POSITIONS[rowIndex][columnIndex];
      }

      return {
        id: crypto.randomUUID(),
        type: popRandomEntry(tileValues),
      };
    });
  });
}
