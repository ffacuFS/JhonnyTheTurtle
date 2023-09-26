import Phaser from "phaser";
import events from "./EventCenter";
import Turtle from "../componentes/Turtle";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.spritesheet("turtle", "./assets/sprites/turtle.png", {
      frameWidth: 335,
      frameHeight: 343,
    });
    this.load.spritesheet("turtleAttack", "./assets/sprites/turtleattack.png", {
      frameWidth: 316,
      frameHeight: 296,
    });
    this.load.spritesheet("turtleJump", "./assets/sprites/turtle-jump.png", {
      frameWidth: 96,
      frameHeight: 180,
    });
    this.load.image("buho", "../assets/sprites/buho.png");
    this.load.image("pisos", "../assets/sprites/plataforma.jpg");
    this.load.tilemapTiledJSON("level1", "../assets/tilemaps/lv1.json");
  }

  create() {
    this.scene.start("menu");

    //Animación
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("turtle", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "turtle", frame: 5 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("turtle", { start: 6, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("turtleAttack", {
        start: 0,
        end: 12,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "jumpD",
      frames: this.anims.generateFrameNumbers("turtleJump", {
        start: 11,
        end: 21,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
