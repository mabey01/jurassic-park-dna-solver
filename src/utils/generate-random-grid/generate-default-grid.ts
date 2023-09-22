import { type Tile, type TileGrid, type TileType } from "../../types";
import { getTileValues } from "../get-tile-values/get-tile-values";
import { popRandomEntry } from "../arrays/pop-random-entry/pop-random-entry";

function* getId(): Generator<string, string, unknown> {
  let i = 0;
  while (true) {
    yield String(i++);
  }
}

const idGenerator = getId();
const getNextId = () => idGenerator.next().value;

const DEFAULT_GRID_POSITIONS: Tile[][] = [
  [
    { type: "g", id: getNextId() },
    //@ts-ignore
    undefined,
    { type: "a", id: getNextId() },
  ],
  [],
  [
    {
      type: "t",
      id: getNextId(),
    },
    // @ts-ignore
    undefined,
    {
      type: "c",
      id: getNextId(),
    },
  ],
];

const numberOfDefaultTiles = DEFAULT_GRID_POSITIONS.flat().filter(Boolean).length;

export function generateDefaultGrid(
  numberOfRows = 3,
  numberOfColumns = 3
): TileGrid {
  const tileValues: TileType[] = getTileValues(
    numberOfRows * numberOfColumns - numberOfDefaultTiles
  );
  const rows = new Array(numberOfRows).fill(0);

  return rows.map((_, rowIndex) => {
    const columns = new Array(numberOfColumns).fill(0);
    return columns.map((_, columnIndex) => {
      if (DEFAULT_GRID_POSITIONS[rowIndex]?.[columnIndex]) {
        return DEFAULT_GRID_POSITIONS[rowIndex]![columnIndex]!;
      }

      return {
        id: getNextId(),
        type: popRandomEntry(tileValues),
      };
    });
  });
}
