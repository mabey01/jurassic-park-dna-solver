import { getFlatGrid } from "../get-flat-grid/get-flat-grid";
import { getGridDimensions } from "../get-grid-dimensions/get-grid-dimensions";
import { getUnflattenGrid } from "../unflatten-grid/unflatten-grid";

type TransformFlatGridFunction<T> = (flatGrid: T[]) => T[];

export function applyGridTransformation<T>(
  grid: T[][],
  transformFlatGridFunction: TransformFlatGridFunction<T>
) {
  const gridDimensions = getGridDimensions(grid);

  const flatGrid = getFlatGrid(grid);
  const transformedFlatGrid = transformFlatGridFunction(flatGrid);

  return getUnflattenGrid(transformedFlatGrid, gridDimensions);
}
