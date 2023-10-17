import Turtle from "./Turtle";

export default class Boss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, velocity) {
    super(scene, x, y, texture);
    this.setTexture("bosses");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.velocityBoss = velocity;
    this.setCollideWorldBounds(true);
    this.setupTween();

    this.bullets = scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      defaultKey: "bulletTexture", // Reemplaza 'bulletTexture' con la clave real de la textura de la bala
      maxSize: 10, // Número máximo de balas en el grupo
      runChildUpdate: true,
    });

    this.shootDelay = 1000; // Milisegundos entre disparos
    this.lastShootTime = 0;
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

  update(time) {
    // Mover horizontalmente a los enemigos en cada fotograma
    this.y += this.velocityBoss;

    if (time - this.lastShootTime > this.shootDelay) {
      this.shoot();
      this.lastShootTime = time;
    }
  }
  shoot() {
    const bullet = this.bullets.get(this.x, this.y);
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.setVelocity(0, 300); // Ajusta la velocidad de los disparos
    }
  }
}
