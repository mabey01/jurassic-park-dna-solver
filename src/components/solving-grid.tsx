import { motion, Transition } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { TileGrid } from "../types";
import { applyMoveToGrid } from "../utils/apply-move-to-grid/apply-move-to-grid";
import { Move } from "../utils/apply-move-to-grid/moves";
import { Tile } from "./tile";

const transitionConfig: Transition = {
  type: "spring",
  damping: 25,
  stiffness: 120,
};

export function useSolvingGridSteps(
  sourceGrid: TileGrid,
  solvingPath: Move[],
  stepTime = 2_000
) {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);

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
    const nextMove = solvingPath[currentMoveIndex + 1];
    if (!nextMove) return;

    const currentTimeout = setTimeout(() => {
      setCurrentMoveIndex((currentMoveIndex) => currentMoveIndex + 1);
    }, stepTime);

    return () => {
      clearTimeout(currentTimeout);
    };
  }, [currentMoveIndex]);

  return currentGrid;
}

interface SolvingGridProps {
  sourceGrid: TileGrid;
  solvingPath: Move[];
}

export function SolvingGrid({ sourceGrid, solvingPath }: SolvingGridProps) {
  const currentGrid = useSolvingGridSteps(sourceGrid, solvingPath);

  const gridColumns = currentGrid[0].length;
  const gridItems = useMemo(() => currentGrid.flat(), [currentGrid]);

  useEffect(() => {}, []);

  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
        gridAutoRows: "100px",
      }}
    >
      {gridItems.map((tile, index) => (
        <motion.div
          key={tile.id}
          className="h-full w-full"
          layout
          transition={transitionConfig}
        >
          <Tile type={tile.type} />
        </motion.div>
      ))}
    </div>
  );
}
