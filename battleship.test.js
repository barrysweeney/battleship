const battleship = require("./battleship");

test("hit function marks a position as hit", () => {
  expect(battleship.Ship().hit(1)).toEqual("Position marked as hit");
});

test("isSunk function returns whether ship is sunk", () => {
  expect(battleship.Ship().isSunk()).toBe(false);
});

