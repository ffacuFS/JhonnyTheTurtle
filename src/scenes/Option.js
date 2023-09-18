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

export default class Option extends Phaser.Scene {

  constructor() {
    super("option");
  }

  preload() {

    
  }

  create() {
    this.back=this.add.text(20,15,"Volver",{
        fontSize: '24px', 
    })
   .setInteractive();

   this.back.on("pointerdown", ()=> {
    this.scene.start("menu")
   });

   this.add.text(300,300,"Barra volumen",{
    fontSize: '24px',
   });

   this.add.text(300,400,"Idioma",{
    fontSize:'24px'
   });
  }
}
