import { useAtom } from "jotai";
import { enabledMovesAtom } from "../state/moves";

export function useEnableVerticalSkipMove() {
  const [moves, setMoves] = useAtom(enabledMovesAtom);

  const isVerticalSkipMoveEnabled = moves.includes("VERTICAL_SKIP");
  const enableVerticalSkipMove = () => {
    setMoves((moves) => {
      if (moves.includes("VERTICAL_SKIP")) return moves;

      return [...moves, "VERTICAL_SKIP"];
    });
  };

  const disableVerticalSkipMove = () => {
    setMoves((moves) => moves.filter((move) => move !== "VERTICAL_SKIP"));
  };

  return {
    isVerticalSkipMoveEnabled,
    enableVerticalSkipMove,
    disableVerticalSkipMove,
  };
}
