
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MisVacantes} from 'src/app/servicios/vacantes.servico';
import { FribaseinicializarService } from 'src/app/servicios/fribaseinicializar.service';




@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.css']
})
export class VacantesComponent implements OnInit {
  modalpuesto: any;
  puesto: any;
  vacanteForm: FormGroup;
  vacante: any;

  db;
  auth;
  correo;
  curri = [];
 
  cont: number = 0;
  constructor(private pf: FormBuilder) { 
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
    FribaseinicializarService.inicializar();
  }
  this.db = FribaseinicializarService.db;
  this.auth = FribaseinicializarService.auth;
  this.correo = localStorage.getItem('correo');
  console.log(this.correo)
  this.misvacantes(this.correo)
  }
  saveMvacante(){
    const savePresupuesto = {
      experiencia: this.vacanteForm.get('mexperiencia').value,
         
    }
    return savePresupuesto;
  }
  ngOnInit() {
    
  }

  misvacantes(correo){
    console.log(correo)
    const query = this.db.collection('misvacantes').doc(correo).collection('vacante'); 
    query.get().then(querySnap => {
     querySnap.forEach(element => {
      this.curri[this.cont] = element.data();
      //console.log(element.data());
      console.log(this.curri[this.cont]);
      this.cont = this.cont + 1;
     });
   });
  }




  
  detalles(escrito: any){
    this.puesto= escrito;
     console.log(this.puesto);
        
  }

  prueba(){
    
    console.log(this.vacanteForm.get('mexperiencia').value)
    
  }

 
}
