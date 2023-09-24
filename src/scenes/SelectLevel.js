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
    this.levelText = this.add.text(300, 20, "Seleccion de Nivel", {
        font: "24px",
        fill: "#ffffff"
      });
  
      // Crear botones para seleccionar niveles
      this.level1 = this.add.text(320, 200, "Nivel 1", {
        font: "24px",
        fill: "#ffffff",
        backgroundColor: "#000000"
      });
  
      this.level2 = this.add.text(320, 300, "Nivel 2", {
        font: "24px",
        fill: "#ffffff",
        backgroundColor: "#000000"
      });
  
      this.level3 = this.add.text(320, 400, "Nivel 3", {
        font: "24px",
        fill: "#ffffff",
        backgroundColor: "#000000"
      });
  
      this.level1.setInteractive();
      this.level1.on("pointerdown", () => {
        this.scene.start("game", { nivel: 1 });
        this.updateLevelText(1);
      });
  
      this.level2.setInteractive();
      this.level2.on("pointerdown", () => {
        this.scene.start("game", { nivel: 2 });
        this.updateLevelText(2);
      });
  
      this.level3.setInteractive();
      this.level3.on("pointerdown", () => {
        this.scene.start("game", { nivel: 3 });
        this.updateLevelText(3);
      });
    }
  
    updateLevelText(selectedLevel) {
      this.levelText.setText(`Nivel seleccionado: ${selectedLevel}`);
    }
}