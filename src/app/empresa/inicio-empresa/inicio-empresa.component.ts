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
  cont: number = 0;
  constructor() {
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;
    this.correo = localStorage.getItem('correo');
    
    }

    
  
  ngOnInit() {
  }

}
