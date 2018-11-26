import { Component, OnInit } from '@angular/core';
import { FribaseinicializarService } from 'src/app/servicios/fribaseinicializar.service';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-mis-socicitudes',
  templateUrl: './mis-socicitudes.component.html',
  styleUrls: ['./mis-socicitudes.component.css']
})
export class MisSocicitudesComponent implements OnInit {
  modalpuesto: any;
  puesto: any;
  solicitudForm: FormGroup;
  vacante: any;
  estatus;
  empleado;
  vacan;
 vari;
 res;
  db;
  auth;
  correo;
  curri =[];
vac;
  cont: number = 0;
  constructor(private pf: FormBuilder) { 
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;
    this.correo = localStorage.getItem('correo');
    console.log(this.correo)
    this.misSolicitudes(this.correo)
  }

  misSolicitudes(correo){
    const query = this.db.collection('soli').doc(correo).collection('solicitudes'); 
    query.get().then(querySnap => {
     querySnap.forEach(element => {
      this.vacan = element.data();
      if((this.vacan.estatus == "activo")||(this.vacan.estatus == "pendiente")){
        this.curri[this.cont] = element.data();
        //console.log(element.data());
        console.log(this.curri[this.cont]);
        this.cont = this.cont + 1;
      }
      
   });
   });
  }
  ngOnInit() {
  }
  pasarcorreo(nombre,correo){
    this.vari = nombre;
    this.empleado = correo
  }

  eliminar(){
    const query = this.db.collection('soli').doc(this.correo).collection('solicitudes');
      this.cont = 0;
      
      query.get().then(querySnap => {
          querySnap.forEach(element => {
            
            this.estatus = element.data();
            //console.log(element.data());
          
            if (this.estatus.puesto == this.vari){
            if ((this.estatus.estatus == 'activo')||(this.estatus.estatus == 'pendiente')){
              
  
              this.db.collection('soli').doc(this.correo).collection('solicitudes').doc(element.id).set({
                estatus : 'eliminado'
                
              }, { merge: true })
              
              
              
             
            }
          }
            this.cont = this.cont + 1;
        });
        alert("La Solicitud Fue Eliminada");
      location.reload();
      });
      
    }


  detalles(escrito: any){
    this.puesto = escrito;
    this.misvacantes(this.puesto.nompresa,this.puesto.puesto);
    console.log(this.puesto);
        
  }

  misvacantes(correo,puesto){
    
    this.cont=0;
    const query = this.db.collection('misvacantes').doc(correo).collection('vacante'); 
    query.get().then(querySnap => {
     querySnap.forEach(element => {
        this.res=element.data();
    
       if(puesto == this.res.puesto){
        this.vac = element.data();
        console.log(this.vac);
       }
   
   
     });
   });
  }
}
