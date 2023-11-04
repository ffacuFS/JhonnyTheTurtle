import Phaser, { LEFT } from "phaser";
import Turtle from "../componentes/Turtle";
import Enemies from "../componentes/Enemies";
import events from "./EventCenter";
import Boss from "../componentes/Boss";
import gameConfig from "../enums/config"; 

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
  lifeText;

  constructor() {
    super("game");
    this.enemiesDefeated = 0;
    this.maxLevel = 3;

    this.shellsRecolect = 0;
    this.tiempoInmunidad = 0;
    this.duracionInmunidad = 10000;
    this.isInmune = false;
    this.llaveRecolectada = false;
    this.exit = null;

    this.fruitRecolect = 0;
  }

  init(data) {
    this.level = data.level || 1;
    this.fruits = data.fruits || 0;
    this.shell = data.shell || 0;
    this.health = data.health || 5;
    this.velocityEnemigo = data.velocityEnemigo || 2;
    this.velocityBoss = data.velocityBoss || 200;
  }

  create() {
    if (this.level === 1) {
      this.backgroundMusic = this.sound.add("prueba1");
      if (!gameConfig.isSoundMuted) {
        this.backgroundMusic.play();
      }
    } else if (this.level === 2) {
      this.backgroundMusic = this.sound.add("prueba2");
      if (!gameConfig.isSoundMuted) {
        this.backgroundMusic.play();
      }
    } else if (this.level === 3) {
      this.backgroundMusic = this.sound.add("prueba3");
      if (!gameConfig.isSoundMuted) {
        this.backgroundMusic.play();
      }
    }
    events.on("stopBackgroundMusic", () => {
      if (this.backgroundMusic) {
        this.backgroundMusic.stop();
      }
    });
    //creacion de sonidos
    this.attackSound = this.sound.add("attack");
    this.deathSound = this.sound.add("death");
    this.damageSound = this.sound.add("damage");
    this.soundBox = this.sound.add("brokenBox");
    this.frutaSound = this.sound.add("frutaSound");
    this.disparoSound = this.sound.add("disparoSound");
    //creacion mapa y capas
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
    const exitObject = map.findObject("Objetos", (obj) => obj.name === "exit");
    this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
    this.exit = this.physics.add.sprite(exitObject.x, exitObject.y, "exit")
      .setScale(0.2);
    this.exit.setImmovable(true);
    this.physics.world.enable(this.exit);
    this.physics.add.collider(this.exit, platLayer);
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
    this.physics.add.collider(this.turtle, this.exit, () => {
      this.backgroundMusic.stop(); 
      this.nextLevel();
      events.emit("desbloquearNuevoNivel");
    });
    this.enemies = this.physics.add.group();
    objectsLayer.objects.forEach((obj) => {
      const { x = 0, y = 0, name } = obj;
      switch (name) {
        case "enemy": {
          const enemy = new Enemies(
            this,
            obj.x,
            obj.y,
            "crab",
            this.velocityEnemigo
          );
          this.enemies.add(enemy);
          break;
        }
        case "enemy2": {
          const enemy2 = new Enemies(
            this,
            obj.x,
            obj.y,
            "owl",
            this.velocityEnemigo
          );
          this.enemies.add(enemy2);
          break;
        }
        case "enemy3": {
          const enemy3 = new Enemies(
            this,
            obj.x,
            obj.y,
            "robot",
            this.velocityEnemigo
          );
          this.enemies.add(enemy3);

          break;
        }
        case "boss": {
          this.boss = new Boss(
            this,
            obj.x,
            obj.y,
            "boss",
            this.velocityBoss,
            1
          );
          this.boss.setTurtle(this.turtle);
          this.time.addEvent({
            delay: 4000,
            callback: () => {
              this.boss.shootAtPlayer(this.turtle);
              if (!gameConfig.isSoundMuted) {
              this.disparoSound.play();
              }
            },
            loop: true,
          });
          break;
        }
      }
    });
    this.physics.add.collider(this.enemies, platLayer);
    this.physics.add.collider(
      this.turtle,
      this.enemies,
      this.hitEnemies,
      null,
      this
    );
    const trampaObjects = map.filterObjects(
      "Objetos",
      (obj) => obj.name === "trampa"
    );
    this.trampas = this.physics.add.group();
    trampaObjects.forEach((obj) => {
      const trampa = this.trampas.create(obj.x, obj.y, "trap");
      trampa.setImmovable(true);
      trampa.body.setSize(120, 10);
      trampa.body.setOffset(106, 75)
      trampa.anims.play("trapA");
      this.physics.add.collider(trampa, platLayer);
      this.physics.add.collider(
        this.turtle,
        trampa,
        this.restarVida,
        null,
        this
      );
    });
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
    this.events.on("bossDisparo", (datos) => {
      const { bala } = datos;
    });
    this.lifeText = this.add.text(this.turtle.x, this.turtle.y, "+1", {
      fontSize: "32px",
      fontFamily: "DM Serif Display",
      fill: "#ffa615",
      align: "center",
    });
    this.lifeText.setOrigin(0.5);
    this.lifeText.setVisible(false);
    this.physics.add.collider(
      this.turtle,
      this.boss,
      this.turtleBossCollision,
      null,
      this
    );
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

  turtleBossCollision(turtle, boss) {
    if (!gameConfig.isSoundMuted) {
    this.deathSound.play();
    }
    if (turtle.isAttack) {
      boss.health -= 1;
      if (this.boss.health <= 0) {
        this.boss.destroy();
      }
      this.turtle.body.checkCollision.none = true;
      this.time.delayedCall(
        1000, // Puedes ajustar el tiempo de desactivación de la colisión
        () => {
          this.turtle.body.checkCollision.none = false;
        },
        [],
        this
      );
    }
  }
  hitEnemies(turtle, enemy) {
    if (turtle.isAttack) {
      enemy.destroy();
      if (!gameConfig.isSoundMuted) {
      this.attackSound.play();
      }
    } else {
      turtle.anims.play("turtleHurt1");
      this.restarVida();
    }
  }
  restarVida() {
    if (!gameConfig.isSoundMuted) {
    this.damageSound.play();
    }
    this.turtle.restVida();
    this.cameras.main.shake(100, 0.02);
    if (this.health <= 0) {
      this.backgroundMusic.stop(); 
      this.scene.stop("ui");
      this.scene.start("perdiste");
    }
  }
  hitBox(turtle, box) {
    const randomValue = Phaser.Math.Between(0, 1);
    if (turtle.isAttack) {
      if (randomValue < 0.5) {
        this.spawnObject(box.x, box.y, "fruit");
      } else {
        this.spawnObject(box.x, box.y, "shell");
      }
      if (!gameConfig.isSoundMuted) {
      this.soundBox.play();
      }
      box.destroy();
    }
  }
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
        break;
      case "fruit":
        if (!gameConfig.isSoundMuted) {
        this.frutaSound.play();
        }
        this.fruits += 1;
        this.fruitRecolect += 1;
        if (this.fruitRecolect === 3) {
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

  moreHealth() {
    this.health += 1;
    events.emit("actualizarDatos", {
      fruits: this.fruits,
      level: this.level,
      shell: this.shell,
      health: this.health,
    });
    this.lifeText.setText("+1");
    this.lifeText.setPosition(this.turtle.x, this.turtle.y - 50);
    this.lifeText.setVisible(true);
    this.time.delayedCall(
      1000, // Duración en milisegundos para mostrar el texto
      () => {
        this.lifeText.setVisible(false);
      },
      [],
      this
    );
  }

  activarInmunidad() {
    this.tiempoInmunidad = this.duracionInmunidad;
  }
  nextLevel() {
    if (this.level < this.maxLevel) {
      const nextLevelSound = this.sound.add("nextLevel");
      if (!gameConfig.isSoundMuted) {
      nextLevelSound.play();
      }
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
      if (this.backgroundMusic) {
        this.backgroundMusic.stop(); 
      }
      if (!gameConfig.isSoundMuted) {
        this.deathSound.play();
      }
      this.scene.stop("ui");
      this.scene.start("perdiste", {
        level: this.level,
      });
    }
  } 
}