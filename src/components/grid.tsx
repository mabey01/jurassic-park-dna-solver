import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { motion, type Variants } from "framer-motion";
import { type TileGrid } from "../types";
import { moveTileById } from "../utils/tile-grid/move-tile/move-tile-by-id";
import { SortableItem } from "./sortable-item";
import { Tile } from "./tile";

const container: Variants = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

interface GridProps {
  onUpdateGrid: (newGrid: TileGrid) => void;
  grid: TileGrid;
}

export function Grid({ grid, onUpdateGrid }: GridProps) {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      // Disable smooth scrolling in Cypress automated tests
      scrollBehavior: undefined,
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;

    if (active.id !== over.id) {
      const newGrid = moveTileById(
        grid,
        active.id.toString(),
        over.id.toString()
      );

      onUpdateGrid(newGrid);
    }
  };

  const gridColumns = grid[0]!.length;
  const gridItems = grid.flat();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={gridItems} strategy={rectSortingStrategy}>
        <motion.div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
            gridAutoRows: "100px",
          }}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {gridItems.map((tile, index) => (
            <SortableItem key={tile.id} id={tile.id}>
              <motion.div
                className="h-full w-full"
                variants={item}
                transition={{ type: "spring", stiffness: 800, damping: 30 }}
              >
                <Tile type={tile.type} />
              </motion.div>
            </SortableItem>
          ))}
        </motion.div>
      </SortableContext>
    </DndContext>
  );
}
