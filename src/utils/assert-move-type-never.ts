export function assertMoveTypeNever(moveType: never): never {
  throw new Error("MoveType is not supported");
}
