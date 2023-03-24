import { expect, test } from "vitest";
import { PriorityQueue } from "./priority-queue";

test("should return undefined if polled on an empty queue", () => {
  const queue = new PriorityQueue();

  expect(queue.poll()).toEqual(undefined);
});

test("should return element that was just passed in", () => {
  const queue = new PriorityQueue<number>();

  queue.add(0, 10), expect(queue.poll()).toEqual(10);
});

test("should return the element with the lowest priority when multiple elements are added", () => {
  const queue = new PriorityQueue<number>();

  queue.add(0, 10);
  queue.add(4, 50);
  queue.add(2, 30);
  queue.add(3, 40);
  queue.add(1, 20);
  expect(queue.poll()).toEqual(10);

  expect(queue.poll()).toEqual(20);
  expect(queue.poll()).toEqual(30);
  expect(queue.poll()).toEqual(40);
  expect(queue.poll()).toEqual(50);
});
