import { TileGrid } from "../../../types";
import { Move, MoveType } from "../../apply-move-to-grid/moves";
import { getAllNeighborObjects } from "../get-all-neighbors/get-all-neighbors";
import { TileGridNode } from "../tile-grid-node";
import { getManhattenDistance } from "../../tile-grid/get-manhatten-distance/get-manhatten-distance";

function bySmallestG(a: TileGridNode, b: TileGridNode) {
  return a.f - b.f;
}

function isAlreadyInList(list: TileGridNode[], node: TileGridNode) {
  return list.some((listNode) => node.isEqual(listNode));
}

function getEqualListEntry(list: TileGridNode[], node: TileGridNode) {
  return list.find((listNode) => node.isEqual(listNode));
}

export function getShortestSolveMoves(
  originGrid: TileGrid,
  targetGrid: TileGrid,
  moves: MoveType[]
): Move[] | undefined {
  const openList: TileGridNode[] = [];
  const closedList: TileGridNode[] = [];

  const targetNode = new TileGridNode(targetGrid, []);
  const startingNode = new TileGridNode(originGrid, []);
  openList.push(startingNode);

  while (openList.length !== 0) {
    const currentNode = openList.sort(bySmallestG).shift()!;
    closedList.push(currentNode);

    if (currentNode.isEqual(targetNode)) {
      return currentNode.path;
    }

    const neighborObjects = getAllNeighborObjects(currentNode.grid, moves);

    for (let i = 0; i < neighborObjects.length; i++) {
      const neighborNode = currentNode.createNewNode(
        neighborObjects[i].grid,
        neighborObjects[i].move
      );

      if (isAlreadyInList(closedList, neighborNode)) {
        continue;
      }

      neighborNode.g = currentNode.g + 1;
      neighborNode.h = getManhattenDistance(neighborNode.grid, targetGrid);
      neighborNode.f = neighborNode.g + neighborNode.h;

      const sameOpenListNode = getEqualListEntry(openList, neighborNode);

      if (sameOpenListNode) {
        if (neighborNode.g > sameOpenListNode.g) {
          continue;
        }
      }

      openList.push(neighborNode);
    }
  }
}
