import { type TileGrid } from "../../types";
import { type Move } from "../apply-move-to-grid/moves";

export class TileGridNode {
  grid: TileGrid;
  path: Move[];
  serialized: string;

  f = 0;
  g = 0;
  h = 0;

  constructor(grid: TileGrid, path: Move[]) {
    this.grid = grid;
    this.path = path;

    this.serialized = grid
      .flat()
      .map((tile) => tile.type)
      .join();
  }

  createNewNode(grid: TileGrid, move: Move) {
    return new TileGridNode(grid, [...this.path, move]);
  }

  isEqual(node: TileGridNode) {
    return this.serialized === node.serialized;
  }
}
