import { useState } from "react";

export function useEnableVerticalSkipMove() {
  const [isEnabled, setIsEnabled] = useState(true);

  const enableVerticalSkipMove = () => {
    setIsEnabled(true);
  };

  const disableVerticalSkipMove = () => {
    setIsEnabled(false);
  };

  return {
    isVerticalSkipMoveEnabled: isEnabled,
    enableVerticalSkipMove,
    disableVerticalSkipMove,
  };
}
