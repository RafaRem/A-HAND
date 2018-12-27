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
  mensaje = "Nos gustaria que se presentara el dia lunes para una cita, respecto a la vacante solcitada, lo esperamos con ansias"
  
  modalpuesto: any;
  puesto: any;
  solicitudForm: FormGroup;
  vacante: any;
  solicitud;
  curriculum = [];
  puesto_m;
  telefono;
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
            
            this.puesto_m = this.estatus.puesto;
            alert(this.estatus.puesto)
            
            this.db.collection('solicitudes').doc(this.correo).collection('solicitudes').doc(element.id).set({
              estatus : 'cancelar',
              status: 'rechazado'
            
            }, { merge: true })
            this.modificarsoli("rechazado");
            
         
        
          }
        }
          this.cont = this.cont + 1;
      });
    });
  }


aceptar(){
    const query = this.db.collection('solicitudes').doc(this.correo).collection('solicitudes');
      this.cont = 0;
      
      query.get().then(querySnap => {
          querySnap.forEach(element => {
          
            this.estatus = element.data();
            //console.log(element.data());
            if (this.estatus.correo == this.empleado){
            if ((this.estatus.estatus == 'activo')||(this.estatus.estatus == 'pendiente')){
              
              this.puesto_m = this.estatus.puesto;
              alert(this.estatus.puesto)
              
              this.db.collection('solicitudes').doc(this.correo).collection('solicitudes').doc(element.id).set({
                estatus : 'aceptado',
                status: 'aceptado'
              
              }, { merge: true })
              this.modificarsoli("aceptado");
              
           
          
            }
          }
            this.cont = this.cont + 1;
        });
      });
    }

  modificarsoli(statuss){
    const query = this.db.collection('soli').doc(this.empleado).collection('solicitudes');
      this.cont = 0;
      
      query.get().then(querySnap => {
          querySnap.forEach(element => {
          
            this.estatus = element.data();
            //console.log(element.data());
            if ((this.correo == this.estatus.nompresa)&&(this.puesto_m == this.estatus.puesto)){
            if ((this.estatus.estatus == 'activo')||(this.estatus.estatus == 'pendiente')){
              alert(this.estatus.correo)
              alert(this.empleado)
        
  
              this.db.collection('soli').doc(this.empleado).collection('solicitudes').doc(element.id).set({
                estatus : 'activo',
                status: statuss
              
              }, { merge: true });
  
              
             alert("La Solicitud Fue Rechazada")
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

  checkr(values:any){
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true){
      console.log(this.curri.length)
      this.cont = 0;
      this.curri.splice(0,this.curri.length);
        const query = this.db.collection('solicitudes').doc(this.correo).collection('solicitudes').where("status", "==", "rechazado"); 
        query.get().then(querySnap => {
          querySnap.forEach(element => {
           this.curri[this.cont] = element.data();
           //console.log(element.data());
           console.log(this.curri[this.cont]);
           this.cont = this.cont + 1;
          });
        });
      
    }else{
      
    }
  }

  whatsapp(correo){

    const query = this.db.collection('empleado').doc(correo); 
    query.get().then(querySnap => {

       this.solicitud= querySnap.data();
       //console.log(element.data());
      this.telefono = this.solicitud.telefono;
      alert(this.telefono)
      window.open("https://api.whatsapp.com/send?phone=52"+this.telefono+"&text="+this.mensaje);
    });
  }
  checka(values:any){
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true){
      console.log(this.curri.length)
      this.cont = 0;
      this.curri.splice(0,this.curri.length);
        const query = this.db.collection('solicitudes').doc(this.correo).collection('solicitudes').where("status", "==", "aceptado"); 
        query.get().then(querySnap => {
          querySnap.forEach(element => {
           this.curri[this.cont] = element.data();
           //console.log(element.data());
           console.log(this.curri[this.cont]);
           this.cont = this.cont + 1;
          });
        });
      
    }else{
      
    }
  }

  checkp(values:any){
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true){
        this.curri.splice(0,this.curri.length);
        this.cont = 0;
        const query = this.db.collection('solicitudes').doc(this.correo).collection('solicitudes').where("estatus", "==", "pendiente"); 
        query.get().then(querySnap => {
          querySnap.forEach(element => {
           this.curri[this.cont] = element.data();
           //console.log(element.data());
           console.log(this.curri[this.cont]);
           this.cont = this.cont + 1;
          });
        });
      
    }else{
      
    }
  }
}
