import Phaser from "phaser";
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

  preload() {
    this.load.image("plataforma","../public/assets/sprites/plataforma.jpg");

    this.load.tilemapTiledJSON("level1","../public/assets/tilemaps/level1.json");

    this.load.image("turtle","../public/assets/sprites/turtle.png");
  }

  create() {
    const map = this.make.tilemap({key:"level1" });

    const capaPlataforma = map.addTilesetImage("plataforma","plataforma");

    const platLayer = map.createLayer("Plataforma", capaPlataforma);

    platLayer.setCollisionByProperty({colision: true});

    const objectsLayer = map.getObjectLayer ("Objetos");

    let turtle = map.findObject ("Objetos",(obj) => obj.name === "personaje");








    this.player = this.physics.add.sprite(turtle.x,turtle.y,"turtle");
    this.player.setCollideWorldBounds(true);

    this.collider.add(this.player,platLayer);

  }
}
