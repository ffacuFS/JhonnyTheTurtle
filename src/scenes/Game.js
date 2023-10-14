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
    this.enemiesDefeated = 0;
    this.maxLevel = 3;

    this.caparazonesRecolectados = 0;
    this.tiempoInmunidad = 0;
    this.duracionInmunidad = 10000;
  }

  init(data) {
    this.level = data.level || 1;
    this.fruits = data.fruits || 0;
    this.shell = data.shell || 0;
    this.health = data.health || 5;
    this.velocityEnemigo = data.velocityEnemigo || 2;
  }

  create() {
    const mapKey = `level${this.level}`;

    const map = this.make.tilemap({ key: mapKey });

    const capaBackground = map.addTilesetImage("laboratory", "backgroundBoss");
    const BGlayer = map.createLayer("Background", capaBackground);
    const capaPlataforma = map.addTilesetImage("plataforma", "pisos");
    const platLayer = map.createLayer("Pisos", capaPlataforma);

    platLayer.setCollisionByProperty({ colision: true });

    const objectsLayer = map.getObjectLayer("Objetos");
    const player = map.findObject("Objetos", (obj) => obj.name === "personaje");

    // Buscar la salida en la capa de objetos
    const exitObject = map.findObject("Objetos", (obj) => obj.name === "exit");

    // Crear el sprite de la salida
    const exit = this.add.image(exitObject.x, exitObject.y, "exit");
    exit.setScale(0.2);
    this.physics.world.enable(exit);
    this.physics.add.collider(exit, platLayer);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBoundsCollision(true, true, true, false);
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
    this.physics.world.gravity.y = 500; 

    // Crear grupo para los enemigos
    this.enemies = this.physics.add.group();

    // Obtener objetos de enemigo desde el mapa y crear sprites
    const enemyObjects = map.filterObjects(
      "Objetos",
      (obj) => obj.name === "enemy"
    );
    enemyObjects.forEach((obj) => {
      const enemy = new Enemies(
        this,
        obj.x,
        obj.y,
        "buho",
        this.velocityEnemigo
      );
      this.enemies.add(enemy);
    });

    // Configurar colisiones
    this.physics.add.collider(this.enemies, platLayer);
    this.physics.add.collider(
      this.turtle,
      this.enemies,
      this.restarVida,
      null,
      this
    );

    //Colision de ataque para eliminar
    events.on("ataqueRealizado", (data) => {
      const attacker = data.attacker;

      const attackingEnemies = this.enemies.getChildren().filter((enemy) => {
        return Phaser.Geom.Intersects.RectangleToRectangle(
          attacker.getBounds(),
          enemy.getBounds()
        );
      });

      attackingEnemies.forEach((enemy) => {
        this.enemiesDefeated++;
        enemy.destroy();
      });
    });

    this.physics.add.collider(this.turtle, exit, () => {
      this.nextLevel();
  });

// Obtener todos los objetos de trampas en la capa de objetos
const trampaObjects = map.filterObjects("Objetos", (obj) => obj.name === "trampa");

// Crear sprites de trampas para cada objeto encontrado
this.trampas = this.physics.add.group();
trampaObjects.forEach((obj) => {
  const trampa = this.trampas.create(obj.x, obj.y, "trampas").setScale(0.1);
  trampa.setImmovable(true);
  this.physics.add.collider(trampa, platLayer);
  this.physics.add.collider(this.turtle, trampa, this.restarVida, null, this);
});

// Crear sprites de caja 
const boxObjects = map.filterObjects("Objetos", (obj) => obj.name == "caja" );
this.box= this.physics.add.group();
boxObjects.forEach ((obj)=> {
  const box = this.box.create(obj.x, obj.y, "caja" ).setScale(0.5);
  box.body.setImmovable(true);
  box.body.setAllowGravity(false);
  this.physics.add.collider(box,platLayer);
  this.physics.add.collider(this.turtle,this.box,this.hitBox,null,this);
})
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

    this.checkTurtleOutOfScreen();
  }

  restarVida() {
    this.turtle.restVida();
    if (this.health <= 0) {
      this.scene.start("perdiste");
    }
  }

  // Logica de probabilidad al romper caja.
  hitBox (turtle,box){
    box.destroy();

    const randomValue = Phaser.Math.Between(0, 1);

  if (randomValue < 0.5) {
    // 50% de probabilidad de lanzar una fruta
    this.spawnFruit(box.x, box.y);
  } else {
    // 50% de probabilidad de lanzar un caparazón
    this.spawnShell(box.x, box.y);
  }

  }

  // Generacion de fruta al romper caja.
  spawnFruit (x,y){
    const fruit = this.physics.add.sprite(x, y, "fruta");
  fruit.setScale(0.2);

  this.physics.add.collider(this.turtle, fruit, this.collectFruit, null, this);
  
  this.physics.add.existing(fruit);
  fruit.body.gravity.y = 150;

  this.time.delayedCall(3000, function () {
    fruit.destroy();
  }, [], this);
  }

  // Generacion de caparazon al romper caja.
  spawnShell (x,y){
    const shell = this.physics.add.sprite(x, y, "caparazon");
    shell.setScale(0.2);
    
    this.physics.add.collider(this.turtle, shell, this.collectShell, null, this);
  
    this.physics.add.existing(shell);
    shell.body.gravity.y = 150;
  
    this.time.delayedCall(3000, function () {
      shell.destroy();
    }, [], this);
  }

  collectFruit (turtle,fruit){
    fruit.destroy();
    events.emit("actualizarDatos", {
      fruits: this.fruits+1,
      level: this.level,
      shell: this.shell,
      health: this.health,
    })
  }

  collectShell (turtle,shell){
    shell.destroy();
    this.caparazonesRecolectados++;

    if (this.caparazonesRecolectados >= 1) {
      this.activarInmunidad();
      this.caparazonesRecolectados = 0;
    }
    events.emit("actualizarDatos", {
      fruits: this.fruits,
      level: this.level,
      shell: this.shell+1,
      health: this.health,
    })

  }

  activarInmunidad() {
    this.tiempoInmunidad = this.duracionInmunidad;
    
  }

  nextLevel() {
    if (this.level < this.maxLevel) {
      this.level += 1;
      this.fruits = 0;
      this.shell = 0;
      this.health = 5;
      this.enemiesDefeated = 0;

      events.emit("actualizarDatos", {
        level: this.level,
        shell: this.shell,
        fruits: this.fruits,
        health: this.health,
      });

      this.scene.start("game", {
        level: this.level,
        shell: this.shell,
        fruits: this.fruits,
        health: this.health,
        velocityEnemigo: this.velocityEnemigo,
      });
    } else {
      this.scene.start("victoria");
    }
  }

  checkTurtleOutOfScreen() {
    if (this.turtle.y > this.sys.game.config.height) {
      this.scene.start("perdiste");
    }
  }
}
