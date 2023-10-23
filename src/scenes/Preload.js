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

    //turtle
    this.load.spritesheet("turtle", "./assets/sprites/turtle1.png", {
      frameWidth: 114.6,
      frameHeight: 156,
    });
    this.load.spritesheet("turtleAttack", "./assets/sprites/turtle-attack1.png", {
      frameWidth: 147.8,
      frameHeight: 147,
    });
    //turtle red 
    this.load.spritesheet("turtleR", "./assets/sprites/turtlered.png", {
      frameWidth: 114.6,
      frameHeight: 156,
    });
    this.load.spritesheet("turtleAttackR", "./assets/sprites/turtle-attack-red.png", {
      frameWidth: 147.8,
      frameHeight: 147,
    });
    //turtle yellow
    this.load.spritesheet("turtleD", "./assets/sprites/turtleyellow.png", {
      frameWidth: 114.6,
      frameHeight: 156,
    });
    this.load.spritesheet("turtleAttackD", "./assets/sprites/turtle-attack-yellow.png", {
      frameWidth: 147.8,
      frameHeight: 147,
    });
    this.load.spritesheet("turtleHurt", "./assets/sprites/turtle-hurt.png", {
      frameWidth: 77.2,
      frameHeight: 131,
    });
    this.load.spritesheet("turtleJump", "./assets/sprites/turtle-jump1.png", {
      frameWidth: 133.5,
      frameHeight: 162,
    });
    this.load.spritesheet("boss", "../assets/sprites/boss.png", {
      frameWidth: 170.5,
      frameHeight: 208,
    });
    this.load.spritesheet("shells", "../assets/sprites/shells.png",{
      frameWidth: 86.5,
      frameHeight: 88,
    });
    this.load.spritesheet("fruits","../assets/atlas/fruits_1.png",{
      frameWidth: 50,
      frameHeight:80,
    });
    this.load.spritesheet("crab", "../assets/sprites/crab_4.png",{
      frameWidth: 105,
      frameHeight:88,
    });
    this.load.spritesheet("gameOver","../assets/sprites/perdida_spritesheet.png",{
      frameWidth:853,
      frameHeight:842,
    });
    this.load.spritesheet('key','../assets/sprites/key_1.png',{
      frameWidth: 44,
      frameHeight: 88,
    } )
    this.load.spritesheet('owl', '../assets/sprites/buho.png', {
      frameWidth:174,
      frameHeight:107,
    })
    //A CAMBIAR 
    this.load.image("robot", "../assets/sprites/robot.png");



    this.load.image("arena", "../assets/atlas/plataformas.png");
    this.load.image("pisos","../assets/sprites/plataforma.jpg")
    this.load.image("laboratorio", "../assets/atlas/laboratorio.png")
    this.load.image("menulevelBG", "../assets/atlas/menulevel-01.png");
    this.load.image("backgroundMenu", "../assets/atlas/newGame-01.png");
    this.load.image("backgrounds","../assets/atlas/escenas.png")
    this.load.image("back", "../assets/atlas/back_1.png");
    this.load.image("play", "../assets/atlas/play.png");
    this.load.image("healthUI", "../assets/atlas/health.png");
    this.load.image("fruitUI", "../assets/atlas/fruit.png");
    this.load.image("shellUI", "../assets/atlas/shellUI.png")
    this.load.image("US-flag", "../assets/atlas/US.png");
    this.load.image("AR-flag", "../assets/atlas/AR.png");
    this.load.image("music", "../assets/atlas/music_1.png");
    this.load.image("exit", "../assets/atlas/exit.png");
    this.load.image("trampas", "../assets/atlas/Trampa.png");
    this.load.image("caja", "../assets/sprites/caja.png");
    this.load.image("fruit", "../assets/sprites/fruit.png");
    this.load.image("shell", "../assets/sprites/shell.png");
    this.load.image("bala", "../assets/sprites/bala.png");
    this.load.tilemapTiledJSON("level1", "../assets/tilemaps/lv1.json");
    this.load.tilemapTiledJSON("level2", "../assets/tilemaps/lv2.json");
    this.load.tilemapTiledJSON("level3", "../assets/tilemaps/lv3.json");

    //boss prueba
    this.load.image("bosses", "../assets/sprites/bosses.png");
  }

  create() {
    //lenguaje
    this.scene.start("menu");

    //Animación tortuga
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
    this.anims.create({
      key: "turtleHurt1",
      frames: this.anims.generateFrameNumbers("turtleHurt", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat:0,
    });
    

    //Animación tortuga roja
    this.anims.create({
      key: "leftR",
      frames: this.anims.generateFrameNumbers("turtleR", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turnR",
      frames: [{ key: "turtleR", frame: 5 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "rightR",
      frames: this.anims.generateFrameNumbers("turtleR", { start: 6, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "attackR",
      frames: this.anims.generateFrameNumbers("turtleAttackR", { start: 0, end: 12,}),
      frameRate: 10,
      repeat: -1,
    });

    //Animación tortuga dorada
    this.anims.create({
      key: "leftD",
      frames: this.anims.generateFrameNumbers("turtleD", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turnD",
      frames: [{ key: "turtleD", frame: 5 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "rightD",
      frames: this.anims.generateFrameNumbers("turtleD", { start: 6, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "attackD",
      frames: this.anims.generateFrameNumbers("turtleAttackD", { start: 0, end: 12,}),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "gameOver",
      frames: this.anims.generateFrameNumbers("gameOVerA", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });



    //animacion Boss y enemigos
    this.anims.create({
      key: "bossAnim",
      frames: this.anims.generateFrameNumbers("boss",{
        start:0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "crabAnim",
      frames: this.anims.generateFrameNumbers('crab', {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "owlAnim",
      frames: this.anims.generateFrameNumbers('owl', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    //animacion objetos
    this.anims.create({
      key:"shell",
      frames: this.anims.generateFrameNumbers("shells",{
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat:-1,
    });
    this.anims.create({
      key:"fruits",
      frames: this.anims.generateFrameNumbers("fruits",{
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat:-1,
    });
    this.anims.create({
      key:"keyA",
      frames: this.anims.generateFrameNumbers("key",{
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat:-1,
    });
  }
}
