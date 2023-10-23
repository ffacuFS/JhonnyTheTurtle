import Phaser from "phaser";
import events from "../scenes/EventCenter";
import Turtle from "./Turtle";

export default class Boss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, velocity) {
    super(scene, x, y, texture,velocity);
    this.setTexture("boss");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.velocityBoss = velocity;
    this.setCollideWorldBounds(true);
    this.setupTween();
    this.velocityBoss = velocity;
    this.health = 2;
    this.anims.play('bossAnim');
   
  }

  setTurtle(turtle) {
    this.turtle = turtle;
  }

  shootAtPlayer(turtle) {
    // Lógica para crear y disparar un proyectil al jugador
    // Usa this.scene.physics.add.sprite para crear el proyectil y configúralo para moverse hacia el jugador
    const projectile = this.scene.physics.add.sprite(this.x, this.y, "bala").setScale(0.1);
    projectile.body.allowGravity = false;
    this.scene.physics.moveToObject(projectile, turtle, 300);

    this.scene.physics.add.overlap(projectile, turtle, () => {
      // Restar vida a la Turtle
      this.scene.restarVida();
      // Destruir el proyectil al impactar
      projectile.destroy();
    });
  }

  setupTween() {
    this.scene.tweens.add({
      targets: this,
      y: `+=200`,
      ease: "Linear",
      duration: 2000,
      yoyo: true,
      repeat: -1,
      onStart: () => {
        this.velocityBoss *= -1;
      },
    });
  }
  receiveDamage(amount) {
    this.health -= amount;

    // Puedes agregar lógica adicional según sea necesario
  }

  isDefeated() {
    return this.health <= 0;
  }
}