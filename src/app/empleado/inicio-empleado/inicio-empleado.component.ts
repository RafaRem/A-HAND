import { Component, OnInit, HostListener } from '@angular/core';
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
  puntero = 7;
  elemento;
  docum;
  correo;
  empresacorreo;
  empresanombre;
  usuario;
  profiles;
  puesto;
  data;
  checkuser;
  cont: number = 0;
  ext: boolean = false;
  constructor(private servicio: ProveedoresService) {
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;
    this.correo = localStorage.getItem('correo');
    console.log(this.correo)
  }

  Scroll(event){
    const top = this.elemento.pageYOffset;
  
    const height =  this.docum.offsetHeight;
  
    if (top > height - 780) {
      console.log('Entro');
      this.actualizarServicios(top, height);
    }
  }
  actualizarServicios(top, height) {
    const db = this.servicio.db;
    const self = this;
    db.collection('vacantes')
    .limit(this.puntero + 7)
    .get().then(querySnap => {
      self.res = [];
      querySnap.forEach(element => {
        const documento = element.data();
        documento.id = element.id;
        self.res.push(documento);
        self.puntero += 1;
      });
    
    });
  }
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
     status: 'enviado'
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
    this.getServicios();
    this.elemento = window;
    this.docum = document.getElementById('inicio');
  }
  getServicios() {
    const db = this.servicio.db;
    const self = this;
    let prim = false;
    db.collection('vacantes')
    .limit(this.puntero)
    .get().then(querySnap => {
      db.collection('vacantes')
      .limit(1)
      .onSnapshot(querySnap => {
        if (prim) {
          querySnap.forEach(element => {
            const documento = element.data();
            documento.id = element.id;
            self.res.push(documento);
            self.puntero += 1;
          });
        } else {
          prim = true;
        }
      });
      querySnap.forEach(element => {
        const documento = element.data();
        documento.id = element.id;
        self.res.push(documento);
      });
    });
  }


  

}
