import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router'

import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { CrudusuariosService } from 'src/app/servicios/crudusuarios.service';
import { FribaseinicializarService } from 'src/app/servicios/fribaseinicializar.service';

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
  db;
  auth;
  datos = {
    equipo: 0,
    resproblemas: 0,
    comunicacion: 0,
    organizacion:0,
    analisis: 0,
    conocimientos:0,
    manejo:0,
    edicion:0,
    marketing:0,
  };
  constructor(private pf: FormBuilder,private  router: Router, private servicio: ProveedoresService, private _route:ActivatedRoute, private serviciolog: CrudusuariosService) {
    this.empleadootrolado = JSON.parse(localStorage.getItem("empleado"));
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;
   }
  
  ngOnInit() {
    this.empleadoForm = this.pf.group({
      nombre: ['', Validators.required],
      puesto: ['', Validators.required],
      date1: ['', Validators.required],
      date2: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  
  saveDatos(){
    const varsev = {
      nombre: this.empleadootrolado.nombre,
      app: this.empleadootrolado.app,
      apm: this.empleadootrolado.apm,
      curp: this.empleadootrolado.curp,
      gestudio: this.empleadootrolado.gestudio,
      titulo: this.empleadootrolado.titulo,
      correo: this.empleadootrolado.correo,
      password: this.empleadootrolado.password,
      telefono: this.empleadootrolado.telefono,
      uni: this.empleadootrolado.uni,
      estado: this.empleadootrolado.estado,
      municipio: this.empleadootrolado.municipio,
      ciudad: this.empleadootrolado.ciudad,
      calle: this.empleadootrolado.calle,
      numext: this.empleadootrolado.numext,
      numint: this.empleadootrolado.numint,
      edad: this.empleadootrolado.edad,
      sexo: this.empleadootrolado.sexo,
      rol: "empleado",
      trabajo: this.datos.equipo,
      resproblemas: this.datos.resproblemas,
      comunicacion: this.datos.comunicacion,
      organizacion: this.datos.organizacion,
      analisis: this.datos.analisis,
      conocimientos: this.datos.conocimientos,
      manejo: this.datos.manejo,
      edicion: this.datos.edicion,
      marketing: this.datos.marketing,
    }
  }
    
  saveEmpleado(){
    const varsev = {
      empresa: this.empleadoForm.get('nombre').value,
      puesto: this.empleadoForm.get('puesto').value,
      fechaI: this.empleadoForm.get('date1').value,
      fechaF: this.empleadoForm.get('date2').value,
      des: this.empleadoForm.get('descripcion').value,
      

    }
    
    return varsev;
  }
  

  prueba(){
    this.empleado = this.saveEmpleado();
    Array.prototype.push(this.empleado, this.datos)
    console.log(this.empleado)
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
  this.servicio.agregarr(this.curri,this.empleadootrolado.curp)
  

  this.serviciolog.agregarUsuario(this.empleadootrolado.correo, this.empleadootrolado.password );
  this.router.navigateByUrl('/login');
}

registrar(){
  this.empleado = this.saveEmpleado();
  this.addd(this.curri);
  console.log("registrado")
}

//-----------------------------------------------------------------------------------
check1(values:any){
  console.log(values.currentTarget.checked);
  if (values.currentTarget.checked == true){
    this.datos.equipo = 1;
  }else{
    this.datos.equipo = 0;
  }
  }
check2(values:any){
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true){
      this.datos.resproblemas = 1;
    }else{
      this.datos.resproblemas = 0;
    }
  }
  check3(values:any){
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true){
      this.datos.comunicacion = 1;
    }else{
      this.datos.comunicacion = 0;
    }
    } 
check4(values:any){
  console.log(values.currentTarget.checked);
  if (values.currentTarget.checked == true){
    this.datos.organizacion = 1;
  }else{
    this.datos.organizacion = 0;
  }
  } 

check5(values:any){
  console.log(values.currentTarget.checked);
  if (values.currentTarget.checked == true){
  this.datos.analisis = 1;
  }else{
  this.datos.analisis = 0;
  }
}
check6(values:any){
  console.log(values.currentTarget.checked);
  if (values.currentTarget.checked == true){
  this.datos.conocimientos = 1;
  }else{
  this.datos.conocimientos = 0;
  }
}
check7(values:any){
  console.log(values.currentTarget.checked);
  if (values.currentTarget.checked == true){
  this.datos.manejo = 1;
  }else{
  this.datos.manejo = 0;
  }
}   

check8(values:any){
  console.log(values.currentTarget.checked);
  if (values.currentTarget.checked == true){
  this.datos.edicion = 1;
  }else{
  this.datos.edicion = 0;
  }
} 
check9(values:any){
  console.log(values.currentTarget.checked);
  if (values.currentTarget.checked == true){
  this.datos.marketing = 1;
  }else{
  this.datos.marketing = 0;
  }
  } 
}
