import {firebase} from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

export class FribaseinicializarService {

  public static auth;
  public static db;


  constructor() { }

  public static inicializar(){
    firebase.initializeApp({
      apiKey: 'AIzaSyAUD07_YPtlvn35xa8IZMFoHwwyDt-yWcE',
      authDomain: 'onehand-31b33.firebaseapp.com',
      projectId: 'onehand-31b33'
    });
    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }
}
