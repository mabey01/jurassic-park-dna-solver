import { useAtom } from "jotai";
import { useMemo, useEffect } from "react";
import { TileGrid } from "../../types";
import { applyMoveToGrid } from "../../utils/apply-move-to-grid/apply-move-to-grid";
import { Move } from "../../utils/apply-move-to-grid/moves";
import { currentMoveIndexAtom, solvingPlayStateAtom } from "./state";

export function useCurrentGrid(
  sourceGrid: TileGrid,
  solvingPath: Move[],
  stepTime = 2_000
) {
  const [currentMoveIndex, setCurrentMoveIndex] = useAtom(currentMoveIndexAtom);
  const [isPlaying, setIsPlaying] = useAtom(solvingPlayStateAtom);

  const currentGrid = useMemo(() => {
    if (currentMoveIndex === -1) return sourceGrid;

    const moves = solvingPath.slice(0, currentMoveIndex + 1);
    const currentGrid = moves.reduce(
      (currentGrid, move) => applyMoveToGrid(currentGrid, move),
      sourceGrid
    );

    return currentGrid;
  }, [currentMoveIndex]);

  useEffect(() => {
    if (!isPlaying) return;

    const nextMove = solvingPath[currentMoveIndex + 1];
    if (!nextMove) {
      setIsPlaying(false);
      return;
    }

    const currentTimeout = setTimeout(() => {
      setCurrentMoveIndex((currentMoveIndex) => currentMoveIndex + 1);
    }, stepTime);

    return () => {
      clearTimeout(currentTimeout);
    };
  }, [isPlaying, currentMoveIndex]);

  return currentGrid;
}
