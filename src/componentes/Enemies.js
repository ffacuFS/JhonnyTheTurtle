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
   
// Si el enemigo alcanza un límite en el escenario, cambia la dirección
if (this.x < this.minX) {
    this.x = this.minX; // Establece la posición en el límite mínimo
    this.velocityEnemigo *= -1; // Invierte la dirección vertical
  } else if (this.x > this.maxX) {
    this.x = this.maxX; // Establece la posición en el límite máximo
    this.velocityEnemigo *= -1; // Invierte la dirección vertical
  }
    }
  }