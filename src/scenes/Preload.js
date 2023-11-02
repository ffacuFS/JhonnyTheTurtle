import Phaser from "phaser";
import { getLanguageConfig, getTranslations } from "../services/translations";
import events from "./EventCenter";
import Turtle from "../componentes/Turtle";
import FirebasePlugin from "../plugins/FirebasePlugin";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    //traduccion
    this.language = getLanguageConfig();

    //turtle
    this.load.spritesheet("turtle", "./assets/sprites/turtle1.png", {
      frameWidth: 114.6,
      frameHeight: 156,
    });
    this.load.spritesheet(
      "turtleAttack",
      "./assets/sprites/turtle-attack1.png",
      {
        frameWidth: 147.8,
        frameHeight: 147,
      }
    );
    //turtle red
    this.load.spritesheet("turtleR", "./assets/sprites/turtlered.png", {
      frameWidth: 114.6,
      frameHeight: 156,
    });
    this.load.spritesheet(
      "turtleAttackR",
      "./assets/sprites/turtle-attack-red.png",
      {
        frameWidth: 147.8,
        frameHeight: 147,
      }
    );
    //turtle yellow
    this.load.spritesheet("turtleD", "./assets/sprites/turtleyellow.png", {
      frameWidth: 114.6,
      frameHeight: 156,
    });
    this.load.spritesheet(
      "turtleAttackD",
      "./assets/sprites/turtle-attack-yellow.png",
      {
        frameWidth: 147.8,
        frameHeight: 147,
      }
    );
    this.load.spritesheet("turtleHurt", "./assets/sprites/turtle-hurt.png", {
      frameWidth: 77.2,
      frameHeight: 131,
    });
    this.load.spritesheet("turtleJump", "./assets/sprites/turtle-jump1.png", {
      frameWidth: 133.5,
      frameHeight: 162,
    });
    this.load.spritesheet("boss", "../assets/sprites/boss.png", {
      frameWidth: 170.5,
      frameHeight: 208,
    });
    this.load.spritesheet("shells", "../assets/sprites/shells.png", {
      frameWidth: 86.5,
      frameHeight: 88,
    });
    this.load.spritesheet("fruits", "../assets/atlas/fruits_1.png", {
      frameWidth: 50,
      frameHeight: 80,
    });
    this.load.spritesheet("crab", "../assets/sprites/crab_4.png", {
      frameWidth: 105,
      frameHeight: 88,
    });
    this.load.spritesheet("key", "../assets/sprites/key_1.png", {
      frameWidth: 44,
      frameHeight: 88,
    });
    this.load.spritesheet("owl", "../assets/sprites/buho.png", {
      frameWidth: 180.5,
      frameHeight: 126,
    });
    this.load.spritesheet("trap", "../assets/sprites/trampa1.png", {
      frameWidth: 128.285,
      frameHeight: 85,
    });
    this.load.spritesheet("robot","../assets/sprites/robot_2.png",{
      frameWidth: 132.27,
      frameHeight: 157,
    })
    //A CAMBIAR
    this.load.image("arena", "../assets/atlas/plataformas.png");
    this.load.image("pisos", "../assets/sprites/plataforma.jpg");
    this.load.image("laboratorio", "../assets/atlas/laboratorio.png");
    this.load.image("menulevelBG", "../assets/atlas/menulevel-01.png");
    this.load.image("backgroundMenu", "../assets/atlas/newGame-01.png");
    this.load.image("backgrounds", "../assets/atlas/escenas.png");
    this.load.image("back", "../assets/atlas/back_1.png");
    this.load.image("pause", "../assets/atlas/pause.png");
    this.load.image("play", "../assets/atlas/play.png");
    this.load.image("healthUI", "../assets/atlas/health.png");
    this.load.image("fruitUI", "../assets/atlas/fruit.png");
    this.load.image("shellUI", "../assets/atlas/shellUI.png");
    this.load.image("US-flag", "../assets/atlas/US.png");
    this.load.image("AR-flag", "../assets/atlas/AR.png");
    this.load.image("music", "../assets/atlas/music_1.png");
    this.load.image("exit", "../assets/atlas/exit.png");
    this.load.image("trampas", "../assets/atlas/Trampa.png");
    this.load.image("caja", "../assets/sprites/caja.png");
    this.load.image("fruit", "../assets/sprites/fruit.png");
    this.load.image("shell", "../assets/sprites/shell.png");
    this.load.image("bala", "../assets/sprites/bala.png");
    this.load.image("pausa", "../assets/sprites/pausa.png");
    this.load.image("popup", "../assets/sprites/popup.png");
    this.load.image("reiniciar", "../assets/sprites/reiniciar.png");
    this.load.image("continuar", "../assets/sprites/continuar.png");
    this.load.image("perdiste", "../assets/sprites/perdida_1.png");

    this.load.audio("brokenBox", "../assets/sounds/Caja-Rota.mp3");
    this.load.audio("damage", "../assets/sounds/damage.mp3");
    this.load.audio("death", "../assets/sounds/Muerte.mp3");
    this.load.audio("nextLevel", "../assets/sounds/wao.mp3");
    this.load.audio("attack", "../assets/sounds/attack.mp3");
    this.load.audio("frutaSound", "../assets/sounds/fruta.mp3");
    this.load.audio("disparoSound", "../assets/sounds/Disparojefe.mp3");

    this.load.tilemapTiledJSON("level1", "../assets/tilemaps/lv1.json");
    this.load.tilemapTiledJSON("level2", "../assets/tilemaps/lv2.json");
    this.load.tilemapTiledJSON("level3", "../assets/tilemaps/lv3.json");

    //boss prueba
    this.load.image("bosses", "../assets/sprites/bosses.png");
  }

  create() {
    // agregar un texto "Login" en la parte superior de la pantalla
    this.add
      .text(960, 100, "Login", {
        fontSize: "70px",
        fontFamily: "DM Serif Display",
        fill: "#ffd557",
      })
      .setOrigin(0.5);
    // agregar un texto Ingresar con Email y contraseña que al hacer clic me levante un popup js para ingresar los datos
    /*  this.add
     .text(400, 200, "Ingresar con Email y contraseña", {
       fontSize: 24,
     })
     .setOrigin(0.5)
     .setInteractive()
     .on("pointerdown", () => {
       const email = prompt("Email");
       const password = prompt("Password");
       this.firebase
         .signInWithEmail(email, password)
         .then(() => {
           this.scene.start("menu");
         })
         .catch(() => {
           const crearUsuario = window.confirm(
             "Email no encontrado. \n ¿Desea crear un usuario?"
           );
           if (crearUsuario) {
             this.firebase
               .createUserWithEmail(email, password)
               .then(() => {
                 this.scene.start("menu");
               })
               .catch((createUserError) => {
                 console.log(
                   "🚀 ~ file: Login.js:51 ~ .catch ~ error",
                   createUserError
                 );
               });
           }
         });
     });*/

    // Agregar un texto "Ingresas de forma Anonima" que al hacer clic me levante un popup js para ingresar los datos
    this.invitado = this.add
      .text(960, 300, "Jugar como invitado", {
        fontSize: "70px",
        fontFamily: "DM Serif Display",
        fill: "#ffd557",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.firebase
          .signInAnonymously()
          .then(() => {
            this.scene.start("menu");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });
    this.invitado.on("pointerover", () => {
      this.invitado.setStyle({ fill: "#ffa615", fontSize: "73px" });
    });
    this.invitado.on("pointerout", () => {
      this.invitado.setStyle({ fill: "#ffd557", fontSize: "70px" });
    });

    // agregar un texto centrado "Ingresar con Google" que al hacer clic me levante un popup js para ingresar los datos
    this.add
      .text(400, 400, "Ingresar con Google", {
        fontSize: 24,
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.firebase
          .signInWithGoogle()
          .then(() => {
            this.scene.start("menu");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });

    // agregar un texto "Ingresar con GitHub" que al hacer clic me levante un popup js para ingresar los datos
    this.add
      .text(400, 500, "Ingresar con GitHub", {
        fontSize: 24,
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.firebase
          .signInWithGithub()
          .then(() => {
            this.scene.start("menu");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });

    //lenguaje
    // this.scene.start("menu");

    //Animación tortuga
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("turtle", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "turtle", frame: 5 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("turtle", { start: 6, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("turtleAttack", {
        start: 0,
        end: 12,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "jumpD",
      frames: this.anims.generateFrameNumbers("turtleJump", {
        start: 10,
        end: 19,
      }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "turtleHurt1",
      frames: this.anims.generateFrameNumbers("turtleHurt", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });

    //Animación tortuga roja
    this.anims.create({
      key: "leftR",
      frames: this.anims.generateFrameNumbers("turtleR", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turnR",
      frames: [{ key: "turtleR", frame: 5 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "rightR",
      frames: this.anims.generateFrameNumbers("turtleR", { start: 6, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "attackR",
      frames: this.anims.generateFrameNumbers("turtleAttackR", {
        start: 0,
        end: 12,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //Animación tortuga dorada
    this.anims.create({
      key: "leftD",
      frames: this.anims.generateFrameNumbers("turtleD", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turnD",
      frames: [{ key: "turtleD", frame: 5 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "rightD",
      frames: this.anims.generateFrameNumbers("turtleD", { start: 6, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "attackD",
      frames: this.anims.generateFrameNumbers("turtleAttackD", {
        start: 0,
        end: 12,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "gameOver",
      frames: this.anims.generateFrameNumbers("gameOVerA", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //animacion Boss y enemigos
    this.anims.create({
      key: "bossAnim",
      frames: this.anims.generateFrameNumbers("boss", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "crabAnim",
      frames: this.anims.generateFrameNumbers("crab", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "owlAnim",
      frames: this.anims.generateFrameNumbers("owl", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "robotAnim",
      frames: this.anims.generateFrameNumbers("robot", {
        start: 0,
        end: 10,
      }),
      frameRate: 5,
      repeat: -1,
    });
    //animacion objetos
    this.anims.create({
      key: "shell",
      frames: this.anims.generateFrameNumbers("shells", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "fruits",
      frames: this.anims.generateFrameNumbers("fruits", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "trapA",
      frames: this.anims.generateFrameNumbers("trap", {
        start: 0,
        end: 6,
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: "keyA",
      frames: this.anims.generateFrameNumbers("key", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
