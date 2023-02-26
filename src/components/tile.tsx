import { ComponentProps, forwardRef } from "react";
import { TileType } from "../types";

function getTileBackgroundColor(tileType: TileType) {
  if (tileType === "a") return "purple";
  if (tileType === "c") return "blue";
  if (tileType === "g") return "red";
  if (tileType === "t") return "yellow";
}

interface TileProps extends ComponentProps<"div"> {
  type: TileType;
  isSelected: boolean;
}

export const Tile = forwardRef<HTMLDivElement, TileProps>(
  ({ type, isSelected, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        {...props}
        className="cursor-pointer w-full h-full rounded-md flex justify-center items-center text-white font-semibold text-lg"
        style={{
          backgroundColor: getTileBackgroundColor(type),
          border: isSelected ? "4px black solid" : "none",
        }}
      >
        {type.toUpperCase()}
      </div>
    );
  }
);
