import { playerGameboard, player, enemy, enemyGameboard } from "./battleship";

const RenderGame = function () {
  const playerGameboardContainer = document.querySelector(".playerGameboard");
  const enemyGameboardContainer = document.querySelector(".enemyGameboard");

  // create div for each position in playerGameboard
  // add am emoji representing what is locared at that position
  // and a class of hit if a ship at one of the locations has been hit
  const playerGameboardHTML = playerGameboard.positions
    .map((position, index) => {
      return `<div class="boardPosition ${
        playerGameboard.hitPositions.includes(index) ? "hit" : ""
      }">${typeof position === "object" ? "🚢" : "🌊"}</div>`;
    })
    .join("");

  // create a div for each position in enemyGameboard
  // add a question amrk emoji
  // unless the player has attacked that position
  // in which case add an emoji represeting what is located at the attacked position
  const enemyGameboardHTML = enemyGameboard.positions
    .map((position, index) => {
      if (enemyGameboard.hitPositions.includes(index)) {
        return `<div class="boardPosition">🚢</div>`;
      }
      if (enemyGameboard.missedPositions.includes(index)) {
        return `<div class="boardPosition">🌊</div>`;
      }
      return `<div class="boardPosition">?</div>`;
    })
    .join("");

  playerGameboardContainer.innerHTML = playerGameboardHTML;
  enemyGameboardContainer.innerHTML = enemyGameboardHTML;

  const enemyGameboardDivs = [...enemyGameboardContainer.children];
  enemyGameboardDivs.forEach((div, index) =>
    div.addEventListener("click", () => {
      player.attack(enemyGameboard, index);
      enemy.attack(playerGameboard);
      RenderGame();
    })
  );

  const feedback = document.querySelector(".feedback");
  feedback.innerText = `${enemyGameboard.getNumShipsRemaining()} enemy ships remaining`;

  if (enemyGameboard.getNumShipsRemaining() === 0) {
    feedback.innerText = "Game over. You win!";
  }
  if (playerGameboard.getNumShipsRemaining() === 0) {
    feedback.innerText = "Game over. You lose!";
  }
};

export default RenderGame;
