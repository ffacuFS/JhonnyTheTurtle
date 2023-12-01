import Phaser from "phaser";
import events from "./EventCenter";
import { EN_US, ES_AR } from "../enums/lengua";
import {
  getLanguageConfig,
  getPhrase,
  getTranslations,
} from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("lose");
    const { Youlost, Playagain } = keys.lose;
    (this.updateString = Youlost), Playagain;
    this.youLostApi = Youlost;
    this.playAgainApi = Playagain;
  }

  init(data, language) {
    this.level = data.level;
    this.health = data.health || 5;
    this.score = data.score || 0;
    this.fruits = data.fruits || 0;
    this.shell = data.shell || 0;
    this.language = language;
  }

  create() {
    const gameOverAnim = this.add.sprite(890, 500, "lose");
    this.restartButtonText = this.add.text(
      750,
      900,
      getPhrase(this.playAgainApi),
      {
        fontSize: "100px",
        fontFamily: "DM Serif Display",
        fill: "#ffd557",
        stroke: "ffa615",
      }
    );

    this.restartButtonText.setInteractive();
    this.restartButtonText.on("pointerdown", () => {
      this.scene.start("game", {
        level: this.level,
        health: this.health,
        fruits: this.fruits,
        shell: this.shell,
        score: this.score,
      });
      this.scene.launch("ui", {
        level: this.level,
        health: this.health,
        fruits: this.fruits,
        shell: this.shell,
      });
    });
  }

  update() {
    if (this.wasChangedLanguage === FETCHED) {
      this.wasChangedLanguage = READY;
      this.restartButtonText.setText(getPhrase(this.playAgainApi));
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
