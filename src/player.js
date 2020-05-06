const Player = () => {
  const attack = (gameboard, positionIndex) =>
    gameboard.receiveAttack(positionIndex);
  return { attack };
};

module.exports = Player;
