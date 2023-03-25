import { TileGrid } from "../../../types";
import { serializeTile, unserializeTile } from "./serialize-tile";

export function serializeGrid(grid: TileGrid) {
  return grid.map((row) => row.map(serializeTile).join(",")).join("|");
}

export function unserializeGrid(serializedGrid: string): TileGrid {
  const rows = serializedGrid.split("|");
  return rows.map((serializedRow) => {
    const serializedTiles = serializedRow.split(",");
    return serializedTiles.map(unserializeTile);
  });
}
