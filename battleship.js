// make 1d version with one ship to start

// battleship module using revealing module pattern
const battleship = (function () {
  "use strict";

  const Ship = function (length) {
    let timesHit = 0;
    const getLength = () => length;

    function hit() {
      timesHit += 1;
      // mark position as hit
    }

    const isSunk = () => timesHit === getLength();

    return { isSunk, hit };
  };

  const Gameboard = function () {
    const positions = Array(100).fill("water");
    const missedPositions = [];
    const hitPositions = [];
    const ships = [];
    let shipsRemaining = 0;
    const shipSizes = [5, 4, 3, 3, 3];
    const getNumShipsRemaining = () => shipsRemaining;

    const placeShip = (startPosition, direction) => {
      // figure out start and end posiotions for ships
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
      shipSizes.shift();
    };

    const receiveAttack = function (positionIndex) {
      if (
        typeof positions[positionIndex] === "object" &&
        !hitPositions.includes(positionIndex) &&
        !missedPositions.includes(positionIndex)
      ) {
        positions[positionIndex].hit();
        hitPositions.push(positionIndex);
        if (positions[positionIndex].isSunk()) {
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

  const Player = () => {
    const attack = (gameboard, positionIndex) =>
      gameboard.receiveAttack(positionIndex);
    return { attack };
  };

  const Enemy = () => {
    const attack = (gameboard) =>
      gameboard.receiveAttack(
        Math.round(Math.random() * playerGameboard.positions.length)
      );
    return { attack };
  };

  // setup players, gameboards and ships
  const enemyGameboard = Gameboard();
  const enemy = Enemy();
  const playerGameboard = Gameboard();
  const player = Player();

  enemyGameboard.placeShip(1, "horizontal");
  enemyGameboard.placeShip(8, "vertical");
  enemyGameboard.placeShip(20, "vertical");
  enemyGameboard.placeShip(45, "vertical");
  enemyGameboard.placeShip(92, "horizontal");

  playerGameboard.placeShip(1, "horizontal");
  playerGameboard.placeShip(9, "vertical");
  playerGameboard.placeShip(30, "horizontal");
  playerGameboard.placeShip(75, "horizontal");
  playerGameboard.placeShip(71, "vertical");

  const renderGame = function () {
    const playerGameboardContainer = document.querySelector(".playerGameboard");
    const enemyGameboardContainer = document.querySelector(".enemyGameboard");

    const playerGameboardHTML = playerGameboard.positions
      .map((position, index) => {
        return `<div class="${
          playerGameboard.hitPositions.includes(index) ? "hit" : ""
        }">${typeof position === "object" ? "🚢" : "🌊"}</div>`;
      })
      .join("");

    const enemyGameboardHTML = enemyGameboard.positions
      .map((position, index) => {
        if (enemyGameboard.hitPositions.includes(index)) {
          return `<div>🚢</div>`;
        }
        if (enemyGameboard.missedPositions.includes(index)) {
          return `<div>🌊</div>`;
        }
        return `<div>?</div>`;
      })
      .join("");

    playerGameboardContainer.innerHTML = playerGameboardHTML;
    enemyGameboardContainer.innerHTML = enemyGameboardHTML;

    const enemyGameboardDivs = [...enemyGameboardContainer.children];
    enemyGameboardDivs.forEach((div, index) =>
      div.addEventListener("click", () => {
        player.attack(enemyGameboard, index);
        enemy.attack(playerGameboard);
        renderGame();
      })
    );

    const feedback = document.querySelector(".feedback");
    console.log(enemyGameboard.ships);

    feedback.innerText = `${enemyGameboard.getNumShipsRemaining()} enemy ships remaining`;
  };

  renderGame();
})();

module.exports = battleship;
