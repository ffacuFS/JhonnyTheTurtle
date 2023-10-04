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
  }

  preload() {


  }

  create() {
    this.back = this.add.text(20, 15, "Volver", {
      fontSize: "50px",
      fontFamily: 'DM Serif Display',
      fill: '#ffd557',
    })
      .setInteractive();
    this.back.on('pointerover', () => {
      this.back.setStyle({ fill: '#ffa615', fontSize: "53px" });
    });
    this.back.on('pointerout', () => {
      this.back.setStyle({ fill: '#ffd557', fontSize: "50px" });
    });

    this.back.on("pointerdown", () => {
      this.scene.start("menu")
    });
    this.levelText = this.add.text(this.sys.game.config.width / 2, 100, "Selección de Nivel", {
      fontSize: "100px",
      fontFamily: 'DM Serif Display',
      fill: '#ffd557',
      stroke: "ffa615",
      strokeThickness: 10,
    }).setOrigin(0.5, 0.5)

    // Crear botones para seleccionar niveles
    this.level1 = this.add.text(570, 300, "Nivel 1", {
      fontSize: "70px",
      fontFamily: 'DM Serif Display',
      fill: '#ffd557'
    });

    this.level2 = this.add.text(570, 400, "Nivel 2", {
      fontSize: "70px",
      fontFamily: 'DM Serif Display',
      fill: '#ffd557'
    });

    this.level3 = this.add.text(570, 500, "Nivel 3", {
      fontSize: "70px",
      fontFamily: 'DM Serif Display',
      fill: '#ffd557'
    });

    this.level1.setInteractive();
    this.level1.on('pointerover', () => {
      this.level1.setStyle({ fill: '#ffa615', fontSize: "73px" });
    });
    this.level1.on('pointerout', () => {
      this.level1.setStyle({ fill: '#ffd557', fontSize: "70px" });
    });
    this.level1.on("pointerdown", () => {
      this.scene.start("game", { nivel: 1 });
      this.updateLevelText(1);
    });

    this.level2.setInteractive();
    this.level2.on('pointerover', () => {
      this.level2.setStyle({ fill: '#ffa615', fontSize: "73px" });
    });
    this.level2.on('pointerout', () => {
      this.level2.setStyle({ fill: '#ffd557', fontSize: "70px" });
    });
    this.level2.on("pointerdown", () => {
      this.scene.start("game", { nivel: 1 });
      this.updateLevelText(1);
    });
    this.level2.on("pointerdown", () => {
      this.scene.start("game", { nivel: 2 });
      this.updateLevelText(2);
    });

    this.level3.setInteractive();
    this.level3.on('pointerover', () => {
      this.level3.setStyle({ fill: '#ffa615', fontSize: "73px" });
    });
    this.level3.on('pointerout', () => {
      this.level3.setStyle({ fill: '#ffd557', fontSize: "70px" });
    });
    this.level3.on("pointerdown", () => {
      this.scene.start("game", { nivel: 3 });
      this.updateLevelText(3);
    });
  }

  updateLevelText(selectedLevel) {
    this.levelText.setText(`Nivel seleccionado: ${selectedLevel}`);
  }
}