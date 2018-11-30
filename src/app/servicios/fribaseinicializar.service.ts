import {firebase} from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';

export class FribaseinicializarService {

  public static auth;
  public static db;
  public static storage;


  constructor() { }

  public static inicializar(){
    firebase.initializeApp({
    apiKey: "AIzaSyAUD07_YPtlvn35xa8IZMFoHwwyDt-yWcE",
    authDomain: "onehand-31b33.firebaseapp.com",
    databaseURL: "https://onehand-31b33.firebaseio.com",
    projectId: "onehand-31b33",
    storageBucket: "onehand-31b33.appspot.com",
    messagingSenderId: "831421603120"
    });
    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.storage = firebase.storage();
    
  }
}
