import { Component, OnInit } from '@angular/core';
import { FribaseinicializarService } from 'src/app/servicios/fribaseinicializar.service';

@Component({
  selector: 'app-empleadoheader',
  templateUrl: './empleadoheader.component.html',
  styleUrls: ['./empleadoheader.component.css']
})
export class EmpleadoHeaderComponent implements OnInit {
db;
auth;
cont: number = 0;
dato = [];
curri = [];
estatus;
correo;
  constructor() {
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;
    this.correo = localStorage.getItem("correo")
     this.datos()
   }

   datos(){

    const query = this.db.collection('soli').doc(this.correo).collection('solicitudes'); 

    query.get().then(querySnap => {
        querySnap.forEach(element => {
          
          this.estatus = element.data();
    
          
          if ((this.estatus.status == 'rechazado') ||(this.estatus.status == 'aceptado')){
            
            this.dato.push(this.estatus);
       
         
          }
          
          this.cont = this.cont + 1;
      });
    });
   }

  ngOnInit() {
   

    window.setInterval(()=>{
    const query = this.db.collection('soli').doc(this.correo).collection('solicitudes'); 

    query.get().then(querySnap => {
        querySnap.forEach(element => {
          
          this.estatus = element.data();
     
          
          if ((this.estatus.status == 'rechazado') || (this.estatus.estatus == 'aceptado')){
            
            this.curri.push(this.estatus);
        
            this.db.collection('soli').doc(this.correo).collection('solicitudes').doc(element.id).set({
              estatus : 'pendiente'
            }, { merge: true });
          }
          
          this.cont = this.cont + 1;
      });
    });

    }, 10000);
  }
  notificaciones(){
    
  }
  cerrar(){
    this.auth.signOut().then(function(){
      localStorage.removeItem('token');
      console.log("Se cerro la sesion");
    }).catch(function(error){});
  }
}
