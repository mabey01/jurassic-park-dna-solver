import { SolvedSolutionState } from "../state/solution";
import { Move } from "./move";

interface SolutionProps {
  solution: SolvedSolutionState;
}

export function Solution({ solution }: SolutionProps) {
  return (
    <div>
      <ul className="list-none m-0">
        <li>
          Solution Duration:{" "}
          <span className="font-medium">{solution.meta.duration}ms</span>
        </li>
        <li>
          Number of Moves:{" "}
          <span className="font-medium">{solution.solvingPath.length}</span>
        </li>
      </ul>
      <ol className="mt-2">
        {solution.solvingPath.map((move, index) => (
          <li key={index}>
            <Move move={move} />
          </li>
        ))}
      </ol>
    </div>
  );
}
