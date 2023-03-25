import { TileGrid } from "../types";
import { Move, MoveType } from "../utils/apply-move-to-grid/moves";
import { PriorityQueue } from "../utils/priority-queue/priority-queue";
import { getAllNeighborObjects } from "../utils/tile-grid-solver/get-all-neighbors/get-all-neighbors";
import { TileGridNode } from "../utils/tile-grid-solver/tile-grid-node";
import { getManhattenDistance } from "../utils/tile-grid/get-manhatten-distance/get-manhatten-distance";

export function getGridSolvingPath(
  originGrid: TileGrid,
  targetGrid: TileGrid,
  moves: MoveType[]
): Move[] | undefined {
  const openList = new PriorityQueue<TileGridNode>();
  const closedList: Set<string> = new Set();

  const targetNode = new TileGridNode(targetGrid, []);
  const startingNode = new TileGridNode(originGrid, []);
  openList.add(startingNode.f, startingNode);

  while (openList.length !== 0) {
    const currentNode = openList.poll()!;

    if (currentNode.isEqual(targetNode)) {
      return currentNode.path;
    }

    closedList.add(currentNode.serialized);
    const neighborObjects = getAllNeighborObjects(currentNode.grid, moves);

    for (let i = 0; i < neighborObjects.length; i++) {
      const neighborNode = currentNode.createNewNode(
        neighborObjects[i].grid,
        neighborObjects[i].move
      );

      if (closedList.has(neighborNode.serialized)) {
        continue;
      }

      neighborNode.g = currentNode.g + 1;
      neighborNode.h = getManhattenDistance(neighborNode.grid, targetGrid);
      neighborNode.f = neighborNode.g + neighborNode.h;

      openList.add(neighborNode.f, neighborNode);
    }
  }
}
