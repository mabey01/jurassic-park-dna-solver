import { atom } from "jotai";
import { type Move } from "../utils/apply-move-to-grid/moves";

interface SolvingStepsControlsState {
  currentStep: number;
  solvingMoves: Move[];
}

export const SolvingStepsControlsAtom = atom<SolvingStepsControlsState>({
  currentStep: -1,
  solvingMoves: [],
});
