import Phaser from "phaser";
import events from "../scenes/EventCenter";

export default class Turtle extends Phaser.GameObjects.Sprite {
  cursor;
  keyA;
  canJump;
  keySpace;
  isInmune;
  scene;
  isAttack;

  constructor(scene, x, y, texture, velocity) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.setTexture("turtle");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.velocity = velocity;

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.canJump = true;

    this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keySpace = scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.isInmune = false;
    this.body.setCollideWorldBounds(true);
  }

  actualizar() {
    this.isAttack = false;
    if (this.scene.shell === 1 || this.scene.shell === 2) {
      if (this.cursors.left.isDown && this.keyA.isDown) {
        this.body.setVelocityX(-400);
        this.anims.play("attackR", true);
        this.isAttack = true;
      } else if (this.cursors.left.isDown) {
        this.body.setVelocityX(-400);
        this.anims.play("leftR", true);
      } else if (this.cursors.right.isDown && this.keyA.isDown) {
        this.body.setVelocityX(400);
        this.anims.play("attackR", true);
        this.isAttack = true;
      } else if (this.cursors.right.isDown) {
        this.body.setVelocityX(400);
        this.anims.play("rightR", true);
      } else {
        this.body.setVelocityX(0);
        this.anims.play("turnR", true);
      }
    } else if (this.scene.shell > 2) {
      if (this.cursors.left.isDown && this.keyA.isDown) {
        this.body.setVelocityX(-400);
        this.anims.play("attackD", true);
        this.isAttack = true;
      } else if (this.cursors.left.isDown) {
        this.body.setVelocityX(-400);
        this.anims.play("leftD", true);
      } else if (this.cursors.right.isDown && this.keyA.isDown) {
        this.body.setVelocityX(400);
        this.anims.play("attackD", true);
        this.isAttack = true;
      } else if (this.cursors.right.isDown) {
        this.body.setVelocityX(400);
        this.anims.play("rightD", true);
      } else {
        this.body.setVelocityX(0);
        this.anims.play("turnD", true);
      }
    } else {
      if (this.cursors.left.isDown && this.keyA.isDown) {
        this.body.setVelocityX(-400);
        this.anims.play("attack", true);
        this.isAttack = true;
      } else if (this.cursors.left.isDown) {
        this.body.setVelocityX(-400);
        this.anims.play("left", true);
      } else if (this.cursors.right.isDown && this.keyA.isDown) {
        this.body.setVelocityX(400);
        this.anims.play("attack", true);
        this.isAttack = true;
      } else if (this.cursors.right.isDown) {
        this.body.setVelocityX(400);
        this.anims.play("right", true);
      } else {
        this.body.setVelocityX(0);
        this.anims.play("turn", true);
      }
    }
    

    // Verificar si la tecla "Up" está presionada y el personaje puede saltar.
    if (this.keySpace.isDown && this.canJump) {
      if (this.body.onFloor()) {
        this.anims.play("jumpD", true);
        this.body.setVelocityY(-480);
        this.canJump = false;
      }
    } else if (!this.keySpace.isDown && !this.canJump) {
      this.canJump = true;
    }
  }
  restVida() {
    if (!this.isInmune) {
      this.scene.health -= 1;
      this.isInmune = true;

      events.emit("actualizarDatos", {
        health: this.scene.health,
        level: this.scene.level,
        shell: this.scene.shell,
        fruits: this.scene.fruits,
      });

      this.scene.time.addEvent({
        delay: 2000,
        callback: () => {
          this.isInmune = false;
        },
        callbackScope: this,
        loop: false,
      });
    }
  }
}
