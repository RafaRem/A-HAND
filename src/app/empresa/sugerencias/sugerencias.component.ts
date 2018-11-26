import { Component, OnInit } from '@angular/core';
import { ServicioSolicitudes } from '../../servicios/solicitudes.service';
import { FribaseinicializarService } from 'src/app/servicios/fribaseinicializar.service';
@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})
export class SugerenciasComponent implements OnInit {

  vacantes = [];
  db;
  auth;
  dato = [];
  cont:number = 0;
  conta:number = 0;
  correo;
  puesto = [];
  curriculum = [];
  solicitud;
  puestos;
  estatus;
  nombre;
  empleado;

  constructor(private misvacantes: ServicioSolicitudes) {
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
    FribaseinicializarService.inicializar();
  }
  this.db = FribaseinicializarService.db;
  this.auth = FribaseinicializarService.auth; 
this.correo = localStorage.getItem('correo')
this.sujerencias()}

  ngOnInit() {
    this.vacantes= this.misvacantes.getvacantes();
  }

  sujerencias() {
    console.log(this.correo)
    const query = this.db.collection('sujerencias').doc(this.correo).collection('sujerencias').where("estatus", "==", "pendiente");
    this.cont = 0;
    query.get().then(querySnap => {
        querySnap.forEach(element => {
        
          this.dato[this.cont] = element.data();
          //console.log(element.data());
          
        
          this.cont = this.cont + 1;
      });
    });
  }

  eliminar(){
    const query = this.db.collection('sujerencias').doc(this.correo).collection('sujerencias');
      this.cont = 0;
      
      query.get().then(querySnap => {
          querySnap.forEach(element => {
            
            this.estatus = element.data();
            //console.log(element.data());
            console.log(this.estatus.correo);
            console.log(this.empleado);
            console.log(this.estatus.estatus)
            if (this.estatus.correo == this.empleado){
            if ((this.estatus.estatus == 'activo')||(this.estatus.estatus == 'pendiente')){
              alert("La Solicitud Fue Eliminada")
              console.log(this.correo)
  
              this.db.collection('sujerencias').doc(this.correo).collection('sujerencias').doc(element.id).set({
                estatus : 'eliminado'
              
              }, { merge: true })
              
             
             location.reload();
            }
          }
            this.cont = this.cont + 1;
        });
      });
    }

  pasarcorreo(nombre,correo){
    this.nombre = nombre;
  this.empleado = correo
  }


  misperfil(correo){

    const query = this.db.collection('empleado').doc(correo); 
    query.get().then(querySnap => {

       this.solicitud = querySnap.data();
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
      console.log(element.id, " => ", element.data());
       this.curriculum[this.conta] = element.data();
       //console.log(element.data());
       console.log(this.curriculum[this.conta]);
       this.conta = this.conta + 1;
 
   });
   });
  }

  
  detalles(escrito: any){
    
    this.puesto = this.misperfil(escrito.correo);
        
  }

}
