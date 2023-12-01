export default class Enemies extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, enemyType, velocity) {
    super(scene, x, y, enemyType);

    if (enemyType === "crab") {
      this.setTexture("crab"); 
      this.anims.play("crabAnim"); 
    } else if (enemyType === "owl") {
      this.setTexture("owl"); 
      this.anims.play("owlAnim"); 
    } else if (enemyType === "robot") {
      this.setTexture("robot"); 
      this.anims.play("robotAnim"); 
    }

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.velocityEnemigo = velocity;
    this.setCollideWorldBounds(true);
    this.setupTween();
    this.body.setImmovable(true);
  }

  setupTween() {
    if (this.texture.key === "crab" || this.texture.key === "robot") {
      this.scene.tweens.add({
        targets: this,
        x: `+=200`,
        ease: "Linear",
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onStart: () => {
          this.velocityEnemigo *= -1;
        },
      });
    } else if (this.texture.key === "owl") {
      this.scene.tweens.add({
        targets: this,
        y: `-=200`, 
        ease: "easeIn",
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onStart: () => {
        },
      });
    }
  }

  update() {
    if (this.texture.key === "crab" || this.texture.key === "robot") {
      this.x += this.velocityEnemigo;
    }
  }
}
