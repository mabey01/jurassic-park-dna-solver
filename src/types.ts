export type GridPosition = [number, number];
export type GridDimensions = {
  numberOfRows: number;
  numberOfColumns: number;
};

export type TileType = "g" | "a" | "t" | "c";

export type Tile = {
  id: string;
  type: TileType;
};
export type TileGrid = Tile[][];
