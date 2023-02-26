import { useAtom, useAtomValue } from "jotai";
import { availableMovesAtom, enabledMovesAtom } from "../state/moves";
import { MoveType } from "../utils/apply-move-to-grid/moves";

function getMoveLabel(moveType: MoveType) {
  if (moveType === "HORIZONTAL_SWITCH") {
    return "Horizontal";
  }

  if (moveType === "VERTICAL_SWITCH") {
    return "Vertical";
  }

  if (moveType === "LEFT_TO_RIGHT_DIAGONAL") {
    return "Diagonal (ltr)";
  }

  if (moveType === "RIGHT_TO_LEFT_DIAGONAL") {
    return "Diagonal (rtl)";
  }
}

export function Moves() {
  const availableMoves = useAtomValue(availableMovesAtom);
  const [enabledMoves, setEnabledMoves] = useAtom(enabledMovesAtom);

  return (
    <div className="flex gap-2">
      {availableMoves.map((move) => (
        <div key={move}>
          <input
            type="checkbox"
            checked={enabledMoves.includes(move)}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setEnabledMoves((moves) => {
                if (isChecked) {
                  return [...moves, move];
                }

                return moves.filter((_move) => _move !== move);
              });
            }}
          />
          <label>{getMoveLabel(move)}</label>
        </div>
      ))}
    </div>
  );
}
