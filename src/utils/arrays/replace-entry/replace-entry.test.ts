import { expect, test } from "vitest";
import { replaceEntry } from "./replace-entry";

test("replace entry at index 0", () => {
  expect(replaceEntry([0, 1, 2], 0, 99)).toStrictEqual([99, 1, 2]);
});

test("replace entry at index 1", () => {
  expect(replaceEntry([0, 1, 2], 1, 99)).toStrictEqual([0, 99, 2]);
});

test("replace entry at index -1", () => {
  expect(replaceEntry([0, 1, 2], -1, 99)).toStrictEqual([0, 1, 99]);
});
