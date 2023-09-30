import Phaser from "phaser";

export default class Enemies extends Phaser.GameObjects.Sprite {


    constructor(scene, x, y,texture,velocity ) {
      super(scene,x,y,texture);
      this.setTexture("buho")
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.velocityEnemigo = velocity;
      this.setScale(0.2)
      this.body.setCollideWorldBounds(true);
      this.minX = 900;
      this.maxX = 1200;
    }
  
    update (){
        this.x += this.velocityEnemigo
   
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
  }