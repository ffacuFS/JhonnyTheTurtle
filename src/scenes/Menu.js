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

export default class Menu extends Phaser.Scene {

  constructor() {
    super("menu");
  }

  preload() {


  }

  create() {

    this.selectLevel = this.add.text(100, 600, "SELECCIÓN DE NIVEL", {
      fontSize: "100px",
      fontFamily: 'DM Serif Display',

      fill: '#ffd557',

    })
      .setInteractive();
    this.selectLevel.on('pointerover', () => {
      this.selectLevel.setStyle({ fill: '#ffa615', fontSize: '105px' });
    });
    this.selectLevel.on('pointerout', () => {
      this.selectLevel.setStyle({ fill: '#ffd557', fontSize: '100px' });
    });

    this.selectLevel.on("pointerdown", () => {
      this.scene.start("selectlevel")
    });

    this.options = this.add.text(100, 700, "OPCIONES", {
      fontSize: "100px",
      fontFamily: 'DM Serif Display',

      fill: '#ffd557',

    })
      .setInteractive();
    this.options.on('pointerover', () => {
      this.options.setStyle({ fill: '#ffa615', fontSize: '105px' });
    });
    this.options.on('pointerout', () => {
      this.options.setStyle({ fill: '#ffd557', fontSize: '100px' });
    });



    this.options.on("pointerdown", () => {
      this.scene.start("option")
    });

  }
}
