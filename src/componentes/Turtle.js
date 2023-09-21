import Phaser from "phaser";

export default class Turtle extends Phaser.GameObjects.Sprite {

  cursor;
  keyA;
  canJump;

  constructor(scene, x, y,texture,velocity ) {
    super(scene,x,y,texture);
    this.setTexture("turtle")
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.velocity = velocity;
    this.setScale(0.3)
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.canJump=true;
    this.body.setCollideWorldBounds(true);
    this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  }
  

  actualizar() {
    if (this.cursors.left.isDown && this.keyA.isDown) {
      this.body.setVelocityX(-250);
      this.anims.play('attack', true);
    } else if (this.cursors.left.isDown) {
      this.body.setVelocityX(-250);
      this.anims.play('left', true);
    } else if (this.cursors.right.isDown && this.keyA.isDown) {
      this.body.setVelocityX(250);
      this.anims.play('attack', true);
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(250);
      this.anims.play('right', true);
    } else {
      this.body.setVelocityX(0);
      this.anims.play('turn', true);
    }

    // Verificar si la tecla "Up" está presionada y el personaje puede saltar.
    if (this.cursors.up.isDown && this.canJump) {
      this.body.setVelocityY(-150); // Configurar la velocidad vertical para saltar.
      this.canJump = false; // Deshabilitar la capacidad de saltar.
    } else if (!this.cursors.up.isDown && !this.canJump) {
      // Habilitar la capacidad de saltar nuevamente cuando se suelta la tecla "Up".
      this.canJump = true;
    }   
}
}