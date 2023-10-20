import Phaser from "phaser";
import { EN_US, ES_AR } from "../enums/lengua";
import {
  getLanguageConfig,
  getPhrase,
  getTranslations,
} from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
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
  wasChangedLanguage = TODO;

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
    this.add.image(0, 0, "backgroundMenu").setOrigin(0, 0);
    const buttonMusic = this.add.image(1800, 90, "music").setInteractive();
    buttonMusic.on("pointerover", () => {
      buttonMusic.setScale(1.08);
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
      this.scene.start("selectlevel");
    });

    this.optionsText = this.add
      .text(1200, 850, getPhrase(this.options), {
        fontSize: "100px",
        fontFamily: "DM Serif Display",
        fill: "#A85214",
      })
      .setInteractive();
    this.optionsText.on("pointerover", () => {
      this.optionsText.setStyle({ fill: "#ffa615", fontSize: "105px" });
    });
    this.optionsText.on("pointerout", () => {
      this.optionsText.setStyle({ fill: "#A85214", fontSize: "100px" });
    });

  }

  update() {
    if (this.wasChangedLanguage === FETCHED) {
      this.wasChangedLanguage = READY;
      this.optionsText.setText(getPhrase(this.options));
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
