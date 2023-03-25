import { type Tile } from "../../../types";
import { isTileType } from "../is-tile-type/is-tile-type";

export function serializeTile(tile: Tile) {
  return `${tile.id}-${tile.type}`;
}

export function unserializeTile(tileString: string) {
  const [id, type] = tileString.split("-");

  if (id && type && isTileType(type)) {
    return {
      id,
      type,
    };
  }

  throw new Error("TileType is not supported");
}
