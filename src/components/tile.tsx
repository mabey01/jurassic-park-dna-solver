import { ComponentProps, forwardRef } from "react";
import { TileType } from "../types";

function getTileBackgroundColor(tileType: TileType) {
  if (tileType === "a") return "#93869a";
  if (tileType === "c") return "#5f909e";
  if (tileType === "g") return "#a36980";
  if (tileType === "t") return "#a0804d";
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
        className="cursor-pointer w-full h-full rounded-md flex justify-center items-center text-white font-bold text-2xl"
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
