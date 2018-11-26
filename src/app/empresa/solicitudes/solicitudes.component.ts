import { Component, OnInit } from '@angular/core';
import {ProveedoresService} from 'src/app/servicios/proveedores.service';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { FribaseinicializarService } from 'src/app/servicios/fribaseinicializar.service';
@Component({
  selector: 'app-proveedores',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  modalpuesto: any;
  puesto: any;
  solicitudForm: FormGroup;
  vacante: any;
  solicitud;
  curriculum = [];
  db;
  auth;
  correo;
  empleado;
  nombre;
  curri = [];
  dato = [];
  estatus;
  cont: number = 0;
  conta: number = 0;
  constructor(private pf: FormBuilder) {
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;
    this.correo = localStorage.getItem('correo');
    console.log(this.correo)
    this.misSolicitudes(this.correo)
    this.misperfil(this.correo)
   }

  ngOnInit() {
 
  }

  pasarcorreo(nombre,correo){
    this.nombre = nombre;
  this.empleado = correo
  }
eliminar(){
  const query = this.db.collection('solicitudes').doc(this.correo).collection('solicitudes');
    this.cont = 0;
    
    query.get().then(querySnap => {
        querySnap.forEach(element => {
        
          this.estatus = element.data();
          //console.log(element.data());
          if (this.estatus.correo == this.empleado){
          if ((this.estatus.estatus == 'activo')||(this.estatus.estatus == 'pendiente')){
            
      

            this.db.collection('solicitudes').doc(this.correo).collection('solicitudes').doc(element.id).set({
              estatus : 'eliminado'
            
            }, { merge: true })
            
           alert("La Solicitud Fue Eliminada")
           location.reload();
          }
        }
          this.cont = this.cont + 1;
      });
    });
  }
  detalles(escrito: any){
    
    this.puesto = this.misperfil(escrito.correo);
        
  }

  misSolicitudes(correo){
    const query = this.db.collection('solicitudes').doc(correo).collection('solicitudes').where("estatus", "==", "pendiente"); 
    query.get().then(querySnap => {
      querySnap.forEach(element => {
       this.curri[this.cont] = element.data();
       //console.log(element.data());
       console.log(this.curri[this.cont]);
       this.cont = this.cont + 1;
      });
    });
  }


  misperfil(correo){

    const query = this.db.collection('empleado').doc(correo); 
    query.get().then(querySnap => {

       this.solicitud= querySnap.data();
       //console.log(element.data());
       console.log(this.solicitud);
      this.micurriculum(this.solicitud.curp)
    });
    return this.solicitud
  }
  micurriculum(curp){
    console.log(curp);
    this.conta = 0;
    const query = this.db.collection('curriculum').doc(curp).collection('curriculum'); 
    query.get().then(querySnap => {
     querySnap.forEach(element => {
    
       this.curriculum[this.conta] = element.data();
       //console.log(element.data());
       console.log(this.curriculum[this.conta]);
       this.conta = this.conta + 1;
 
   });
   });
  }

}
