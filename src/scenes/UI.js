import Phaser from "phaser";
import events from "./EventCenter";
import GameOver from "./GameOver";
import { EN_US, ES_AR } from "../enums/lengua";
import {
  getLanguageConfig,
  getPhrase,
  getTranslations,
} from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";

export default class UI extends Phaser.Scene {
  constructor() {
    super("ui");
    this.timer;
    this.elapsedTime = 0;
    const { Level, Continue, Restart, Time, User, MainMenu } = keys.ui;
    (this.updateString = Level), Restart, Continue, User, MainMenu, Time;
    this.levelApi = Level;
    this.timeApi = Time;
    this.restartApi = Restart;
    this.continueApi = Continue;
    this.userApi = User;
    this.mainMenuApi = MainMenu;
  }
  init(data) {
    this.level = data.level || 1;
    this.fruits = data.fruits || 0;
    this.shell = data.shell || 0;
    this.health = data.health || 5;
  }
  create() {
    const user = this.firebase.getUser();
    this.userText = this.add.text(10, 10, getPhrase(this.userApi), {
      fontSize: "25px",
      fontFamily: "DM Serif Display",
      fill: "#000000",
    });
    this.add.text(100, 10, `:${user.displayName || user.uid}`, {
      fontSize: "25px",
      fontFamily: "DM Serif Display",
      fill: "#000000",
    });

    this.healthIcon = this.add.image(50, 90, "healthUI");
    this.healthText = this.add.text(70, 80, ` ${this.health}`, {
      fontSize: "50px",
      fontFamily: "DM Serif Display",
      fill: "#000000",
    });

    this.shellIcon = this.add.image(310, 100, "shellUI");
    this.shellText = this.add.text(330, 80, ` ${this.shell}`, {
      fontSize: "50px",
      fontFamily: "DM Serif Display",
      fill: "#000000",
    });

    this.fruitIcon = this.add.image(180, 100, "fruitUI");
    this.fruitsText = this.add.text(200, 80, ` ${this.fruits}`, {
      fontSize: "50px",
      fontFamily: "DM Serif Display",
      fill: "#000000",
    });

    this.levelText = this.add
      .text(920, 10, getPhrase(this.levelApi), {
        fontSize: "80px",
        fontFamily: "DM Serif Display",
        fill: "#000000",
      })
      .setOrigin(0.5, 0);
    this.levelNumb = this.add
      .text(1040, 10, ` ${this.level}`, {
        fontSize: "80px",
        fontFamily: "DM Serif Display",
        fill: "#000000",
      })
      .setOrigin(0.5, 0);

    events.on("updateData", this.updateData, this);

    this.pauseButton = this.add.image(1800, 80, "pause").setInteractive();
    this.pauseButton.on("pointerup", this.showPauseMenu, this);
    this.timer = this.time.addEvent({
      delay: 1000, // 1000 milisegundos = 1 segundo
      callback: this.updateTimer,
      callbackScope: this,
      loop: true, // para que se repita
    });
    this.timerText = this.add
      .text(870, 100, getPhrase(this.timeApi), {
        fontSize: "40px",
        fill: "#000000",
        fontFamily: "DM Serif Display",
      })
      .setOrigin(0.5);
    this.timerNumb = this.add
      .text(1000, 100, " :0m 0s", {
        fontSize: "40px",
        fill: "#000000",
        fontFamily: "DM Serif Display",
      })
      .setOrigin(0.5);
  }

  updateTimer() {
    this.elapsedTime += 1;
    const minutes = Math.floor(this.elapsedTime / 60);
    const seconds = this.elapsedTime % 60;
    this.timerNumb.setText(`  :${this.elapsedTime}s`);
    this.timerNumb.setText(` :${minutes}m ${seconds}s`);
  }

  updateData(data) {
    this.level = data.level;
    this.health = data.health;
    this.fruits = data.fruits;
    this.shell = data.shell;
    this.levelNumb.setText(` ${data.level}`);
    this.healthText.setText(` ${data.health}`);
    this.fruitsText.setText(` ${data.fruits}`);
    this.shellText.setText(` ${data.shell}`);
  }
  showPauseMenu() {
    this.scene.pause("game");
    this.timer.paused = true;
    this.pauseMenu = this.add.container(960, 540);
    const radius = 20;
    const background = this.add
      .graphics()
      .fillStyle(0xffffff, 0.7)
      .fillRoundedRect(-400, -300, 800, 600, radius);
    background.setDepth(0);

    this.continueButtonText = this.add
      .text(0, -50, getPhrase(this.continueApi), {
        fontSize: "40px",
        fill: "#000000",
        fontFamily: "DM Serif Display",
      })
      .setOrigin(0.5)
      .setInteractive();
    this.restartButtonText = this.add
      .text(0, 50, getPhrase(this.restartApi), {
        fontSize: "40px",
        fill: "#000000",
        fontFamily: "DM Serif Display",
      })
      .setOrigin(0.5)
      .setInteractive();
    this.menuButtonText = this.add
      .text(0, 150, getPhrase(this.mainMenuApi), {
        fontSize: "40px",
        fill: "#000000",
        fontFamily: "DM Serif Display",
      })
      .setOrigin(0.5)
      .setInteractive();

    this.continueButtonText.on("pointerup", this.hidePauseMenu, this);
    this.restartButtonText.on(
      "pointerup",
      function () {
        events.emit("stopBackgroundMusic");
        this.restartGame();
      },
      this
    );
    this.menuButtonText.on(
      "pointerup",
      function () {
        this.returnToMenu();
        events.emit("stopBackgroundMusic");
      },
      this
    );

    this.pauseMenu.add([
      background,
      this.continueButtonText,
      this.restartButtonText,
      this.menuButtonText,
    ]);
  }

  hidePauseMenu() {
    this.pauseMenu.destroy();
    this.scene.resume("game");
    this.timer.paused = false;
  }

  restartGame() {
<<<<<<< HEAD
=======
    this.resetTimer();
    // Reiniciar la escena principal
>>>>>>> 250abbdab2ce51e0f11485ec8c7ba1aaafadca86
    this.scene.stop("game");
    this.scene.launch("game", {
      level: this.level,
      fruits: 0,
      shell: 0,
      health: 5,
    });
<<<<<<< HEAD
=======
    // Ocultar el menú de pausa
>>>>>>> 250abbdab2ce51e0f11485ec8c7ba1aaafadca86
    this.hidePauseMenu();
  }

  resetTimer() {
    this.elapsedTime = 0;
    this.timerNumb.setText(" :0m 0s"); // Ajusta esto según tu formato de visualización
  }  

  returnToMenu() {
    this.scene.stop("game");
    this.scene.start("menu");
  }

  update() {
    if (this.wasChangedLanguage === FETCHED) {
      this.wasChangedLanguage = READY;
      this.levelText.setText(getPhrase(this.levelApi));
      this.timerText.setText(getPhrase(this.timeApi));
      this.userText.setText(getPhrase(this.userApi));
      this.continueButtonText.setText(getPhrase(this.continueApi));
      this.restartButtonText.setText(getPhrase(this.restartApi));
      this.menuButtonText.setText(getPhrase(this.mainMenuApi));
    }
  }

  updateWasChangedLanguage = () => {
    this.wasChangedLanguage = FETCHED;
  };

  async getTranslations(language) {
    this.language = language;
    this.wasChangedLanguage = FETCHING;
    await getTranslations(language, this.updateWasChangedLanguage);
  }
}
