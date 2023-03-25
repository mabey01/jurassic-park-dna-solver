import * as Slider from "@radix-ui/react-slider";
import { useAtom, useAtomValue } from "jotai";
import {
  currentMoveIndexAtom,
  maxMoveIndexAtom,
  minMoveIndexAtom,
} from "./state";

export function SolvingGridProgressBar() {
  const minMoveIndex = useAtomValue(minMoveIndexAtom);
  const maxMoveIndex = useAtomValue(maxMoveIndexAtom);
  const [currentMoveIndex, setCurrentMoveIndex] = useAtom(currentMoveIndexAtom);

  return (
    <Slider.Root
      className="relative flex h-5 w-full touch-none select-none items-center"
      value={[currentMoveIndex]}
      min={minMoveIndex}
      max={maxMoveIndex}
      onValueChange={([currentValue]) => setCurrentMoveIndex(currentValue)}
    >
      <Slider.Track className="relative h-[3px] grow rounded-full bg-white/20">
        <Slider.Range className="absolute h-full rounded-full bg-white" />
      </Slider.Track>
      <Slider.Thumb className="block h-4 w-4 cursor-grab rounded-full bg-white drop-shadow-md hover:bg-neutral-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400" />
    </Slider.Root>
  );
}
