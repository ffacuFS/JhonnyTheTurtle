import Phaser from "phaser";

export default class Turtle extends Phaser.GameObjects.Sprite {

  cursor;

  constructor(scene, x, y,texture,velocity ) {
    super(scene,x,y,texture);
    this.setTexture("turtle")
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.velocity = velocity;
    this.setScale(0.3)
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  actualizar() {
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-250);
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(250);
    } else {
      this.body.setVelocityX(0);
    }
    if (this.cursors.up.isDown) {
     this.body.setVelocityY(-250);
    } else if (this.cursors.down.isDown) {
      this.body.setVelocityY(160);
    } else {
      this.body.setVelocityY(0);
    } 
      
  }
}