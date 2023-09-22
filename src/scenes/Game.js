import Phaser from "phaser";
import Turtle from "../componentes/Turtle";
import Enemies from "../componentes/Enemies";
import events from "./EventCenter";

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
    this.health= data.health || 5;
    this.velocityTurtle= data.velocityTurtle || 350;
    this.velocityEnemigo= data.velocityEnemigo || 2;
  }

  create() {
    const map = this.make.tilemap({key: "level1" });

    const capaPlataforma = map.addTilesetImage("plataforma","pisos");

    const platLayer = map.createLayer("Pisos", capaPlataforma);

    platLayer.setCollisionByProperty({colision: true});

    const objectsLayer = map.getObjectLayer ("Objetos");

    const player = map.findObject ("Objetos",(obj) => obj.name === "personaje");
    
    this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels);
    this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels);

    this.scene.launch("ui", {
      level: this.level,

      health: this.health,

      fruits: this.fruits,

      shell: this.shell,
    });
    
    this.turtle= new Turtle(
      this,player.x,player.y,"turtle",this.velocityTurtle
    );
    this.cameras.main.startFollow(this.turtle, true, 0.1, 0.1);

    this.physics.add.collider(this.turtle,platLayer);
    
    //Enemigos
    this.enemigo= new Enemies (this,950,450,"buho",this.velocityEnemigo);

    this.physics.add.collider(this.enemigo,platLayer);
    this.physics.add.collider(this.turtle,this.enemigo,this.restVida);
  }
  update(){
    this.turtle.actualizar();
    this.enemigo.update();
  }

  restVida(turtle,enemigo){
    this.health-=1;
    events.emit("actualizarDatos",{
      health: this.health,
    })
  }
}
