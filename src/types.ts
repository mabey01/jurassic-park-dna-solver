export type GridPosition = [number, number];
export interface GridDimensions {
  numberOfRows: number;
  numberOfColumns: number;
}

export const TILE_TYPES = ["g", "a", "t", "c", "*"] as const;

export type TileType = (typeof TILE_TYPES)[number];

export interface Tile {
  id: string;
  type: TileType;
}
export type TileGrid = Tile[][];
