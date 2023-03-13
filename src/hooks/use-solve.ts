import { useAtom, useAtomValue } from "jotai";
import { useCallback, useMemo } from "react";
import { enabledMovesAtom } from "../state/moves";
import { originGridAtom, targetGridAtom } from "../state/grids";
import { solutionStateAtom } from "../state/solution";
import { isEqual } from "../utils/tile-grid/is-equal/is-equal";

const MINIMUM_RUNTIME = 1_000;

export function useSolveGrid() {
  const [solutionState, setSolutionState] = useAtom(solutionStateAtom);
  const originGrid = useAtomValue(originGridAtom);
  const targetGrid = useAtomValue(targetGridAtom);
  const moves = useAtomValue(enabledMovesAtom);

  const solverWorkerInstance = useMemo(
    () =>
      new ComlinkWorker<typeof import("../worker/grid-solver-worker")>(
        new URL("../worker/grid-solver-worker", import.meta.url)
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
      duration_in_ms < MINIMUM_RUNTIME ? MINIMUM_RUNTIME - duration_in_ms : 0;
    setTimeout(() => {
      setSolutionState({
        state: "solved",
        meta: { duration: duration_in_ms },
        solvingPath,
      });
    }, timeoutTime);
  }, [solutionState, setSolutionState, originGrid, targetGrid, moves]);

  return solveGrid;
}
