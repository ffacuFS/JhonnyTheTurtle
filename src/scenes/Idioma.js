import Phaser from "phaser";
import { EN_US, ES_AR } from "../enums/lengua";
import {
  getLanguageConfig,
  getPhrase,
  getTranslations,
} from "../services/translations";
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

export default class Idioma extends Phaser.Scene {
  //updateString = "Continuar";
  textSpanish;
  textEnglish;
  wasChangedLanguage = TODO;

  constructor() {
    super("idioma");
    const { next } = keys.Idioma;
    this.updateString = next;
    this.next = next;
  }

  init({ language }) {
    this.level = 1;
    this.language = language;
  }
  preload() {}

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

    this.nextText = this.add
      .text(700, 20, getPhrase(this.next), {
        color: "#ffffff",
      })
      .setInteractive();

    this.nextText.on(
      "pointerdown",
      function () {
        this.scene.start("menu"); // Cambiar a la escena llamada 'OtraEscena'
      },
      this
    );
  }

  update() {
    if (this.wasChangedLanguage === FETCHED) {
      this.wasChangedLanguage = READY;
      this.nextText.setText(getPhrase(this.next));
    }
  }

  updateWasChangedLanguage = () => {
    this.wasChangedLanguage = FETCHED;
  };

  async getTranslations(language) {
    this.language = language;
    this.wasChangedLanguage = FETCHING;
    await getTranslations(language, this.updateWasChangedLanguage);
  }
}
