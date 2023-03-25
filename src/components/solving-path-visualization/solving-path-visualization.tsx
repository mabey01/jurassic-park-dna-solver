import { motion, Transition } from "framer-motion";
import { useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { TileGrid } from "../../types";
import { Move } from "../../utils/apply-move-to-grid/moves";
import { SolvingGrid } from "./solving-grid";
import { SolvingGridPlayControls } from "./solving-grid-play-controls";
import { SolvingGridProgressBar } from "./solving-grid-progress-bar";
import { maxMoveIndexAtom } from "./state";
import { useCurrentGrid } from "./use-current-grid";

interface SolvingPathVisualizationProps {
  sourceGrid: TileGrid;
  solvingPath: Move[];
}

export function SolvingPathVisualization({
  sourceGrid,
  solvingPath,
}: SolvingPathVisualizationProps) {
  const currentGrid = useCurrentGrid(sourceGrid, solvingPath, 1_000);
  const setMaxMoveIndex = useSetAtom(maxMoveIndexAtom);

  useEffect(() => {
    setMaxMoveIndex(solvingPath.length - 1);
  }, [solvingPath]);

  return (
    <div className="flex flex-col gap-2">
      <SolvingGrid currentGrid={currentGrid} />
      <div className="flex items-center gap-2 text-neutral-100">
        <SolvingGridPlayControls />
        <SolvingGridProgressBar />
      </div>
    </div>
  );
}
