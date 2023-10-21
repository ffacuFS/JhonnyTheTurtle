import Phaser from "phaser";
import events from "./EventCenter";

// Manejador de eventos centralizados para comunicacion de componentes

// Importacion
// import events from './EventCenter'

// Emisor de mensaje de difusion
// Recibe el nombre del mensaje y los valores de parametro
// events.emit('health-changed', this.health)

// Receptor de mensaje, por ejemplo escena de UI
// Recibe el nombre del mensaje y una funcion callback a ejecutar
// events.on('health-changed', this.handleHealthChanged, this)

export default class SelectLevel extends Phaser.Scene {
  constructor() {
    super("selectlevel");
    this.nivelesDesbloqueados = 1;
  }

  preload() {}

  create() {
    this.add.image(0, 0, "menulevelBG").setOrigin(0, 0);
    this.back = this.add.image(75, 75, "back").setInteractive();
    this.back.on("pointerover", () => {
      this.back.setScale(1.08);
    });
    this.back.on("pointerout", () => {
      this.back.setScale(1);
    });

    this.back.on("pointerdown", () => {
      this.scene.start("menu");
    });
    this.levelText = this.add
      .text(this.sys.game.config.width / 2, 100, "Selección de Nivel", {
        fontSize: "100px",
        fontFamily: "DM Serif Display",
        fill: "#ffd557",
        stroke: "ffa615",
      })
      .setOrigin(0.5, 0.5);

    // Crear botones para seleccionar niveles
    this.level1 = this.add.text(570, 300, "Nivel 1", {
      fontSize: "70px",
      fontFamily: "DM Serif Display",
      fill: "#ffd557",
    });

    this.level2 = this.add.text(570, 400, "Nivel 2", {
      fontSize: "70px",
      fontFamily: "DM Serif Display",
      fill: "#ffd557",
    });

    this.level3 = this.add.text(570, 500, "Nivel 3", {
      fontSize: "70px",
      fontFamily: "DM Serif Display",
      fill: "#ffd557",
    });

    this.level1.setInteractive();
    this.level1.on("pointerover", () => {
      this.level1.setStyle({ fill: "#ffa615", fontSize: "73px" });
    });
    this.level1.on("pointerout", () => {
      this.level1.setStyle({ fill: "#ffd557", fontSize: "70px" });
    });
     this.level1.on("pointerdown", () => {
      if (this.nivelesDesbloqueados >= 1) {
        this.scene.start("game", { level: 1 });
        this.updateLevelText(1);
      }
    });

    this.level2.setInteractive();
    this.level2.on("pointerover", () => {
      this.level2.setStyle({ fill: "#ffa615", fontSize: "73px" });
    });
    this.level2.on("pointerout", () => {
      this.level2.setStyle({ fill: "#ffd557", fontSize: "70px" });
    });
  
    this.level2.on("pointerdown", () => {
      if (this.nivelesDesbloqueados >= 2) {
        this.scene.start("game", { level: 2 });
        this.updateLevelText(2);
        console.log("todavia no")
      }
    });

    this.level3.setInteractive();
    this.level3.on("pointerover", () => {
      this.level3.setStyle({ fill: "#ffa615", fontSize: "73px" });
    });
    this.level3.on("pointerout", () => {
      this.level3.setStyle({ fill: "#ffd557", fontSize: "70px" });
    });
     this.level3.on("pointerdown", () => {
      if (this.nivelesDesbloqueados >= 3) {
        this.scene.start("game", { level: 3 });
        this.updateLevelText(3);
        console.log("todavia no")
      }
    });

    events.on("desbloquearNuevoNivel", this.desbloquearNuevoNivel, this);
  }

  updateLevelText(selectedLevel) {
    this.levelText.setText(`Nivel seleccionado: ${selectedLevel}`);
  }
   desbloquearNuevoNivel() {
    this.nivelesDesbloqueados++;
  }
}
