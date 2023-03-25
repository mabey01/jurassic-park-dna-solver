import { type TileGrid, type TileType } from "../../types";
import { getTileValues } from "../get-tile-values/get-tile-values";
import { popRandomEntry } from "../arrays/pop-random-entry/pop-random-entry";

export function generateRandomGrid(
  numberOfRows = 4,
  numberOfColumns = 2
): TileGrid {
  const tileValues: TileType[] = getTileValues(numberOfRows * numberOfColumns);
  const rows = new Array(numberOfRows).fill(0);

  return rows.map(() => {
    const columns = new Array(numberOfColumns).fill(0);
    return columns.map(() => {
      return {
        id: crypto.randomUUID(),
        type: popRandomEntry(tileValues),
      };
    });
  });
}
