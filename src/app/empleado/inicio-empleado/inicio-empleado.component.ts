import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { FribaseinicializarService } from 'src/app/servicios/fribaseinicializar.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-inicio-empleado',
  templateUrl: './inicio-empleado.component.html',
  styleUrls: ['./inicio-empleado.component.css']
})
export class InicioEmpleadoComponent implements OnInit {
  res = [];
  db;
  auth;
  proveedores: any;
  token;
  correo;
  empresacorreo;
  empresanombre;
  usuario;
  profiles;
  puesto;
  data;
  checkuser;
  ext: boolean = false;
  constructor(private servicio: ProveedoresService) {
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;
    this.correo = localStorage.getItem('correo');
    console.log(this.correo)
  
    this.servicio.vacantes() }
  
  prueba(){
    this.res = this.servicio.dato;
    
  }

  saveSolicitud(){
    const varsev = {
     correo: this.correo,
     nombre: this.usuario,
     puesto: this.puesto,
     empresa: this.empresanombre,
     nompresa: this.empresacorreo,
     estatus: 'activo',
    }
    console.log(varsev);
    return varsev;
  }

  enviarSolicitud(){
    this.ext = false;
    this.data = this.saveSolicitud();
    
    const query = this.db.collection('soli').doc(this.correo).collection('solicitudes'); 
     query.get().then(querySnap => {
      querySnap.forEach(element => {

          this.checkuser = element.data();
          
        if (this.checkuser.puesto == this.puesto ){
          this.ext=true;
          alert("Ya has enviado una solicitud antes")
         
        }
    } ); 
    
    if(this.ext == false){
   
      console.log(this.data);
      this.db.collection('solicitudes').doc(this.empresacorreo).collection('solicitudes').add(this.data)
      this.db.collection('soli').doc(this.correo).collection('solicitudes').add(this.data)
      
   .then(function(docRef) {
       console.log("Document written with ID: ", docRef.id);
   })
   .catch(function(error) {
       console.error("Error adding document: ", error);
   });
    }
    
    
  });
  
   
  }

  perfil(correo) {
    const query = this.db.collection('empleado').doc(correo); 
     query.get().then(querySnap => {
          this.profiles = querySnap.data();
          this.usuario = this.profiles.nombre + " " + this.profiles.app + " " + this.profiles.apm;
    });
  }

  detalle(correo, nombre, puesto){
    this.empresacorreo = correo;
    this.empresanombre = nombre;
    this.puesto = puesto;
    this.perfil(this.correo);
  }
  ngOnInit() {
    this.res = this.servicio.dato;
    this.proveedores= this.servicio.getProveedores();
  }

}
