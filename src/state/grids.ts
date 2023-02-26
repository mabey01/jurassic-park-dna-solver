import { atom } from "jotai";
import { GRID_2_4_ORIGIN, GRID_2_4_TARGET } from "../stable-grids/2x4";
import { GRID_4X4_ORIGIN, GRID_4X4_TARGET } from "../stable-grids/4x4";
import { TileGrid } from "../types";

export const originGridAtom = atom<TileGrid>(GRID_4X4_ORIGIN);
export const targetGridAtom = atom<TileGrid>(GRID_4X4_TARGET);
