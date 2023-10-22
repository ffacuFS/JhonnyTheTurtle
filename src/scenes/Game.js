import Phaser, { LEFT } from "phaser";
import Turtle from "../componentes/Turtle";
import Enemies from "../componentes/Enemies";
import events from "./EventCenter";
import Boss from "../componentes/Boss";

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
  platLayer;
  brokenBoxes = [];


  constructor() {
    super("game");
    this.enemiesDefeated = 0;
    this.maxLevel = 3;

    this.shellsRecolect = 0;
    this.tiempoInmunidad = 0;
    this.duracionInmunidad = 10000;
    this.isInmune = false;

    this.fruitRecolect = 0;
    
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

    const capaBackground = map.addTilesetImage("background", "backgrounds");
    const BGlayer = map.createLayer("Background", capaBackground);

    const capaPlataforma = map.addTilesetImage("plataforma", "arena");
    const platLayer = map.createLayer("Pisos", capaPlataforma);

    const capaLaboratorio = map.addTilesetImage("laboratorio", "laboratorio");
    const BGlab = map.createLayer("objetosBG", capaLaboratorio);

    platLayer.setCollisionByProperty({ colision: true });

    const objectsLayer = map.getObjectLayer("Objetos");
    const player = map.findObject("Objetos", (obj) => obj.name === "personaje");
    const boss = map.findObject("Objetos", (obj) => obj.name === "boss");

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

    //Agg boss
    //this.boss = new Boss(this, boss.x, boss.y, "bosses", 350);

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
      this.hitEnemies,
      null,
      this
    );

    this.physics.add.collider(this.turtle, exit, () => {
      this.nextLevel();
      events.emit("desbloquearNuevoNivel");
    });

    // Obtener todos los objetos de trampas en la capa de objetos
    const trampaObjects = map.filterObjects(
      "Objetos",
      (obj) => obj.name === "trampa"
    );

    // Crear sprites de trampas para cada objeto encontrado
    this.trampas = this.physics.add.group();
    trampaObjects.forEach((obj) => {
      const trampa = this.trampas.create(obj.x, obj.y, "trampas").setScale(0.1);
      trampa.setImmovable(true);
      this.physics.add.collider(trampa, platLayer);
      this.physics.add.collider(
        this.turtle,
        trampa,
        this.restarVida,
        null,
        this
      );
    });

    // Crear sprites de caja
    const boxObjects = map.filterObjects(
      "Objetos",
      (obj) => obj.name == "caja"
    );
    this.box = this.physics.add.group();
    boxObjects.forEach((obj) => {
      const box = this.box.create(obj.x, obj.y, "caja").setScale(0.5);
      box.body.setImmovable(true);
      this.physics.add.collider(box, platLayer);
      this.physics.add.collider(
        this.turtle,
        this.box,
        this.hitBox,
        this.turtle.isAttack,
        this
      );
    });
  

    //collider con jefe y disparo
    this.events.on("bossDisparo", (datos) => {
      const { bala } = datos;
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

    this.checkTurtleOutOfScreen();
  }

  attackBoss() {}


  hitEnemies(turtle, enemy) {
    if (turtle.isAttack) {
      enemy.destroy();
    } else {
      turtle.anims.play('turtleHurt1');
      this.restarVida();
    }
  }

  restarVida() {
    this.turtle.restVida();
    if (this.health <= 0) {
      this.scene.stop("ui");
      this.scene.start("perdiste");
      
    }
  }

  // Logica de probabilidad al romper caja.
  hitBox(turtle, box) {
    const randomValue = Phaser.Math.Between(0, 1);
    if (turtle.isAttack){
    if (randomValue < 0.5) {
      // 50% de probabilidad de lanzar una fruta
      this.spawnObject(box.x, box.y, "fruit");
    } else {
      // 50% de probabilidad de lanzar un caparazón
      this.spawnObject(box.x, box.y, "shell");
    }

    box.destroy();
  }
  }

  // Generacion de fruta al romper caja.
  spawnObject(x, y, sprite) {
    const object = this.physics.add.sprite(x, y, sprite);
    object.setData({ tipo: sprite });

    this.physics.add.collider(
      this.turtle,
      object,
      this.collectObject,
      null,
      this
    );
    this.physics.add.collider(object, this.platLayer);

    this.physics.add.existing(object);
    object.body.setAllowGravity(false);

    this.time.delayedCall(
      3000,
      function () {
        object.destroy();
      },
      [],
      this
    );
  }

  collectObject(turtle, object) {
    switch (object.data.values.tipo) {
      case "shell":
        this.shell += 1;
        console.log("junto caparazón");

        //if (this.shellsRecolect === 1) {
          //this.isInmune = true;
          //console.log("es inmune");
          //delay: 10000
          //this.shell -= 1;
          //this.isInmune = false;
          //console.log("ya no es inmune");
        //}
        break;
      case "fruit":
        this.fruits += 1;
        this.fruitRecolect += 1;

        if ( this.fruitRecolect === 3) {
            this.moreHealth();
            this.fruitRecolect = 0;
            this.fruits = 0;
        }
        break;
    }

    object.destroy();

    events.emit("actualizarDatos", {
      fruits: this.fruits,
      level: this.level,
      shell: this.shell,
      health: this.health,
    });
  }

  moreHealth (){
    this.health += 1;

    events.emit("actualizarDatos", {
        fruits: this.fruits,
        level: this.level,
        shell: this.shell,
        health: this.health,
    });
  }

  activarInmunidad() {
    this.tiempoInmunidad = this.duracionInmunidad;
  }

  nextLevel() {
    if (this.level < this.maxLevel) {
      this.level += 1;
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
      this.scene.stop("ui");
      this.scene.start("victoria");
    }
  }

  checkTurtleOutOfScreen() {
    if (this.turtle.y > this.sys.game.config.height) {
      this.scene.stop("ui");

      this.scene.start("perdiste", {
        level: this.level,

      });
    }
  }
}
