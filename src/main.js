import Phaser from "phaser";
import Game from "./scenes/Game";
import Menu from "./scenes/Menu";
import SelectLevel from "./scenes/SelectLevel";
import UI from "./scenes/UI";
import Preload from "./scenes/Preload";
import GameOver from "./scenes/GameOver";
import Win from "./scenes/Win";

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1920,
      height: 1080,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
      debug: false,
    },
  },
  scene: [Preload, Menu, Game, UI, SelectLevel, GameOver, Win],
};

export default new Phaser.Game(config);
