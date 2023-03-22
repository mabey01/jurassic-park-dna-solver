import { motion, Variants } from "framer-motion";
import { SolvedSolutionState } from "../state/solution";
import { Move } from "./move";

const container: Variants = {
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

interface SolutionProps {
  solution: SolvedSolutionState;
}

export function Solution({ solution }: SolutionProps) {
  return (
    <div>
      <ul className="m-0 list-none">
        <li>
          Duration:{" "}
          <span className="font-medium">{solution.meta.duration}ms</span>
        </li>
        <li>
          Number of Moves:{" "}
          <span className="font-medium">{solution.solvingPath.length}</span>
        </li>
      </ul>
      <motion.ol
        className="mt-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {solution.solvingPath.map((move, index) => (
          <motion.li
            key={index}
            variants={item}
            transition={{ type: "spring", stiffness: 1200, damping: 34 }}
          >
            <Move move={move} />
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
