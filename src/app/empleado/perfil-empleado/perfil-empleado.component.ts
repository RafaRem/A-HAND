import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { Injectable } from '@angular/core';
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import { ParseError } from '@angular/compiler';
import { isUndefined } from 'util';
import { FribaseinicializarService } from 'src/app/servicios/fribaseinicializar.service';

@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.css']
})
export class PerfilEmpleadoComponent implements OnInit {
  profiles;
  db;
  curri = [];
  cont = 0;
  curp;
  auth;
  
  constructor() {  
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;
    this.perfil(localStorage.getItem('correo'));
    
 
  }

  ngOnInit() { 
    
    //this.curriculum(this.curp.curp);
  }
  
  perfil(correo) {
    console.log(correo)
    const query = this.db.collection('empleado').doc(correo); 
     query.get().then(querySnap => {
          this.profiles = querySnap.data();
          console.log(this.profiles);
          this.curriculum(this.profiles.curp);
      
    });
  }
  curriculum(curp){
    const query = this.db.collection('curriculum').doc(curp).collection('curriculum'); 
     query.get().then(querySnap => {
      querySnap.forEach(element => {
     
        this.curri[this.cont] = element.data();
        //console.log(element.data());
        console.log(this.curri[this.cont]);
        this.cont = this.cont + 1;
  
    });
    });
  
  }

}
