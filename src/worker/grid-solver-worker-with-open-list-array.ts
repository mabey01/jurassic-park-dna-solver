import { TileGrid } from "../types";
import { Move, MoveType } from "../utils/apply-move-to-grid/moves";
import { getAllNeighborObjects } from "../utils/tile-grid-solver/get-all-neighbors/get-all-neighbors";
import { Node } from "../utils/tile-grid-solver/node";
import { getManhattenDistance } from "../utils/tile-grid/get-manhatten-distance/get-manhatten-distance";

function bySmallestF(a: Node, b: Node) {
  return a.f - b.f;
}

export function getGridSolvingPath(
  originGrid: TileGrid,
  targetGrid: TileGrid,
  moves: MoveType[]
): Move[] | undefined {
  const openList: Map<string, Node> = new Map();
  const closedList: Set<string> = new Set();

  const targetNode = new Node(targetGrid, []);
  const startingNode = new Node(originGrid, []);
  openList.set(startingNode.serialized, startingNode);

  while (openList.size !== 0) {
    const currentNode = [...openList.values()].sort(bySmallestF)[0]!;

    if (currentNode.isEqual(targetNode)) {
      return currentNode.path;
    }

    openList.delete(currentNode.serialized);
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

      const sameOpenListNode = openList.get(neighborNode.serialized);

      if (sameOpenListNode) {
        if (neighborNode.g > sameOpenListNode.g) {
          continue;
        }
      }

      openList.set(neighborNode.serialized, neighborNode);
    }
  }
}
