import Phaser from "phaser";
import events from "./EventCenter";
import UI from "./UI";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("perdiste");
  }

  init(data) {
    this.level = data.level;
    this.health = data.health || 5;

    this.fruits = data.fruits || 0;
    this.shell = data.shell || 0;
  }

  create() {
    const gameOverAnim =this.add.sprite(860, 400, "gameOver");
    gameOverAnim.anims.play ("gameOVerA");
    console.log("anim creada")
    const restartButton = this.add.text(700, 900, "Volver a Jugar", {
      fontSize: "100px",
      fontFamily: "DM Serif Display",
      fill: "#ffd557",
      stroke: "ffa615",
    });
    

    // Configura el botón para que sea interactivo
    restartButton.setInteractive();

    // Agrega un evento para manejar el clic en el botón
    restartButton.on("pointerdown", () => {
      this.scene.start("game", {
        level: this.level,
        health: this.health,
        fruits: this.fruits,
        shell: this.shell,
    });
      this.scene.launch("ui", {
        level: this.level,
        health: this.health,
        fruits: this.fruits,
        shell: this.shell,
    });
    });
  }
}
