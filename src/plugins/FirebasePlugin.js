import Phaser from "phaser";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBQyRKcyn95eHbmncSHrGcrEQInrG3Uy6E",
    authDomain: "johnny-the-turtle.firebaseapp.com",
    projectId: "johnny-the-turtle",
    storageBucket: "johnny-the-turtle.appspot.com",
    messagingSenderId: "365146667875",
    appId: "1:365146667875:web:e439f5de7974ee87047156"
  };

export default class FirebasePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    this.app = initializeApp(firebaseConfig);
  }
};