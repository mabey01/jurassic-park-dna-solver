import { type GridDimensions } from "../../../types";

export function getUnflattenGrid<T>(
  flatGrid: T[],
  { numberOfColumns }: GridDimensions
): T[][] {
  return flatGrid.reduce<T[][]>(
    (grid, gridEntry, index) => {
      const rowNumber = Math.floor(index / numberOfColumns);

      if (grid[rowNumber]) {
        grid[rowNumber]!.push(gridEntry);
        return grid;
      }

      grid[rowNumber] = [gridEntry];
      return grid;
    },
    [[]]
  );
}
