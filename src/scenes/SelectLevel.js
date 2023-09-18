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

export default class SelectLevel extends Phaser.Scene {

  constructor() {
    super("selectlevel");
  }

  preload() {

    
  }

  create() {
    this.level1=this.add.text(200,300,"1",{
        fontSize: '48px',
    })
    .setInteractive();

    this.level1.on("pointerdown",()=> {
        this.scene.start("game")
    });

    this.level2=this.add.text(400,300,"2",{
        fontSize: '48px',
    })
    .setInteractive();

    this.level2.on("pointerdown",()=> {
        this.scene.start("game")
    });

    this.level3=this.add.text(600,300,"3",{
        fontSize: '48px',
    })
    .setInteractive();

    this.level3.on("pointerdown",()=> {
        this.scene.start("game")
    });

    this.back=this.add.text(15,15,"Volver",{
        fontSize: '24px', 
    })
   .setInteractive();

   this.back.on("pointerdown", ()=> {
    this.scene.start("menu")
   });

  }
}