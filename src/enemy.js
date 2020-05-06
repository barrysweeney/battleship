import { playerGameboard } from "./battleship";

const Enemy = () => {
  const attack = (gameboard) =>
    gameboard.receiveAttack(
      Math.round(Math.random() * playerGameboard.positions.length)
    );
  return { attack };
};

export default Enemy;
