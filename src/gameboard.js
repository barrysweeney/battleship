import Ship from "./ship";

const Gameboard = function () {
  const positions = Array(100).fill("water");
  const missedPositions = [];
  const hitPositions = [];
  const ships = [];
  const shipSizes = [5, 4, 3, 3, 3];

  let shipsRemaining = 0;

  const getNumShipsRemaining = () => shipsRemaining;

  const placeShip = (startPosition, direction) => {
    const ship = Ship(shipSizes[0]);
    if (direction === "horizontal") {
      for (let i = 0; i < shipSizes[0]; i++) {
        let shipPos = startPosition + i;
        positions[shipPos] = ship;
      }
    } else {
      for (let i = 0; i < shipSizes[0]; i++) {
        let shipPos = startPosition + 10 * i;
        positions[shipPos] = ship;
      }
    }
    ships.push(ship);
    shipsRemaining += 1;
    // update shipSize array so the length of the next ship is different
    shipSizes.shift();
  };

  const receiveAttack = function (positionIndex) {
    const isShipHit = () =>
      typeof positions[positionIndex] === "object" &&
      !hitPositions.includes(positionIndex) &&
      !missedPositions.includes(positionIndex);
    if (isShipHit()) {
      const hitShip = positions[positionIndex];
      hitShip.hit();
      hitPositions.push(positionIndex);
      if (hitShip.isSunk()) {
        shipsRemaining -= 1;
      }
    } else {
      missedPositions.push(positionIndex);
    }
  };

  return {
    receiveAttack,
    placeShip,
    positions,
    hitPositions,
    missedPositions,
    ships,
    getNumShipsRemaining,
  };
};
export default Gameboard;
