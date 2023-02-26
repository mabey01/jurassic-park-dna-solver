import { TileType } from "../../types";

const TILE_VALUES = ["a", "c", "g", "t"] satisfies TileType[];

export function getTileValues(numberOfTiles = 8) {
  let tileValues: TileType[] = [];

  while (tileValues.length !== numberOfTiles) {
    const tileValue = TILE_VALUES[tileValues.length % TILE_VALUES.length];
    tileValues.push(tileValue);
  }

  return tileValues;
}
