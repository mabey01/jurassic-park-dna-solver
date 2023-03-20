import { useAtom, useAtomValue } from "jotai";
import { ComponentProps } from "react";
import { Link, Navigate } from "react-router-dom";
import { Grid } from "./components/grid";
import { Solution } from "./components/solution";
import { useSolveGrid } from "./hooks/use-solve";
import { originGridAtom, targetGridAtom } from "./state/grids";
import { solutionStateAtom } from "./state/solution";

function PageLayout({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <div {...props} className={`h-full ${className}`}>
      <div className="p-2 sm:p-4 flex gap-4 flex-col h-full max-w-2xl mx-auto">
        {children}
      </div>
    </div>
  );
}

function PageHeadline({ children, className, ...props }: ComponentProps<"h1">) {
  return (
    <h1 {...props} className={`text-2xl font-semibold ${className}`}>
      {children}
    </h1>
  );
}

export function OriginGridPage() {
  const [originGrid, setOriginGrid] = useAtom(originGridAtom);

  return (
    <PageLayout className="bg-neutral-900 text-neutral-50">
      <div className="flex-1 sm:flex-grow-0">
        <PageHeadline>Set Origin Grid</PageHeadline>
        <div className="mt-2 sm:mt-8">
          <Grid grid={originGrid} onUpdateGrid={setOriginGrid} />
        </div>
      </div>
      <div className="flex justify-end">
        <Link
          to="/target-grid"
          className="w-full sm:w-auto px-4 py-2 rounded-md bg-neutral-700 text-neutral-50 text-center font-medium uppercase"
        >
          Continue
        </Link>
      </div>
    </PageLayout>
  );
}

export function TargetGridPage() {
  const calculateResults = useSolveGrid();
  const [targetGrid, setTargetGrid] = useAtom(targetGridAtom);

  return (
    <PageLayout className="bg-neutral-900 text-neutral-50">
      <div className="flex-1 sm:flex-grow-0">
        <PageHeadline>Set Target Grid</PageHeadline>
        <div className="mt-2 sm:mt-8">
          <Grid grid={targetGrid} onUpdateGrid={setTargetGrid} />
        </div>
      </div>
      <div className="flex justify-end">
        <Link
          to="/results"
          onClick={calculateResults}
          className="w-full sm:w-auto px-4 py-2 rounded-md bg-neutral-700 text-neutral-50 text-center font-medium uppercase"
        >
          Calculate path
        </Link>
      </div>
    </PageLayout>
  );
}

export function ResultPage() {
  const resultsState = useAtomValue(solutionStateAtom);

  if (resultsState.state === "idle") {
    return <Navigate to="/" />;
  }

  if (resultsState.state === "grids-are-equal") {
    return (
      <PageLayout className="bg-yellow-500">
        <div className="flex-1 sm:flex-grow-0">
          <PageHeadline>Nothing to solve</PageHeadline>
          <p className="mt-2 sm:mt-8">
            The two Grids are already equal. Try to modify the Target Grid so
            that there is at least one Tile that is different between the two
            Grids.
          </p>
        </div>
        <div className="flex justify-end">
          <Link
            to="/"
            className="w-full sm:w-auto px-4 py-2 rounded-md bg-yellow-700 text-neutral-50 text-center font-medium uppercase"
          >
            Start over
          </Link>
        </div>
      </PageLayout>
    );
  }

  if (resultsState.state === "solving") {
    return (
      <div className="w-full h-full bg-blue-500 text-neutral-50 flex justify-center">
        <div className="mt-32">Calculating best path...</div>
      </div>
    );
  }

  return (
    <PageLayout className=" bg-green-500 text-neutral-50">
      <div className="flex-1 sm:flex-grow-0">
        <PageHeadline>Solution</PageHeadline>
        <div className="mt-2 sm:mt-8">
          <Solution solution={resultsState} />
        </div>
      </div>
      <div className="flex justify-end">
        <Link
          to="/"
          className="w-full sm:w-auto px-4 py-2 rounded-md bg-green-700 text-neutral-50 text-center font-medium uppercase"
        >
          Start over
        </Link>
      </div>
    </PageLayout>
  );
}
