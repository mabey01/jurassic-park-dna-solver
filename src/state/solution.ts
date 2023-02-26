import { atom } from "jotai";
import { Move } from "../utils/apply-move-to-grid/moves";

type IdleSolutionState = {
  state: "idle";
};

type SolvingSolutionState = {
  state: "solving";
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
  | SolvingSolutionState
  | SolvedSolutionState;

export const solutionStateAtom = atom<SolutionState>({ state: "idle" });
