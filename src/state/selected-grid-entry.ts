import { atom } from "jotai";
import { GridPosition } from "../types";

export const selectedGridEntryPositionAtom = atom<GridPosition | undefined>(
  undefined
);
