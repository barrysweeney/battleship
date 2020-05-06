import Player from "./player";
import Enemy from "./enemy";
import RenderGame from "./renderGame";
import Gameboard from "./gameboard";

// setup players, gameboards and ships
const enemyGameboard = Gameboard();
const enemy = Enemy();
const playerGameboard = Gameboard();
const player = Player();

export { playerGameboard, player, enemy, enemyGameboard };
