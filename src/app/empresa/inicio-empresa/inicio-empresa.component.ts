import { Component, OnInit } from '@angular/core';
import { checkAndUpdateDirectiveDynamic } from '@angular/core/src/view/provider';
import { FribaseinicializarService } from 'src/app/servicios/fribaseinicializar.service';

@Component({
  selector: 'app-inicio-empresa',
  templateUrl: './inicio-empresa.component.html',
  styleUrls: ['./inicio-empresa.component.css']
})
export class InicioEmpresaComponent implements OnInit {
db;
auth;
profiles = [];
buenos = [];
correo;
estatus;
dato=[];
curri=[];
  cont: number = 0;
  constructor() {
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;
    this.correo = localStorage.getItem('correo');
    this.misSolicitudes(this.correo);
    }

    misSolicitudes(correo){
      this.cont = 0
      const query = this.db.collection('solicitudes').doc(correo).collection('solicitudes').where("estatus", "==", "pendiente"); 
      query.limit(5).get().then(querySnap => {
        querySnap.forEach(element => {
         this.curri.push(element.data());
         console.log(element.data());
         console.log(this.curri[this.cont]);
         this.cont = this.cont + 1;
        });
      });
    }
  
  
  ngOnInit() {
  }

}
