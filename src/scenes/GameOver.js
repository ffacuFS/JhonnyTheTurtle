import Phaser from "phaser";
import events from "./EventCenter";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }
  init(){
    
  }
  create() {
       this.add.text(400,300,"PERDISTE",{
        fontSize: "42px",
       })

       this.volverMenu= this.add.text(600,300,"Volver",{
        fontSize: "24px",
       }).setInteractive(true);
    
       this.volverMenu.on("pointerdown", ()=>{
        this.scene.start("selectlevel")
       });

  }
}