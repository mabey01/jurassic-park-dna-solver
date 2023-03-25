import { type GridPosition } from "../../../types";

export function getDistanceByPositions(
  aPosition?: GridPosition,
  bPosition?: GridPosition
) {
  if ((aPosition == null) || (bPosition == null)) return NaN;

  return (
    Math.abs(aPosition[0] - bPosition[0]) +
    Math.abs(aPosition[1] - bPosition[1])
  );
}
