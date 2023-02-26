import { TileGrid } from "../../types";
import { Move } from "../apply-move-to-grid/moves";

export class Node {
  grid: TileGrid;

  path: Move[];

  f = 0;
  g = 0;
  h = 0;

  constructor(grid: TileGrid, path: Move[]) {
    this.grid = grid;
    this.path = path;
  }

  createNewNode(grid: TileGrid, move: Move) {
    return new Node(grid, [...this.path, move]);
  }
}
