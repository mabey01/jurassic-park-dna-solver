import { atom } from "jotai";
import { type GridPosition } from "../types";

export const selectedGridEntryPositionAtom = atom<GridPosition | undefined>(
  undefined
);
