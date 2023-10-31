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
    const user = this.firebase.getUser();
    this.add.text(10, 10, `Usuario ${user.displayName || user.uid}` , {
      fontSize: "25px",
      fontFamily: "DM Serif Display",
      fill: "#ffd557",
    });

    this.healthIcon = this.add.image(50, 90, "healthUI");
    this.healthText = this.add.text(70, 80, ` ${this.health}`, {
      fontSize: "50px",
      fontFamily: "DM Serif Display",
      fill: "#ffd557",
    });

    this.shellIcon = this.add.image(310, 100, "shellUI");
    this.shellText = this.add.text(330, 80, ` ${this.shell}`, {
      fontSize: "50px",
      fontFamily: "DM Serif Display",
      fill: "#ffd557",
    });
   
    this.fruitIcon = this.add.image(180, 100, "fruitUI");
    this.fruitsText = this.add.text(200, 80, ` ${this.fruits}`, {
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
    // Crear botón de pausa

    events.on("actualizarDatos", this.actualizarDatos, this);

    this.pauseButton = this.add.image(1800, 60, "pause").setInteractive();
  this.pauseButton.on("pointerup", this.showPauseMenu, this);
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
  showPauseMenu() {
    // Desactivar la escena principal mientras el menú de pausa está activo
    this.scene.pause("game");
  
    // Crear el menú de pausa
    this.pauseMenu = this.add.container(960, 540);
    const background = this.add.graphics().fillStyle(0x000000, 0.7).fillRect(-400, -300, 800, 600);
    const continueButton = this.add.text(0, -50, "Continuar", { fontSize: "40px", fill: "#ffd557" }).setOrigin(0.5).setInteractive();
    const restartButton = this.add.text(0, 50, "Reiniciar", { fontSize: "40px", fill: "#ffd557" }).setOrigin(0.5).setInteractive();
    const menuButton = this.add.text(0, 150, "Volver al Menú", { fontSize: "40px", fill: "#ffd557" }).setOrigin(0.5).setInteractive();
  
    // Agregar eventos a los botones del menú de pausa
    continueButton.on("pointerup", this.hidePauseMenu, this);
    restartButton.on("pointerup", this.restartGame, this);
    menuButton.on("pointerup", this.returnToMenu, this);
  
    // Agregar elementos al contenedor del menú de pausa
    this.pauseMenu.add([background, continueButton, restartButton, menuButton]);
  }
  
  hidePauseMenu() {
    // Destruir el menú de pausa
    this.pauseMenu.destroy();
  
    // Reactivar la escena principal
    this.scene.resume("game");
  }
  
  restartGame() {
    // Reiniciar la escena principal
    this.scene.stop("game");

    // Reiniciar la escena principal
    this.scene.launch("game", { level: this.level, fruits: 0, shell: 0, health: 5 });
  
    // Ocultar el menú de pausa
    this.hidePauseMenu();
  }
  
  returnToMenu() {
    // Volver al menú principal
    this.scene.stop("game");
    this.scene.start("menu");
  }
}
