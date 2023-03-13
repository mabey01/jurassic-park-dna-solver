import { useAtom, useAtomValue } from "jotai";
import { Link, Navigate } from "react-router-dom";
import { Grid } from "./components/grid";
import { Solution } from "./components/solution";
import { useSolveGrid } from "./hooks/use-solve";
import { originGridAtom, targetGridAtom } from "./state/grids";
import { solutionStateAtom } from "./state/solution";

export function OriginGridPage() {
  const [originGrid, setOriginGrid] = useAtom(originGridAtom);

  return (
    <div className="p-2 bg-neutral-900 text-neutral-50 h-full flex flex-col container mx-auto">
      <div className="flex-1">
        <h1 className="text-lg font-semibold">Set Origin Grid</h1>
        <div className="mt-2">
          <Grid grid={originGrid} onUpdateGrid={setOriginGrid} />
        </div>
      </div>
      <div className="flex">
        <Link
          to="/target-grid"
          className="w-full px-4 py-2 rounded-md bg-neutral-700 text-neutral-50 text-center font-medium uppercase"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}

export function TargetGridPage() {
  const calculateResults = useSolveGrid();
  const [targetGrid, setTargetGrid] = useAtom(targetGridAtom);

  return (
    <div className="p-2 h-full bg-neutral-900 text-neutral-50 flex flex-col container mx-auto">
      <div className="flex-1">
        <h1 className="text-lg font-semibold">Set Target Grid</h1>
        <div className="mt-2">
          <Grid grid={targetGrid} onUpdateGrid={setTargetGrid} />
        </div>
      </div>
      <div className="flex">
        <Link
          to="/results"
          onClick={calculateResults}
          className="w-full px-4 py-2 rounded-md bg-neutral-700 text-neutral-50 text-center font-medium uppercase"
        >
          Calculate path
        </Link>
      </div>
    </div>
  );
}

export function ResultPage() {
  const resultsState = useAtomValue(solutionStateAtom);

  if (resultsState.state === "idle") {
    return <Navigate to="/" />;
  }

  if (resultsState.state === "grids-are-equal") {
    return (
      <div className="p-2 flex flex-col bg-yellow-500 h-full">
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Nothing to solve</h1>
          <p>
            The two Grids are already equal. Try to modify the Target Grid so
            that there is at least one Tile that is different between the two
            Grids.
          </p>
        </div>

        <Link
          to="/"
          className="w-full px-4 py-2 rounded-md bg-yellow-700 text-neutral-50 text-center font-medium uppercase"
        >
          Start over
        </Link>
      </div>
    );
  }

  if (resultsState.state === "solving") {
    return (
      <div className="w-full h-full bg-blue-500 text-neutral-50 grid place-items-center">
        <div>Calculating best path...</div>
      </div>
    );
  }

  return (
    <div className="p-2 flex flex-col bg-green-500 text-neutral-50 h-full">
      <div className="flex-1">
        <h1 className="text-lg font-semibold">Solution</h1>
        <Solution solution={resultsState} />
      </div>
      <Link
        to="/"
        className="w-full px-4 py-2 rounded-md bg-green-700 text-neutral-50 text-center font-medium uppercase"
      >
        Start over
      </Link>
    </div>
  );
}
