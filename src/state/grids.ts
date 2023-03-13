import { atom } from "jotai";
import { TileGrid } from "../types";
import { generateDefaultGrid } from "../utils/generate-random-grid/generate-default-grid";

export const originGridAtom = atom<TileGrid>(generateDefaultGrid());
export const targetGridAtom = atom<TileGrid>(generateDefaultGrid());
