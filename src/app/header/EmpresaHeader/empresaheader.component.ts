import { Component, OnInit } from '@angular/core';
import { FribaseinicializarService } from 'src/app/servicios/fribaseinicializar.service';

@Component({
  selector: 'app-empresaheader',
  templateUrl: './empresaheader.component.html',
  styleUrls: ['./empresaheader.component.css']
})
export class EmpresaHeaderComponent implements OnInit {
db;
auth;
profiles = [];
buenos = [];
correo;
estatus;
solista;
dato=[];
soli =[];
cont: number = 0;
  constructor() { 
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;
    this.correo = localStorage.getItem('correo')
    this.sujerencias();
   
  }

  

  sujerencias() {
    const querysoli = this.db.collection('solicitudes').doc(this.correo).collection('solicitudes');
    const query = this.db.collection('sujerencias').doc(this.correo).collection('sujerencias');
    this.cont = 0;
    query.get().then(querySnap => {
        querySnap.forEach(element => {
        
          this.estatus = element.data();
          //console.log(element.data());
          if (this.estatus.estatus == 'pendiente'){
            
            this.dato.push(this.estatus);
            console.log("es el dato")
            console.log(this.dato)
          }
          
          this.cont = this.cont + 1;
      });
    });

    querysoli.get().then(querySnap => {
      querySnap.forEach(element => {
      
        this.solista = element.data();
        //console.log(element.data());
        
        if (this.solista.estatus == 'pendiente'){
          
          this.soli.push(this.solista);
          console.log("es el dato")
          console.log(this.dato)
         
        }
        
        this.cont = this.cont + 1;
    });
  });
    
  }

  ngOnInit() {
    
    window.setInterval(()=>{
      console.log(this.correo)
    const query = this.db.collection('sujerencias').doc(this.correo).collection('sujerencias');
    const querysoli = this.db.collection('solicitudes').doc(this.correo).collection('solicitudes');
    this.cont = 0;
    query.get().then(querySnap => {
        querySnap.forEach(element => {
        
          this.estatus = element.data();
          //console.log(element.data());
          
          if (this.estatus.estatus == 'activo'){
            
            this.dato.push(this.estatus);
            console.log("es el dato")
            console.log(this.dato)
            this.db.collection('sujerencias').doc(this.correo).collection('sujerencias').doc(element.id).set({
              estatus : 'pendiente'
            }, { merge: true });
          }
          
          this.cont = this.cont + 1;
      });
    });

    querysoli.get().then(querySnap => {
      querySnap.forEach(element => {
      
        this.solista = element.data();
        //console.log(element.data());
        
        if (this.solista.estatus == 'activo'){
          
          this.soli.push(this.solista);
          console.log("es el dato")
          console.log(this.dato)
          this.db.collection('solicitudes').doc(this.correo).collection('solicitudes').doc(element.id).set({
            estatus : 'pendiente'
          }, { merge: true });
        }
        
        this.cont = this.cont + 1;
    });
  });
    }, 10000);




  }

  cerrar(){
    this.auth.signOut().then(function(){
      localStorage.removeItem('token');
      console.log("Se cerro la sesion");
    }).catch(function(error){});
  }

}

