import { playerGameboard, enemyGameboard } from "./battleship";
import RenderGame from "./renderGame";
import "./index.css";

/* Image credit:  David Mark from Pixabay */
let imageSource = "submarine.jpg";
document.documentElement.style.cssText = `background-image: url(${imageSource});`;

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

RenderGame();
