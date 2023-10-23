export default class Enemies extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, enemyType, velocity) {
    super(scene, x, y, enemyType);

    if (enemyType === "crab") {
      this.setTexture('crab'); // Usa la textura del cangrejo para "enemy"
      this.anims.play('crabAnim'); // Puedes definir la animación correspondiente al cangrejo
    } else if (enemyType === "owl") {
      this.setTexture('owl'); // Usa la textura del búho para "enemy2"
      this.anims.play('owlAnim'); // Puedes definir la animación correspondiente al búho
    } else if (enemyType === "robot") {
      this.setTexture('robot'); // Usa la textura del robot para "enemy3"
      this.setScale(0.3);
      //this.anims.play('robotAnim'); // Puedes definir la animación correspondiente al robot
    }

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.velocityEnemigo = velocity;
    this.setCollideWorldBounds(true);
    this.setupTween();
  }

  setupTween() {
    if (this.texture.key === 'crab' || this.texture.key === 'robot') {
      // Configuración de movimiento de cangrejo y robot (izquierda a derecha)
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
    } else if (this.texture.key === 'owl') {
      // Configuración de movimiento de búho (arriba y abajo)
      this.scene.tweens.add({
        targets: this,
        y: `+=200`, // Cambia la posición vertical
        ease: 'Linear',
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onStart: () => {
          this.velocityEnemigo *= -1;
        },
      });
    }
  }

  update() {
    // Mover horizontalmente a los enemigos de tipo "crab" y "robot" en cada fotograma
    if (this.texture.key === 'crab' || this.texture.key === 'robot') {
      this.x += this.velocityEnemigo;
    }
  }
}
