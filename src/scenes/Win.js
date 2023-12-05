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
    super("victory");
    const { Winner } = keys.victory;
    this.updateString = Winner;
    this.winnerApi = Winner;
  }
  init({ language, score }) {
    this.language = language;
    this.score = score || 0;
    console.log(this.score);
  }
  create() {
   const videoFinal = this.add.video(960, 540, "cinematica2");
    videoFinal.play();
    this.restartButtonText = this.add.text(
      1600,
      1000,
      "Volver al menú",
      {
        fontSize: "80px",
          fontFamily: "DM Serif Display",
          fill: "#ffd557",
          stroke: "ffa615",
      }
    );
    this.restartButtonText.setOrigin(0.5);
    this.restartButtonText.setInteractive();
    this.restartButtonText.on("pointerover", () => {
      this.restartButtonText.setScale(1.08);
    });
    this.restartButtonText.on("pointerout", () => {
      this.restartButtonText.setScale(1);
    });
    this.restartButtonText.on("pointerdown", () => {
      this.scene.start("menu");
    });

    //insertar datos
    const user = this.firebase.getUser();
    console.log("datos guardados", user, this.score);
    this.firebase.saveGameData(user.uid, {
      score: this.score,
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
