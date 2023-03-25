import * as Checkbox from "@radix-ui/react-checkbox";
import { useAtom, useAtomValue } from "jotai";
import { ComponentProps } from "react";
import { Link, LinkProps, Navigate } from "react-router-dom";
import { Grid } from "./components/grid";
import { Solution } from "./components/solution";
import { SolvingGrid } from "./components/solving-grid";
import { useEnableVerticalSkipMove } from "./hooks/use-enable-vertical-skip-move";
import { useSolveGrid } from "./hooks/use-solve";
import { originGridAtom, targetGridAtom } from "./state/grids";
import { solutionStateAtom } from "./state/solution";

function PageLayout({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <div {...props} className={`h-full ${className}`}>
      <div className="mx-auto flex h-full max-w-2xl flex-col gap-4 p-2 sm:p-4">
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

function LinkButton({ className, children, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      className={`w-full rounded-md px-4 py-2 text-center font-medium outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 sm:w-auto ${className}`}
    >
      {children}
    </Link>
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
        <LinkButton
          to="/target-grid"
          className="bg-neutral-700 text-neutral-50 hover:bg-neutral-600"
        >
          Continue
        </LinkButton>
      </div>
    </PageLayout>
  );
}

export function TargetGridPage() {
  const calculateResults = useSolveGrid();
  const [targetGrid, setTargetGrid] = useAtom(targetGridAtom);
  const {
    isVerticalSkipMoveEnabled,
    enableVerticalSkipMove,
    disableVerticalSkipMove,
  } = useEnableVerticalSkipMove();

  return (
    <PageLayout className="bg-neutral-900 text-neutral-50">
      <div className="flex-1 sm:flex-grow-0">
        <PageHeadline>Set Target Grid</PageHeadline>
        <div className="mt-2 sm:mt-8">
          <Grid grid={targetGrid} onUpdateGrid={setTargetGrid} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 sm:justify-end">
          <Checkbox.Root
            checked={isVerticalSkipMoveEnabled}
            onCheckedChange={(isChecked) =>
              isChecked ? enableVerticalSkipMove() : disableVerticalSkipMove()
            }
            id="enable-vertical-skip-move"
            className="flex h-6 w-6 appearance-none items-center justify-center rounded-md bg-white outline-none hover:bg-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            <Checkbox.Indicator className="text-neutral-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="leading-none" htmlFor="enable-vertical-skip-move">
            Include Dr. Henry Wu special move
          </label>
        </div>
        <div className="flex justify-end">
          <LinkButton
            to="/results"
            onClick={calculateResults}
            className="bg-neutral-700 text-neutral-50 hover:bg-neutral-600"
          >
            Calculate Path
          </LinkButton>
        </div>
      </div>
    </PageLayout>
  );
}

export function ResultPage() {
  const originGrid = useAtomValue(originGridAtom);
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
          <LinkButton
            to="/"
            className="bg-yellow-700 text-neutral-50 hover:bg-yellow-600"
          >
            Start over
          </LinkButton>
        </div>
      </PageLayout>
    );
  }

  if (resultsState.state === "solving") {
    return (
      <div className="flex h-full w-full justify-center bg-blue-500 text-neutral-50">
        <div className="mt-32">Calculating best path...</div>
      </div>
    );
  }

  return (
    <PageLayout className=" bg-green-500 text-neutral-50">
      <div className="flex-1 sm:flex-grow-0">
        <PageHeadline>Solution</PageHeadline>
        <div>
          <SolvingGrid
            sourceGrid={originGrid}
            solvingPath={resultsState.solvingPath}
          />
        </div>
        <div className="mt-2 sm:mt-8">
          <Solution solution={resultsState} />
        </div>
      </div>
      <div className="flex justify-end">
        <LinkButton
          to="/"
          className=" bg-green-700 text-neutral-50 hover:bg-green-600"
        >
          Start over
        </LinkButton>
      </div>
    </PageLayout>
  );
}
