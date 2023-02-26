import { GridPosition } from "../../../types";
import { applyHorizontalMoveToGrid } from "./horizontal";
import { applyLeftToRightDiagonallyMoveToGrid } from "./left-to-right-diagonally";
import { applyRightToLeftDiagonallyMoveToGrid } from "./right-to-left-diagonally";
import { applyVerticalMoveToGrid } from "./vertical";

export const MOVE_SET = {
  HORIZONTAL_SWITCH: applyHorizontalMoveToGrid,
  VERTICAL_SWITCH: applyVerticalMoveToGrid,
  LEFT_TO_RIGHT_DIAGONAL: applyLeftToRightDiagonallyMoveToGrid,
  RIGHT_TO_LEFT_DIAGONAL: applyRightToLeftDiagonallyMoveToGrid,
};

export type MoveType = keyof typeof MOVE_SET;

export type Move = {
  type: MoveType;
  originTilePosition: GridPosition;
};
