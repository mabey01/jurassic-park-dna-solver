import { TileGrid } from "../../../types";
import { getIndexById } from "../../arrays/get-array-by-index/get-index-by-id";
import { insertEntry } from "../../arrays/insert-entry/insert-entry";
import { removeEntry } from "../../arrays/remove-entry/remove-entry";
import { replaceEntry } from "../../arrays/replace-entry/replace-entry";
import { applyGridTransformation } from "../../grid/apply-array-transformation/apply-grid-transformation";

export function moveTileById(
  grid: TileGrid,
  originTileId: string,
  targetTileId: string
) {
  return applyGridTransformation(grid, (flatGird) => {
    const originTileFlatGridIndex = getIndexById(flatGird, originTileId);
    const originTile = flatGird[originTileFlatGridIndex];

    const targetTileFlatGridIndex = getIndexById(flatGird, targetTileId);

    const cleanFlatGrid = removeEntry(flatGird, originTileFlatGridIndex);
    return insertEntry(cleanFlatGrid, targetTileFlatGridIndex, originTile);
  });
}
