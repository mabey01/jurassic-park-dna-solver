import { type Tile } from "../../../types";
import { isTileType } from "../is-tile-type/is-tile-type";

export class TileSerializeError extends Error {
  constructor(tileType: string | undefined) {
    let message = `TileType is undefined`;
    if (tileType) {
      message = `TileType (${tileType}) is not supported`;
    }

    super(message);
  }
}

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

  throw new TileSerializeError(type);
}
