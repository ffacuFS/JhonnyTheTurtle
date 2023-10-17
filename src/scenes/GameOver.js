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
    const restartButton = this.add.text(400, 300, "Volver a Jugar", {
      fontFamily: "Arial",
      fontSize: 24,
      color: "#ffffff",
    });

    // Configura el botón para que sea interactivo
    restartButton.setInteractive();

    // Agrega un evento para manejar el clic en el botón
    restartButton.on("pointerdown", () => {
      this.scene.start("game", { nivel: 1 });
      this.scene.launch("ui", {
        level: this.level,
      });
    });
  }
}
