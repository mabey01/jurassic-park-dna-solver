import { atom } from "jotai";
import { TileGrid } from "../types";
import { generateRandomGrid } from "../utils/generate-random-grid/generate-random-grid";

export const originGridAtom = atom<TileGrid>(generateRandomGrid(4, 4));
export const targetGridAtom = atom<TileGrid>(generateRandomGrid(4, 4));
