import Phaser from "phaser";
import { EN_US,ES_AR } from "../enums/lengua";
import { getLanguageConfig,getPhrase } from "../services/translations";
import keys from "../enums/keys";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";

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

export default class Lenguage extends Phaser.Scene {

    updateString = "Continuar";

  constructor() {
    super("lenguage");
    const {next} = keys.lenguage
    this.updateString = next;
    this.next = next;
  }

  init ({lenguage}){
    this.lenguage = lenguage;
    
  }
  preload() {


  }

  create() {
    const { width, height } = this.scale;

    const buttonSpanish = this.add
      .rectangle(width * 0.1, height * 0.15, 150, 75, 0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.getTranslations(ES_AR);
      });

    this.textSpanish = this.add
      .text(buttonSpanish.x, buttonSpanish.y, "Español", {
        color: "#000000",
      })
      .setOrigin(0.5);

    const buttonEnglish = this.add
      .rectangle(width * 0.5, height * 0.15, 150, 75, 0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.getTranslations(EN_US);
      });

    this.textEnglish = this.add
      .text(buttonEnglish.x, buttonEnglish.y, "Inglés", {
        color: "#000000",
      })
      .setOrigin(0.5);

    const buttonUpdate = this.add
      .rectangle(width * 0.5, height * 0.75, 150, 75, 0x44d27e)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        this.scene.start("game", { language: this.lenguage });
      });

    this.updatedTextInScene = this.add
      .text(buttonUpdate.x, buttonUpdate.y, getPhrase(this.updateString), {
        color: "#000000",
      })
      .setOrigin(0.5);

    this.nextText = this.add.text(
      width * 0.5,
      height * 0.3,
      getPhrase(this.next),
      {
        color: "#ffffff",
      }
    );
  }

  update(){
    if (this.wasChangedLanguage === FETCHED) {
        this.wasChangedLanguage = READY;
        this.updatedTextInScene.setText(getPhrase(this.updateString));
        this.nextText.setText(getPhrase(this.next));
      }
    }
  
    updateWasChangedLanguage = () => {
      this.wasChangedLanguage = FETCHED;
    };
  
    async getTranslations(lenguage) {
      this.lenguage = lenguage;
      this.wasChangedLanguage = FETCHING;
  
      await getTranslations(lenguage, this.updateWasChangedLanguage);
    
  }
}