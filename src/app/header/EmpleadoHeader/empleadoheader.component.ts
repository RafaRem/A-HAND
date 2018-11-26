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
  constructor() {
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;
   }

  ngOnInit() {
  }

  cerrar(){
    this.auth.signOut().then(function(){
      localStorage.removeItem('token');
      console.log("Se cerro la sesion");
    }).catch(function(error){});
  }
}
