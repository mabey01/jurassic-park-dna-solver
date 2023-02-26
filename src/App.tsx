import { useAtom, useAtomValue } from "jotai";
import { Grid } from "./components/grid";
import { Move } from "./components/move";
import { Moves } from "./components/moves";
import { Solution } from "./components/solution";
import { useSolveGrid } from "./hooks/use-solve";
import { originGridAtom, targetGridAtom } from "./state/grids";
import { solutionStateAtom } from "./state/solution";

function App() {
  const [originGrid, setOriginGrid] = useAtom(originGridAtom);
  const [targetGrid, setTargetGrid] = useAtom(targetGridAtom);

  const solutionState = useAtomValue(solutionStateAtom);

  const solveGrid = useSolveGrid();

  return (
    <main className="p-4 flex flex-col gap-4">
      <div>
        <h2 className="font-medium">Origin Grid</h2>
        <div className="mt-2">
          <Grid grid={originGrid} onUpdateGrid={setOriginGrid} />
        </div>
      </div>

      <div>
        <Moves />
      </div>

      <div>
        <h2 className="font-medium">Target Grid</h2>
        <div className="mt-2">
          <Grid grid={targetGrid} onUpdateGrid={setTargetGrid} />
        </div>
      </div>

      <button
        disabled={solutionState.state === "solving"}
        className="w-full rounded bg-blue-500 px-4 py-2 text-white font-medium disabled:bg-blue-300"
        onClick={solveGrid}
      >
        Solve
      </button>

      {solutionState.state === "solving" && <div>Is Solving...</div>}

      {solutionState.state === "solved" && (
        <div>
          <Solution solution={solutionState} />
        </div>
      )}
    </main>
  );
}

export default App;
