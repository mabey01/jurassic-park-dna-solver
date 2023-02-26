import { bench, describe } from "vitest";
import { MoveType } from "../../apply-move-to-grid/moves";
import { generateRandomGrid } from "../../generate-random-grid/generate-random-grid";
import { getShortestSolveMoves } from "./get-shortest-solve-moves";

const MOVE_SET_SIMPLE: MoveType[] = ["HORIZONTAL_SWITCH", "VERTICAL_SWITCH"];
const MOVE_SET_FULL: MoveType[] = [
  "HORIZONTAL_SWITCH",
  "VERTICAL_SWITCH",
  "LEFT_TO_RIGHT_DIAGONAL",
  "RIGHT_TO_LEFT_DIAGONAL",
];

describe("getSolvingPathBench", () => {
  bench("small grids with 2 moves", () => {
    getShortestSolveMoves(
      generateRandomGrid(2, 2),
      generateRandomGrid(2, 2),
      MOVE_SET_SIMPLE
    );
  });

  bench("small grids with 4 moves", () => {
    getShortestSolveMoves(
      generateRandomGrid(2, 2),
      generateRandomGrid(2, 2),
      MOVE_SET_FULL
    );
  });

  bench("medium grid with 2 moves", () => {
    getShortestSolveMoves(
      generateRandomGrid(2, 4),
      generateRandomGrid(2, 4),
      MOVE_SET_SIMPLE
    );
  });

  bench("medium grid with 4 moves", () => {
    getShortestSolveMoves(
      generateRandomGrid(2, 4),
      generateRandomGrid(2, 4),
      MOVE_SET_FULL
    );
  });

  bench("large grid with 2 moves", () => {
    getShortestSolveMoves(
      generateRandomGrid(4, 4),
      generateRandomGrid(4, 4),
      MOVE_SET_SIMPLE
    );
  });

  bench("large grid with 4 moves", () => {
    getShortestSolveMoves(
      generateRandomGrid(4, 4),
      generateRandomGrid(4, 4),
      MOVE_SET_FULL
    );
  });
});
