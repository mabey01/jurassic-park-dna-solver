import { Move, MoveType } from "../apply-move-to-grid/moves";

const DEFAULT_MOVES = [
  "HORIZONTAL_SWITCH",
  "VERTICAL_SWITCH",
  "LEFT_TO_RIGHT_DIAGONAL",
  "RIGHT_TO_LEFT_DIAGONAL",
] satisfies MoveType[];

export function getEnabledMoveTypes(isVerticalSkipEnabled = false): MoveType[] {
  if (isVerticalSkipEnabled) {
    return [...DEFAULT_MOVES, "VERTICAL_SKIP"];
  }

  return DEFAULT_MOVES;
}
