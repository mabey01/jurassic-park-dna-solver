import { TileGrid } from "../../../types";
import { Move, MoveType } from "../../apply-move-to-grid/moves";
import { getAllNeighborObjects } from "../get-all-neighbors/get-all-neighbors";
import { Node } from "../node";
import { getManhattenDistance } from "../../tile-grid/get-manhatten-distance/get-manhatten-distance";

function bySmallestG(a: Node, b: Node) {
  return a.f - b.f;
}

export function getShortestSolveMoves(
  originGrid: TileGrid,
  targetGrid: TileGrid,
  moves: MoveType[]
): Move[] | undefined {
  const openList: Node[] = [];
  const closedList: Node[] = [];

  const targetNode = new Node(targetGrid, []);
  const startingNode = new Node(originGrid, []);
  openList.push(startingNode);

  while (openList.length !== 0) {
    const currentNode = openList.sort(bySmallestG).shift()!;
    closedList.push(currentNode);

    if (currentNode.isEqual(targetNode)) {
      return currentNode.path;
    }

    const neighborObjects = getAllNeighborObjects(currentNode.grid, moves);
    for (const neighborObject of neighborObjects) {
      const neighborNode = currentNode.createNewNode(
        neighborObject.grid,
        neighborObject.move
      );

      if (
        closedList.some((closedListNode) =>
          closedListNode.isEqual(neighborNode)
        )
      ) {
        continue;
      }

      neighborNode.g = currentNode.g + 1;
      neighborNode.h = getManhattenDistance(neighborNode.grid, targetGrid);
      neighborNode.f = neighborNode.g + neighborNode.h;

      const sameOpenListNode = openList.find((openListNode) =>
        openListNode.isEqual(neighborNode)
      );

      if (sameOpenListNode) {
        if (neighborNode.g > sameOpenListNode.g) {
          continue;
        }
      }

      openList.push(neighborNode);
    }
  }
}
