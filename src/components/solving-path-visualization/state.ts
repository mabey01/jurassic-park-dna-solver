import { atom } from "jotai";

export const currentMoveIndexAtom = atom(-1);
export const minMoveIndexAtom = atom(-1);
export const maxMoveIndexAtom = atom(NaN);
export const solvingPlayStateAtom = atom(false);
