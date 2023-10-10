import Phaser from "phaser";
import { getLanguageConfig, getTranslations } from "../services/translations";
import events from "./EventCenter";
import Turtle from "../componentes/Turtle";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    //traduccion
    this.language = getLanguageConfig();
    alert(this.language);

    //
    this.load.spritesheet("turtle", "./assets/sprites/turtle1.png", {
      frameWidth: 114.6,
      frameHeight: 156,
    });
    this.load.spritesheet(
      "turtleAttack",
      "./assets/sprites/turtle-attack1.png",
      {
        frameWidth: 147.8,
        frameHeight: 147,
      }
    );
    this.load.spritesheet("turtleJump", "./assets/sprites/turtle-jump1.png", {
      frameWidth: 133.5,
      frameHeight: 162,
    });
    this.load.spritesheet("boss", "../sprites/boss.png", {
      frameWidth: 170.5,
      frameHeight: 208,
    });
    this.load.image("buho", "../assets/sprites/buho.png");
    this.load.image("pisos", "../assets/sprites/plataforma.jpg");
    this.load.image("menulevelBG", "../assets/atlas/menulevel-01.png");
    this.load.image("backgroundMenu", "../assets/atlas/newGame-01.png");
    this.load.image("backgroundBoss", "../assets/atlas/laboratory.png");
    this.load.image("back", "../assets/atlas/back_1.png");
    this.load.image("play", "../assets/atlas/play.png");
    this.load.image("healthUI", "../assets/atlas/health.png");
    this.load.image("fruitUI", "../assets/atlas/fruit.png");
    this.load.image("US-flag", "../assets/atlas/US.png");
    this.load.image("AR-flag", "../assets/atlas/AR.png");
    this.load.tilemapTiledJSON("level1", "../assets/tilemaps/lv1.json");
    this.load.tilemapTiledJSON("level2", "../assets/tilemaps/lv2.json");
    this.load.tilemapTiledJSON("level3", "../assets/tilemaps/lv3.json");
  }

  create() {
    //lenguaje
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
        start: 9,
        end: 18,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
