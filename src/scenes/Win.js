import Phaser from "phaser";
import events from "./EventCenter";
import UI from "./UI";
import { EN_US, ES_AR } from "../enums/lengua";
import {
  getLanguageConfig,
  getPhrase,
  getTranslations,
} from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";

export default class Win extends Phaser.Scene {
  constructor() {
    super("victoria");
    const { Winner } = keys.victoria;
    this.updateString = Winner;
    this.winnerApi = Winner;

  }
  init (language){
    this.language = language;
  }
  create() {
    this.restartButtonText = this.add.text(400, 300, getPhrase(this.winnerApi), {
      fontFamily: "Arial",
      fontSize: 24,
      color: "#ffffff",
    });

    // Configura el botón para que sea interactivo
    this.restartButtonText.setInteractive();

    // Agrega un evento para manejar el clic en el botón
    this.restartButtonText.on("pointerdown", () => {
      this.scene.start("menu"); 
    });
  }
  update() {
    if (this.wasChangedLanguage === FETCHED) {
      this.wasChangedLanguage = READY;
      this.restartButtonText.setText(getPhrase(this.winnerApi));
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