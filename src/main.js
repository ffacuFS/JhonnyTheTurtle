import Phaser from "phaser";
import Game from "./scenes/Game";
import Menu from "./scenes/Menu";
import Option from "./scenes/Option";
import SelectLevel from "./scenes/SelectLevel";
import UI from "./scenes/UI";
import Preload from "./scenes/Preload";
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  scene: [Preload,Menu, Game, UI, SelectLevel,Option]
};

export default new Phaser.Game(config);
