import { atom } from "jotai";
import { Move } from "../utils/apply-move-to-grid/moves";

export const solveMoveAtom = atom<Move[]>([]);
