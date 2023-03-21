import {
  closestCenter,
  DndContext,
  DragEndEvent,
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useAtom } from "jotai";
import { selectedGridEntryPositionAtom } from "../state/selected-grid-entry";
import { TileGrid, GridPosition } from "../types";
import { isSamePosition } from "../utils/tile-grid/is-same-position";
import { moveTileById } from "../utils/tile-grid/move-tile/move-tile-by-id";
import { SortableItem } from "./sortable-item";
import { Tile } from "./tile";

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
        over!.id.toString()
      );

      onUpdateGrid(newGrid);
    }
  };

  const gridColumns = grid[0].length;
  const gridItems = grid.flat();
  const getGridEntryPosition = (index: number): GridPosition => [index, index];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={gridItems} strategy={rectSortingStrategy}>
        <div
          className="relative grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
            gridAutoRows: "100px",
          }}
        >
          {gridItems.map((tile, index) => (
            <SortableItem key={tile.id} id={tile.id}>
              <Tile
                type={tile.type}
                isSelected={isSamePosition(
                  getGridEntryPosition(index),
                  selectedGridItem
                )}
                onClick={() => setSelectedGridItem(getGridEntryPosition(index))}
              />
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
