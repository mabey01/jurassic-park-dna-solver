import { useAtom, useAtomValue } from "jotai";
import { Grid } from "./components/grid";
import { Move } from "./components/move";
import { Moves } from "./components/moves";
import { useSolveGrid } from "./hooks/use-solve";
import { originGridAtom, targetGridAtom } from "./state/grids";
import { solveMoveAtom } from "./state/solve-moves";

function App() {
  const [originGrid, setOriginGrid] = useAtom(originGridAtom);
  const [targetGrid, setTargetGrid] = useAtom(targetGridAtom);

  const solveMoves = useAtomValue(solveMoveAtom);

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
        className="w-full rounded bg-blue-500 px-4 py-2 text-white font-medium"
        onClick={solveGrid}
      >
        Solve
      </button>

      {solveMoves.length > 0 && (
        <ol>
          {solveMoves.map((move, index) => (
            <li key={index}>
              <Move move={move} />
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}

export default App;
