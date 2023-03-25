export function assertTileTypeNever(tileType: never): never {
  throw new Error("TileType is not supported");
}
