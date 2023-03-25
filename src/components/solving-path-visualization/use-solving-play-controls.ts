import { useAtom, useAtomValue } from "jotai";
import {
  currentMoveIndexAtom,
  maxMoveIndexAtom,
  minMoveIndexAtom,
  solvingPlayStateAtom,
} from "./state";

export function useSolvingPlayControls() {
  const minMoveIndex = useAtomValue(minMoveIndexAtom);
  const maxMoveIndex = useAtomValue(maxMoveIndexAtom);
  const [currentMoveIndex, setCurrentMoveIndex] = useAtom(currentMoveIndexAtom);
  const [isPlaying, setIsPlaying] = useAtom(solvingPlayStateAtom);

  const goToPreviousMoveIndex = () => {
    const newMoveIndex = Math.max(minMoveIndex, currentMoveIndex - 1);
    setCurrentMoveIndex(newMoveIndex);
  };

  const goToNextMoveIndex = () => {
    const newMoveIndex = Math.min(maxMoveIndex, currentMoveIndex + 1);
    setCurrentMoveIndex(newMoveIndex);
  };

  const togglePlay = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const replay = () => {
    setCurrentMoveIndex(minMoveIndex);
    play();
  };

  const canGoToPreviousMoveIndex = currentMoveIndex - 1 >= minMoveIndex;
  const canGoToNextMoveIndex = currentMoveIndex + 1 <= maxMoveIndex;
  const canReplay = currentMoveIndex == maxMoveIndex && !isPlaying;

  return {
    isPlaying,
    togglePlay,
    play,
    pause,
    replay,
    goToPreviousMoveIndex,
    goToNextMoveIndex,
    canGoToPreviousMoveIndex,
    canGoToNextMoveIndex,
    canReplay,
  };
}
