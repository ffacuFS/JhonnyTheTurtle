import Phaser from "phaser";
import events from "./EventCenter";

export default class Preload extends Phaser.Scene {

  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("turtle","./assets/sprites/tortuga.png");  
    this.load.image("plataforma","./assets/sprites/plataforma.jpg")
  }

  create() {
    this.scene.start("menu");
  }
}