import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ComponentProps } from "react";

interface SortableItemProps extends ComponentProps<"div"> {
  id: string;
}

export function SortableItem({ id, children, ...props }: SortableItemProps) {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(
      transform
        ? isDragging
          ? { ...transform, scaleX: 1.05, scaleY: 1.05 }
          : transform
        : null
    ),
    transition,
    zIndex: isDragging ? 1 : 0,
    boxShadow: isDragging
      ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
      : "",
    "-webkit-tap-highlight-color": "transparent",
  };

  return (
    <div
      {...props}
      ref={setNodeRef}
      style={style}
      className="rounded-md outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
