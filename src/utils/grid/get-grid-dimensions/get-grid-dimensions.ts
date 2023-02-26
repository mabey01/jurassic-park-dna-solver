export function getGridDimensions<T>(grid: T[][]) {
  if (!grid[0]) {
    return {
      numberOfRows: 0,
      numberOfColumns: 0,
    };
  }

  if (!grid[0].length) {
    return {
      numberOfRows: 0,
      numberOfColumns: 0,
    };
  }

  return {
    numberOfRows: grid.length,
    numberOfColumns: grid[0].length,
  };
}
