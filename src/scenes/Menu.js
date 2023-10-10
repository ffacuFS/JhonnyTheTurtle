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
    this.add.image(0,0, "backgroundMenu").setOrigin(0,0)
    this.usFlag=this.add.image(1600, 90, "US-flag")
    .setInteractive();
    this.usFlag.on('pointerover', () => {
      this.usFlag.setScale(1.08);
    });
    this.usFlag.on('pointerout', () => {
      this.usFlag.setScale(1);
    });

    this.usFlag.on("pointerdown", () => {
      this.scene.start("option")
    });

    this.arFlag=this.add.image(1500, 90, "AR-flag")
    .setInteractive();
    this.arFlag.on('pointerover', () => {
      this.arFlag.setScale(1.08);
    });
    this.arFlag.on('pointerout', () => {
      this.arFlag.setScale(1);
    });

    this.arFlag.on("pointerdown", () => {
      this.scene.start("option")
    });
    this.playButton = this.add.image(1450 , 700, "play")
    .setInteractive();
  this.playButton.on('pointerover', () => {
    this.playButton.setScale(1.08);
  });
  this.playButton.on('pointerout', () => {
    this.playButton.setScale(1);
  });

  this.playButton.on("pointerdown", () => {
    this.scene.start("selectlevel")
  });
  /*this.selectLevel = this.add.text(950, 700, "NUEVO JUEGO", {
    fontSize: "100px",
    fontFamily: 'DM Serif Display',

    fill: '#A85214',

  })
    .setInteractive();
  this.selectLevel.on('pointerover', () => {
    this.selectLevel.setStyle({ fill: '#ffa615', fontSize: '105px' });
  });
  this.selectLevel.on('pointerout', () => {
    this.selectLevel.setStyle({ fill: '#A85214', fontSize: '100px' });
  });

  this.selectLevel.on("pointerdown", () => {
    this.scene.start("selectlevel")
  });*/

    this.options = this.add.text(1200, 850, "OPCIONES", {
      fontSize: "100px",
      fontFamily: 'DM Serif Display',

      fill: '#A85214',

    })
      .setInteractive();
    this.options.on('pointerover', () => {
      this.options.setStyle({ fill: '#ffa615', fontSize: '105px' });
    });
    this.options.on('pointerout', () => {
      this.options.setStyle({ fill: '#A85214', fontSize: '100px' });
    });



    this.options.on("pointerdown", () => {
      this.scene.start("option")
    });

  }
}
