import { type ComponentProps, forwardRef } from "react";
import { type TileType } from "../types";

function getTileBackgroundColor(tileType: TileType) {
  if (tileType === "a") return "#93869a";
  if (tileType === "c") return "#5f909e";
  if (tileType === "g") return "#a36980";
  if (tileType === "t") return "#a0804d";
}

interface TileProps extends ComponentProps<"div"> {
  type: TileType;
  isSelected?: boolean;
}

export const Tile = forwardRef<HTMLDivElement, TileProps>(
  ({ type, isSelected, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        {...props}
        className="flex h-full w-full items-center justify-center rounded-md text-2xl font-bold text-white"
        style={{
          backgroundColor: getTileBackgroundColor(type),
          border: isSelected !== undefined ? "4px black solid" : "none",
        }}
      >
        {type.toUpperCase()}
      </div>
    );
  }
);

Tile.displayName = "Tile";
