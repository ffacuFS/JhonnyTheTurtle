export default class Enemies extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, velocity) {
    super(scene, x, y, texture);
    this.setTexture('crab');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.velocityEnemigo = velocity;
    this.setCollideWorldBounds(true);
    this.setupTween();
    this.anims.play('crabAnim');
  }

  setupTween() {
    this.scene.tweens.add({
      targets: this,
      x: `+=200`,
      ease: 'Linear',
      duration: 2000,
      yoyo: true,
      repeat: -1,
      onStart: () => {
        this.velocityEnemigo *= -1;
      },
    });
  }

  update() {
    // Mover horizontalmente a los enemigos en cada fotograma
    this.x += this.velocityEnemigo;
  }
}
