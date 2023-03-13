import { atom } from "jotai";
import { Move } from "../utils/apply-move-to-grid/moves";

type IdleSolutionState = {
  state: "idle";
};

type SolvingSolutionState = {
  state: "solving";
};

type GridsAreEqualSolutionState = {
  state: "grids-are-equal";
};

export type SolvedSolutionState = {
  state: "solved";
  meta: {
    duration: number;
  };
  solvingPath: Move[];
};

type SolutionState =
  | IdleSolutionState
  | GridsAreEqualSolutionState
  | SolvingSolutionState
  | SolvedSolutionState;

export const solutionStateAtom = atom<SolutionState>({ state: "idle" });
