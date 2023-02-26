import { atom } from "jotai";
import { MoveType, MOVE_SET } from "../utils/apply-move-to-grid/moves";

export const availableMovesAtom = atom<MoveType[]>(
  Object.keys(MOVE_SET) as MoveType[]
);

export const enabledMovesAtom = atom<MoveType[]>([
  "HORIZONTAL_SWITCH",
  "VERTICAL_SWITCH",
]);
