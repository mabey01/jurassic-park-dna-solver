import { bench, describe } from "vitest";
import { MoveType } from "../utils/apply-move-to-grid/moves";
import { generateRandomGrid } from "../utils/generate-random-grid/generate-random-grid";
import { getGridSolvingPath } from "./grid-solver-worker";

const MOVE_SET_SIMPLE: MoveType[] = ["HORIZONTAL_SWITCH", "VERTICAL_SWITCH"];
const MOVE_SET_FULL: MoveType[] = [
  "HORIZONTAL_SWITCH",
  "VERTICAL_SWITCH",
  "LEFT_TO_RIGHT_DIAGONAL",
  "RIGHT_TO_LEFT_DIAGONAL",
];

describe("getGridSolvingPath", () => {
  bench("small grid (2x2) with 2 moves", () => {
    getGridSolvingPath(
      generateRandomGrid(2, 2),
      generateRandomGrid(2, 2),
      MOVE_SET_SIMPLE
    );
  });

  bench("small grid (2x2) with 4 moves", () => {
    getGridSolvingPath(
      generateRandomGrid(2, 2),
      generateRandomGrid(2, 2),
      MOVE_SET_FULL
    );
  });

  bench("medium grid (2x4) with 2 moves", () => {
    getGridSolvingPath(
      generateRandomGrid(2, 4),
      generateRandomGrid(2, 4),
      MOVE_SET_SIMPLE
    );
  });

  bench("medium grid (2x4) with 4 moves", () => {
    getGridSolvingPath(
      generateRandomGrid(2, 4),
      generateRandomGrid(2, 4),
      MOVE_SET_FULL
    );
  });

  bench("large grid (4x4) with 2 moves", () => {
    getGridSolvingPath(
      generateRandomGrid(4, 4),
      generateRandomGrid(4, 4),
      MOVE_SET_SIMPLE
    );
  });

  bench("large grid (4x4) with 4 moves", () => {
    getGridSolvingPath(
      generateRandomGrid(4, 4),
      generateRandomGrid(4, 4),
      MOVE_SET_FULL
    );
  });
});
