import Phaser from "phaser";
import Turtle from "../componentes/Turtle";

// Manejador de eventos centralizados para comunicacion de componentes

// Importacion
// import events from './EventCenter'

// Emisor de mensaje de difusion
// Recibe el nombre del mensaje y los valores de parametro
// events.emit('health-changed', this.health)

// Receptor de mensaje, por ejemplo escena de UI
// Recibe el nombre del mensaje y una funcion callback a ejecutar
// events.on('health-changed', this.handleHealthChanged, this)

export default class Game extends Phaser.Scene {
    level;

    shell;

    fruits;
    
    chekpoint;

    health;

    enemies;

    boss;

    objects;

    obstacles;

    inmunity;


  constructor() {
    super("game");
  }

  init(data){
    this.level=data.nivel || 1;
    this.fruits=data.fruits || 0;
    this.shell=data.shell || 0;
    this.health= data.health || 3;
    this.velocityTurtle= data.velocityTurtle || 350;
  }

  preload() {
    /*this.load.image("pisos","../public/assets/sprites/plataforma.jpg");

    this.load.tilemapTiledJSON("level1","../public/assets/tilemaps/level1.json");

    this.load.image("turtle","../public/assets/sprites/turtle.png");*/

    //this.load.image("turtle","../public/assets/sprites/plataforma.jpg");

  }

  create() {
    /*var map = this.make.tilemap({key: "level1" });

    var capaPlataforma = map.addTilesetImage("lataforma","pisos");

    var platLayer = map.createLayer("Plataforma", capaPlataforma);

    platLayer.setCollisionByProperty({colision: true});

    var objectsLayer = map.getObjectLayer ("Objetos");

    let turtle = map.findObject ("Objetos",(obj) => obj.name === "personaje");*/

    this.scene.launch("ui", {
      level: this.level,

      health: this.health,

      fruits: this.fruits,

      shell: this.shell,
    });

    this.base = this.physics.add.image(200,600,"plataforma").setScale(2).setImmovable(true);
    this.base.body.setAllowGravity(false);
    
    this.turtle= new Turtle(
      this,400,400,"turtle",this.velocityTurtle
    );

    this.physics.add.collider(
      this.base,this.turtle,null);
    

  }
  update(){
    this.turtle.actualizar();
  }
}
