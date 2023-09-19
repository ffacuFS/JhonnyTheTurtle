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

export default class Menu extends Phaser.Scene {

  constructor() {
    super("menu");
  }

  preload() {

    
  }

  create() {
  
this.selecLevel=this.add.text(280,300,"Seleccion de nivel",{
        fontSize: "24px",

        fill: '#fff',
        
    })
    .setInteractive();

    this.selecLevel.on("pointerdown", ()=> {
        this.scene.start("selectlevel")
    });

this.options=this.add.text(280,350,"Opciones" ,{

    fontSize:'24px',
    fill: '#fff',

})
.setInteractive();

    this.options.on("pointerdown", ()=> {
        this.scene.start("option")
    });

  }
}
