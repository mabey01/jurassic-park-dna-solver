import { useCallback, useEffect, useMemo, useState } from "react";
import { type TileGrid } from "../types";
import { type Move, type MoveType } from "../utils/apply-move-to-grid/moves";
import { isEqual } from "../utils/tile-grid/is-equal/is-equal";

interface IdleSolutionState {
  state: "idle";
}

interface SolvingSolutionState {
  state: "solving";
}

interface GridsAreEqualSolutionState {
  state: "grids-are-equal";
}

export interface SolvedSolutionState {
  state: "solved";
  meta: {
    duration: number;
  };
  solvingPath: Move[];
}

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
      // eslint-disable-next-line @typescript-eslint/consistent-type-imports
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

    const durationInMS = Date.now() - startingTime;

    if (solvingPath == null) {
      console.log("UNSOLVABLE GRID");
      setSolutionState({
        state: "solved",
        meta: {
          duration: durationInMS,
        },
        solvingPath: [],
      });
      return;
    }

    const timeoutTime =
      durationInMS < MINIMUM_RUNTIME_MS ? MINIMUM_RUNTIME_MS - durationInMS : 0;
    setTimeout(() => {
      setSolutionState({
        state: "solved",
        meta: { duration: durationInMS },
        solvingPath,
      });
    }, timeoutTime);
  }, [solutionState, setSolutionState, originGrid, targetGrid, moves]);

  useEffect(() => {
    void solveGrid();
  }, []);

  return solutionState;
}
