const Ship = require("../src/ship");

test("hit function increments hit counter", () => {
  const ship = Ship();
  ship.hit();
  expect(ship.getTimesHit()).toEqual(1);
});

test("isSunk function returns true if timesHit equals the ships length", () => {
  const ship = Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("isSunk function returns false if timesHit doesn't equals the ships length", () => {
  const ship = Ship(5);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});
