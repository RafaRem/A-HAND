import { Injectable } from '@angular/core';
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import {PerfilEmpleadoComponent} from  '../empleado/perfil-empleado/perfil-empleado.component'
import { element } from '@angular/core/src/render3/instructions';
import { FribaseinicializarService } from './fribaseinicializar.service';
import { forEach } from '@angular/router/src/utils/collection';
@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  db;
  dato = [];
  profiles;
  cont: number = 0;

  proveedores: any = [{
    nombre: 'Jose Perez Lopez',
    direccion: 'paseo de la reforma, #100',
    cp: '28010',
    localidad: 'CDMX',
    estado: 'CDMX',
    telefono: 551234567,
    email: 'joseperezlopez@hotmail.com',
    contacto: 'Jose Perez Lopez'

  },{ nombre: 'Edgar Rafael Rembao Quintero',
  direccion: 'paseo de la reforma, #101',
  cp: '28010',
  localidad: 'CDMX',
  estado: 'CDMX',
  telefono: 5512254831,
  email: 'edgarembao@hotmail.com',
  contacto: 'Edgar Rafael Rembao Quintero'}]

  getProveedores(){
    return this.proveedores;
  }
  auth;
  constructor() { 
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;
}
//AGREGAR
agregar(usuario, ID, coleccion){
 console.log(usuario) 
this.db.collection(coleccion).doc(ID).set(usuario)
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});

console.log('ya lo creo');}

addcurri(usuario, ID){
  
    console.log(usuario) 
    this.db.collection('curriculum').doc(ID).collection('curriculum').add(usuario)


 
 .then(function(docRef) {
     console.log("Document written with ID: ", docRef.id);
 })
 .catch(function(error) {
     console.error("Error adding document: ", error);
 });
 
 console.log('ya lo creo');}


 agregarv(usuario,correo, ID){
    console.log(usuario);
    this.db.collection('misvacantes').doc(correo).collection('vacante').add(usuario)
    this.db.collection('vacantes').add(usuario)
 .then(function(docRef) {
     console.log("Document written with ID: ", docRef.id);
 })
 .catch(function(error) {
     console.error("Error adding document: ", error);
 });
 
 console.log('ya lo creo');}

agregarr(usuario, ID){
  for (let entry of usuario) {
    console.log(entry) 
    this.db.collection('curriculum').doc(ID).collection('curriculum').add(entry)


 
 .then(function(docRef) {
     console.log("Document written with ID: ", docRef.id);
 })
 .catch(function(error) {
     console.error("Error adding document: ", error);
 });
 
 console.log('ya lo creo');}}

//CONSULTAR VACANTES
vacantes() {
  const query = this.db.collection('vacantes');
  query.get().then(querySnap => {
      querySnap.forEach(element => {
      
        this.dato[this.cont] = element.data();
        //console.log(element.data());
      
        this.cont = this.cont + 1;
    });
  });
}

perfil(correo) {
  const query = this.db.collection('empleado').doc(correo); 
   query.get().then(querySnap => {
        this.profiles = querySnap.data();
        return querySnap.data();
  });
}
}
