import Phaser from "phaser";
import events from "./EventCenter";

export default class Preload extends Phaser.Scene {

  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("turtle","./assets/sprites/tortuga.png");  
    this.load.image("pisos","../assets/sprites/plataforma.jpg");
    this.load.tilemapTiledJSON("level1","../assets/tilemaps/lv1.json");
  }

  create() {
    this.scene.start("menu");
  }
}