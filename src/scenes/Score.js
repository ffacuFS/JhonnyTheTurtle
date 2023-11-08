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

export default class Score extends Phaser.Scene {
  constructor() {
    super("score");
    const { Top10players } = keys.score;
    this.updateString = Top10players;
    this.scoreApi = Top10players;
  }

  init (language){
    this.language = language;
  }
  create() {
    this.add.image(0, 0, "menulevelBG").setOrigin(0, 0);
    this.back = this.add.image(75, 75, "back").setInteractive();
    this.back.on("pointerover", () => {
      this.back.setScale(1.08);
    });
    this.back.on("pointerout", () => {
      this.back.setScale(1);
    });

    this.back.on("pointerdown", () => {
      this.scene.start("menu");
    });

    this.scoreApiText = this.add.text(960, 100, getPhrase(this.scoreApi), {
      fontSize: "100px",
      fontFamily: "DM Serif Display",
      fill: "#ffd557",
      stroke: "ffa615",
      })
      .setOrigin(0.5);

    // agregar los 10 mejores highscore
    this.firebase.getHighScores().then((scores) => {
      let scrollY = 200;
      scores.forEach((doc) => {
        this.add
          .text(400, scrollY, `${doc.name} - ${doc.score}`, {
            fontSize: 24,
          })
          .setOrigin(0.5);
        scrollY += 30;
      });
    });
  }

  update() {
    if (this.wasChangedLanguage === FETCHED) {
      this.wasChangedLanguage = READY;
      this.scoreApiText.setText(getPhrase(this.scoreApi));
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
