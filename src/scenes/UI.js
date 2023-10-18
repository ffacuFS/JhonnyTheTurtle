import Phaser from "phaser";
import events from "./EventCenter";
import GameOver from "./GameOver";

// Manejador de eventos centralizados para comunicacion de componentes

// Importacion
// import events from './EventCenter'

// Emisor de mensaje de difusion
// Recibe el nombre del mensaje y los valores de parametro
// events.emit('health-changed', this.health)

// Receptor de mensaje, por ejemplo escena de UI
// Recibe el nombre del mensaje y una funcion callback a ejecutar
// events.on('health-changed', this.handleHealthChanged, this)

export default class UI extends Phaser.Scene {
  constructor() {
    super("ui");
  }
  init(data) {
    this.level = data.level || 1;
    this.fruits = data.fruits || 0;
    this.shell = data.shell || 0;
    this.health = data.health || 5;
  }
  create() {
    this.healthIcon = this.add.image(50, 90, "healthUI");
    this.healthText = this.add.text(70, 80, ` ${this.health}`, {
      fontSize: "50px",
      fontFamily: "DM Serif Display",
      fill: "#ffd557",
    });

    this.shellIcon = this.add.image(470, 100, "shellUI");
    this.shellText = this.add.text(500, 80, ` ${this.shell}`, {
      fontSize: "50px",
      fontFamily: "DM Serif Display",
      fill: "#ffd557",
    });
   
    this.fruitIcon = this.add.image(180, 100, "fruitUI");
    this.fruitsText = this.add.text(210, 80, ` ${this.fruits}`, {
      fontSize: "50px",
      fontFamily: "DM Serif Display",
      fill: "#ffd557",
    });

    this.levelText = this.add
      .text(960, 10, `Nivel ${this.level}`, {
        fontSize: "80px",
        fontFamily: "DM Serif Display",
        fill: "#ffd557",
      })
      .setOrigin(0.5, 0);

    /*events.on("actualizarDatos", (data) => {
      this.healthText.setText(`Vidas: ${data.health}`);
      this.levelText.setText(`Level: ${data.level}`);
    });*/

    events.on("actualizarDatos", this.actualizarDatos, this);
  }

  actualizarDatos(data) {
    this.level = data.level;
    this.health = data.health;
    this.fruits = data.fruits;
    this.shell = data.shell;
    this.levelText.setText(`Nivel ${data.level}`);
    this.healthText.setText(` ${data.health}`);
    this.fruitsText.setText(` ${data.fruits}`);
    this.shellText.setText(` ${data.shell}`);
  }
}
