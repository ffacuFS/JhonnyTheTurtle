import Phaser from "phaser";
import events from "./EventCenter";
import UI from "./UI";

export default class Score extends Phaser.Scene {
  constructor() {
    super("score");
  }
  create() {
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

    this.add
      .text(960, 100, "Top 10 Scores", {
        fontSize: 48,
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
}
