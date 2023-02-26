import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { enabledMovesAtom } from "../state/moves";
import { originGridAtom, targetGridAtom } from "../state/grids";
import { solveMoveAtom } from "../state/solve-moves";
import { getShortestSolveMoves } from "../utils/tile-grid-solver/get-shortest-solve-moves/get-shortest-solve-moves";
import { isEqual } from "../utils/tile-grid/is-equal/is-equal";

export function useSolveGrid() {
  const setSolveMoves = useSetAtom(solveMoveAtom);
  const originGrid = useAtomValue(originGridAtom);
  const targetGrid = useAtomValue(targetGridAtom);
  const moves = useAtomValue(enabledMovesAtom);

  const solverWorkerInstance = useMemo(
    () =>
      new ComlinkWorker<typeof import("../worker/grid-solver-worker")>(
        new URL("../worker/grid-solver-worker", import.meta.url),
        {
          /* normal Worker options*/
        }
      ),
    []
  );

  const solveGrid = useCallback(async () => {
    if (isEqual(originGrid, targetGrid)) {
      console.log("GRIDS ARE ALREADY EQUAL");
      return;
    }

    if (moves.length === 0) {
      console.log("CANNOT SOLVE GRID WITH NO MOVES");
      return;
    }

    console.log(originGrid, targetGrid);
    console.time("SOLVING");
    const solvingPath = await solverWorkerInstance.getGridSolvingPath(
      originGrid,
      targetGrid,
      moves
    );

    console.timeEnd("SOLVING");
    if (!solvingPath) {
      console.log("UNSOLVABLE GRID");
      return;
    }

    console.log("SOLVING PATH", solvingPath);

    setSolveMoves(solvingPath);
  }, [setSolveMoves, originGrid, targetGrid, moves]);

  return solveGrid;
}
