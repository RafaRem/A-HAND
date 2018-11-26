import { Injectable } from '@angular/core';
import {firebase} from '@firebase/app';
import { from } from 'rxjs';
import '@firebase/firestore';
import '@firebase/auth';
import { FirebaseAuth } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class CrudusuariosService {
  db;
 
  constructor() {
  
    this.db = firebase.firestore();
   }

   agregarUsuario(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(
      function(error){
    }); 
   }

   iniciarSesion(email:string, password:string){
     firebase.auth().signOut().then(function(){
       console.log("Se cerro la sesion");
     }).catch(function(error){});

     firebase.auth().signInWithEmailAndPassword(email, password).then(
       response => {
          firebase.auth().currentUser.getIdToken().then(function(jsonwebtoken){
            console.log(jsonwebtoken);
            localStorage.setItem('token', jsonwebtoken);
            localStorage.setItem('correo', firebase.auth().currentUser.email);
            return jsonwebtoken;
          });
       }
     ).catch (error => console.log(error));
     
    }
  
    
  
  }
  


