import { TileGrid } from "../../../types";
import { getFlatGrid } from "../../grid/get-flat-grid/get-flat-grid";

export function isEqual(a: TileGrid, b: TileGrid) {
  const flatA = getFlatGrid(a);
  const flatB = getFlatGrid(b);

  return flatA.every((aEntry, index) => aEntry.type === flatB[index].type);
}
