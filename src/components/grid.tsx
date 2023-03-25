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
import { useAtom } from "jotai";
import { selectedGridEntryPositionAtom } from "../state/selected-grid-entry";
import { type TileGrid, type GridPosition } from "../types";
import { isSamePosition } from "../utils/tile-grid/is-same-position";
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
  const [selectedGridItem, setSelectedGridItem] = useAtom(
    selectedGridEntryPositionAtom
  );

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
    if (active.id !== over?.id) {
      const newGrid = moveTileById(
        grid,
        active.id.toString(),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        over!.id.toString()
      );

      onUpdateGrid(newGrid);
    }
  };

  const gridColumns = grid[0]!.length;
  const gridItems = grid.flat();
  const getGridEntryPosition = (index: number): GridPosition => [index, index];

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
                <Tile
                  type={tile.type}
                  isSelected={isSamePosition(
                    getGridEntryPosition(index),
                    selectedGridItem
                  )}
                  onClick={() => {
                    setSelectedGridItem(getGridEntryPosition(index));
                  }}
                />
              </motion.div>
            </SortableItem>
          ))}
        </motion.div>
      </SortableContext>
    </DndContext>
  );
}
