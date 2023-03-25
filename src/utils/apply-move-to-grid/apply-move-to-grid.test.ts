import { describe, expect, test } from "vitest";
import { type TileGrid } from "../../types";
import { applyMoveToGrid } from "./apply-move-to-grid";

describe("HORIZONTAL moves", () => {
  test("apply horizontal switch move on grid", () => {
    const grid: TileGrid = [
      [
        { id: "1", type: "a" },
        { id: "2", type: "c" },
      ],
    ];

    expect(
      applyMoveToGrid(grid, {
        type: "HORIZONTAL_SWITCH",
        originTilePosition: [0, 0],
      })
    ).toStrictEqual([
      [
        { id: "2", type: "c" },
        { id: "1", type: "a" },
      ],
    ]);
  });

  test("throw an error if horizontal switch move cannot be made", () => {
    const grid: TileGrid = [
      [
        { id: "1", type: "a" },
        { id: "2", type: "c" },
      ],
    ];

    expect(() => {
      applyMoveToGrid(grid, {
        type: "HORIZONTAL_SWITCH",
        originTilePosition: [0, 1],
      });
    }).toThrowError();
  });
});

describe("VERTICAL moves", () => {
  test("apply vertical switch move on grid", () => {
    const grid: TileGrid = [[{ id: "1", type: "a" }], [{ id: "2", type: "c" }]];

    expect(
      applyMoveToGrid(grid, {
        type: "VERTICAL_SWITCH",
        originTilePosition: [0, 0],
      })
    ).toStrictEqual([[{ id: "2", type: "c" }], [{ id: "1", type: "a" }]]);
  });

  test("throw an error if vertical switch move cannot be made", () => {
    const grid: TileGrid = [[{ id: "1", type: "a" }], [{ id: "2", type: "c" }]];

    expect(() => {
      applyMoveToGrid(grid, {
        type: "VERTICAL_SWITCH",
        originTilePosition: [1, 0],
      });
    }).toThrowError();
  });
});

describe("LEFT_TO_RIGHT_DIAGONAL moves", () => {
  test("apply ltr diagonally move on grid", () => {
    const grid: TileGrid = [
      [
        { id: "1", type: "a" },
        { id: "2", type: "c" },
      ],
      [
        { id: "3", type: "g" },
        { id: "4", type: "t" },
      ],
    ];

    expect(
      applyMoveToGrid(grid, {
        type: "LEFT_TO_RIGHT_DIAGONAL",
        originTilePosition: [0, 0],
      })
    ).toStrictEqual([
      [
        { id: "4", type: "t" },
        { id: "2", type: "c" },
      ],
      [
        { id: "3", type: "g" },
        { id: "1", type: "a" },
      ],
    ]);
  });

  test("throw an error if ltr diagonally move cannot be made", () => {
    const grid: TileGrid = [
      [
        { id: "1", type: "a" },
        { id: "2", type: "c" },
      ],
      [
        { id: "3", type: "g" },
        { id: "4", type: "t" },
      ],
    ];

    expect(() => {
      applyMoveToGrid(grid, {
        type: "LEFT_TO_RIGHT_DIAGONAL",
        originTilePosition: [0, 1],
      });
    }).toThrowError();

    expect(() => {
      applyMoveToGrid(grid, {
        type: "LEFT_TO_RIGHT_DIAGONAL",
        originTilePosition: [1, 0],
      });
    }).toThrowError();
  });
});

describe("RIGHT_TO_LEFT_DIAGONAL moves", () => {
  test("apply rtl diagonally move on grid", () => {
    const grid: TileGrid = [
      [
        { id: "1", type: "a" },
        { id: "2", type: "c" },
      ],
      [
        { id: "3", type: "g" },
        { id: "4", type: "t" },
      ],
    ];

    expect(
      applyMoveToGrid(grid, {
        type: "RIGHT_TO_LEFT_DIAGONAL",
        originTilePosition: [0, 1],
      })
    ).toStrictEqual([
      [
        { id: "1", type: "a" },
        { id: "3", type: "g" },
      ],
      [
        { id: "2", type: "c" },
        { id: "4", type: "t" },
      ],
    ]);
  });

  test("throw an error if rtl diagonally move cannot be made", () => {
    const grid: TileGrid = [
      [
        { id: "1", type: "a" },
        { id: "2", type: "c" },
      ],
      [
        { id: "3", type: "g" },
        { id: "4", type: "t" },
      ],
    ];

    expect(() => {
      applyMoveToGrid(grid, {
        type: "RIGHT_TO_LEFT_DIAGONAL",
        originTilePosition: [0, 0],
      });
    }).toThrowError();

    expect(() => {
      applyMoveToGrid(grid, {
        type: "RIGHT_TO_LEFT_DIAGONAL",
        originTilePosition: [1, 1],
      });
    }).toThrowError();
  });
});
