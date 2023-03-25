import { atom } from "jotai";
import { Move } from "../utils/apply-move-to-grid/moves";

type SolvingStepsControlsState = {
  currentStep: number;
  solvingMoves: Move[];
};

export const SolvingStepsControlsAtom = atom<SolvingStepsControlsState>({
  currentStep: -1,
  solvingMoves: [],
});
