import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { type TileGrid } from "../../types";
import { type Move } from "../../utils/apply-move-to-grid/moves";
import { SolvingGrid } from "./solving-grid";
import { SolvingGridPlayControls } from "./solving-grid-play-controls";
import { SolvingGridProgressBar } from "./solving-grid-progress-bar";
import { currentMoveIndexAtom, maxMoveIndexAtom } from "./state";
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
  const setCurrentMoveIndex = useSetAtom(currentMoveIndexAtom);

  useEffect(() => {
    // If solving path is empty we render error page, therefore it can not be empty here
    if (solvingPath.length === 0) return;

    setMaxMoveIndex(solvingPath.length - 1);

    return () => {
      setCurrentMoveIndex(-1);
    };
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
