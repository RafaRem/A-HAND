import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router'

import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { CrudusuariosService } from 'src/app/servicios/crudusuarios.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {
  empleadoForm: FormGroup;
  empleadootrolado;
  empleado: {};
  date2: any ;
  date1: any;
  cont:number = 0;
  curri = []
  constructor(private pf: FormBuilder,private  router: Router, private servicio: ProveedoresService, private _route:ActivatedRoute, private serviciolog: CrudusuariosService) {
    this.empleadootrolado = JSON.parse(localStorage.getItem("empleado"));
   
   }
  
  ngOnInit() {
    this.empleadoForm = this.pf.group({
      nombre: ['', Validators.required],
      puesto: ['', Validators.required],
      date1: ['', Validators.required],
      date2: ['', Validators.required],
    });
  }

  saveEmpleado(){
    const varsev = {
      empresa: this.empleadoForm.get('nombre').value,
      puesto: this.empleadoForm.get('puesto').value,
      fechaI: this.empleadoForm.get('date1').value,
      fechaF: this.empleadoForm.get('date2').value,
 
    }
    
    return varsev;
  }

  onSubmit(){
    this.empleado = this.saveEmpleado();
  }
  
  fijarfecha(){
    this.date2 = this.empleadoForm.get('date2').value;
    this.date1 = this.empleadoForm.get('date1').value
    
    if(this.date1 < this.date2){
      return this.date2 > this.date1 ? true :false;
    }
  
  }

  agregar(){
    this.empleado = this.saveEmpleado();
    if (this.cont <= 2){
    this.curri[this.cont] = this.empleado;
    console.log(this.curri)
    this.cont = this.cont + 1;
   
  }else{
    console.log("Campos llenos")
  }
}

addd(vari){
  this.servicio.agregar(this.empleadootrolado,this.empleadootrolado.correo, 'empleado');
  this.servicio.agregarr(this.curri,this.empleadootrolado.curp);
  this.serviciolog.agregarUsuario(this.empleadootrolado.correo, this.empleadootrolado.password );
  this.router.navigateByUrl('/login');
}

registrar(){
  this.empleado = this.saveEmpleado();
  this.addd(this.curri);
  console.log("registrado")
}


}
