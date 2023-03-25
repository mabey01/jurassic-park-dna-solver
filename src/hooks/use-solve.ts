import { useCallback, useEffect, useMemo, useState } from "react";
import { TileGrid } from "../types";
import { Move, MoveType } from "../utils/apply-move-to-grid/moves";
import { isEqual } from "../utils/tile-grid/is-equal/is-equal";

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

export type SolutionState =
  | IdleSolutionState
  | GridsAreEqualSolutionState
  | SolvingSolutionState
  | SolvedSolutionState;

const MINIMUM_RUNTIME_MS = 500;

export function useSolveGrid(
  originGrid: TileGrid,
  targetGrid: TileGrid,
  moves: MoveType[]
) {
  const [solutionState, setSolutionState] = useState<SolutionState>({
    state: "idle",
  });

  const solverWorkerInstance = useMemo(
    () =>
      new ComlinkWorker<typeof import("../worker/index")>(
        new URL("../worker", import.meta.url)
      ),
    []
  );

  const solveGrid = useCallback(async () => {
    if (solutionState.state === "solving") {
      console.log("IS ALREADY SOLVING");
      return;
    }

    if (isEqual(originGrid, targetGrid)) {
      console.log("GRIDS ARE ALREADY EQUAL");
      setSolutionState({
        state: "grids-are-equal",
      });
      return;
    }

    if (moves.length === 0) {
      console.error("CANNOT SOLVE GRID WITH NO MOVES");
      return;
    }

    setSolutionState({
      state: "solving",
    });

    const startingTime = Date.now();
    const solvingPath = await solverWorkerInstance.getGridSolvingPath(
      originGrid,
      targetGrid,
      moves
    );

    const duration_in_ms = Date.now() - startingTime;

    if (!solvingPath) {
      console.log("UNSOLVABLE GRID");
      setSolutionState({
        state: "solved",
        meta: {
          duration: duration_in_ms,
        },
        solvingPath: [],
      });
      return;
    }

    const timeoutTime =
      duration_in_ms < MINIMUM_RUNTIME_MS
        ? MINIMUM_RUNTIME_MS - duration_in_ms
        : 0;
    setTimeout(() => {
      setSolutionState({
        state: "solved",
        meta: { duration: duration_in_ms },
        solvingPath,
      });
    }, timeoutTime);
  }, [solutionState, setSolutionState, originGrid, targetGrid, moves]);

  useEffect(() => {
    solveGrid();
  }, []);

  return solutionState;
}
