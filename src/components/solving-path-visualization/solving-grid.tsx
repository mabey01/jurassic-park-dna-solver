import { motion, type Transition } from "framer-motion";
import { useMemo } from "react";
import { type TileGrid } from "../../types";
import { Tile } from "../tile";

const transitionConfig: Transition = {
  type: "spring",
  damping: 16,
  stiffness: 100,
};

interface SolvingGridProps {
  currentGrid: TileGrid;
}

export function SolvingGrid({ currentGrid }: SolvingGridProps) {
  const gridColumns = currentGrid[0].length;
  const gridItems = useMemo(() => currentGrid.flat(), [currentGrid]);

  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
        gridAutoRows: "100px",
      }}
    >
      {gridItems.map((tile) => (
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
