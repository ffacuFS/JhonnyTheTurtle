import Phaser, { LEFT } from "phaser";
import Turtle from "../componentes/Turtle";
import Enemies from "../componentes/Enemies";
import events from "./EventCenter";

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
  isInmune = false;


  constructor() {
    super("game");
  }

  init(data) {
    this.level = data.nivel || 1;
    this.fruits = data.fruits || 0;
    this.shell = data.shell || 0;
    this.health = data.health || 5;
    this.velocityEnemigo = data.velocityEnemigo || 2;
  }

  create() {
    const map = this.make.tilemap({ key: "level1" });
    const capaBackground =map.addTilesetImage("laboratory", "backgroundBoss");
    const BGlayer=map.createLayer("Background", capaBackground);
    const capaPlataforma = map.addTilesetImage("plataforma", "pisos");
    const platLayer = map.createLayer("Pisos", capaPlataforma);
    platLayer.setCollisionByProperty({ colision: true });
    const objectsLayer = map.getObjectLayer("Objetos");
    const player = map.findObject("Objetos", (obj) => obj.name === "personaje");

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.scene.launch("ui", {
      level: this.level,
      health: this.health,
      fruits: this.fruits,
      shell: this.shell,
    });

    this.turtle = new Turtle(this, player.x, player.y, "turtle", 350);
    this.cameras.main.startFollow(this.turtle, true, 0.1, 0.1);
    this.physics.add.collider(this.turtle, platLayer);

    // Crear grupo para los enemigos
    this.enemies = this.physics.add.group();

    // Obtener objetos de enemigo desde el mapa y crear sprites
    const enemyObjects = map.filterObjects("Objetos", (obj) => obj.name === "enemy");
    enemyObjects.forEach((obj) => {
      //const enemy = new Enemies(this, obj.x, obj.y, "buho", this.velocityEnemigo);
      const enemy = new Enemies(this, obj.x, obj.y, "buho", this.velocityEnemigo);
      this.enemies.add(enemy);
    });

    // Configurar colisiones
    this.physics.add.collider(this.enemies, platLayer);
    this.physics.add.collider(this.turtle, this.enemies, this.restarVida, null, this);

    events.emit("actualizarDatos", {
      health: this.health,
    });

    //Colision de ataque para eliminar
    events.on("ataqueRealizado", (data) => {
      const attacker = data.attacker;
  
      const attackingEnemies = this.enemies.getChildren().filter(enemy => {
        return Phaser.Geom.Intersects.RectangleToRectangle(attacker.getBounds(), enemy.getBounds());
      });
  
      attackingEnemies.forEach(enemy => {
        // Aquí puedes realizar acciones con el enemigo atacado, como eliminarlo, restarle vida, etc.
        enemy.destroy();
      });
    });

  }

  update() {
    this.turtle.actualizar();
    this.enemies.getChildren().forEach((enemy) => {
      enemy.update();
    });

    if (this.isInmune) {
      this.turtle.setAlpha(0.5);
    } else {
      this.turtle.setAlpha(1);
    }
  }

  restarVida() {
    this.turtle.restVida();
    if (this.health <= 0) {
      //this.scene.stop("ui");
      this.scene.start("perdiste"); 
    }
  }
}