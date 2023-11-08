import Phaser from "phaser";
import { EN_US, ES_AR } from "../enums/lengua";
import {
  getLanguageConfig,
  getPhrase,
  getTranslations,
} from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import Score from "./Score";
import events from "./EventCenter";
import gameConfig from "../enums/config";

export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
    const { options } = keys.menu;
    this.updateString = options;    
    this.options = options;
  }

  init({ language }) {
    this.level = 1;
    this.language = language;
  }

  preload() {}

  create() {
    this.backgroundMusic = this.sound.add("prueba");
    this.backgroundMusic.play();

    this.add.image(0, 0, "backgroundMenu").setOrigin(0, 0);

    const buttonMusic = this.add.image(1800, 90, "music").setInteractive();
    buttonMusic.on("pointerover", () => {
      buttonMusic.setScale(1.08);
    });

    buttonMusic.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      if (gameConfig.isSoundMuted) {
        this.backgroundMusic.play();
        gameConfig.isSoundMuted = false;
      } else {
        this.sound.stopAll();
        gameConfig.isSoundMuted = true;
      }
    });

    const buttonEnglish = this.add.image(1600, 90, "US-flag").setInteractive();
    buttonEnglish.on("pointerover", () => {
      buttonEnglish.setScale(1.08);
    });
    buttonEnglish.on("pointerout", () => {
      buttonEnglish.setScale(1);
    });

    buttonEnglish.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.getTranslations(EN_US);
    });

    const buttonSpanish = this.add.image(1500, 90, "AR-flag").setInteractive();
    buttonSpanish.on("pointerover", () => {
      buttonSpanish.setScale(1.08);
    });
    buttonSpanish.on("pointerout", () => {
      buttonSpanish.setScale(1);
    });

    buttonSpanish.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.getTranslations(ES_AR);
    });

    this.playButton = this.add.image(1450, 700, "play").setInteractive();
    this.playButton.on("pointerover", () => {
      this.playButton.setScale(1.08);
    });
    this.playButton.on("pointerout", () => {
      this.playButton.setScale(1);
    });

    this.playButton.on("pointerdown", () => {
      this.backgroundMusic.stop();
      this.scene.start("selectlevel");
    });
    this.scoreButton=this.add.image(1450,950, "trophy").setInteractive();
    this.scoreButton.on("pointerover",()=> {
      this.scoreButton.setScale(1.08);
    });
    this.scoreButton.on("pointerout", () => {
      this.scoreButton.setScale(1);
    });
    this.scoreButton.on("pointerdown", () => {
      this.backgroundMusic.stop();
      this.scene.start("score");
    });

    if (gameConfig.isSoundMuted) {
      this.sound.stopAll();
    }
  }

  update() {
    if (this.wasChangedLanguage === FETCHED) {
      this.wasChangedLanguage = READY;
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
