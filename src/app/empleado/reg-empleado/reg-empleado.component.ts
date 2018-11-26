import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { CrudusuariosService } from 'src/app/servicios/crudusuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-empleado',
  templateUrl: './reg-empleado.component.html',
  styleUrls: ['./reg-empleado.component.css']
})
export class RegEmpleadoComponent implements OnInit {
  empleadoForm: FormGroup;
  empleado: any;
  password: string;
  cpassword: string;
  resul: boolean = true;
  valor: boolean;

  todos: string[] =[ 'Aguascalientes', 'Chihuahua','Baja California', 'Baja california sur',
  'Sonora', 'Sinaloa', 'Nayarit', 'Jalisco', 'Colima', 'Guerrero',
  'Oaxaca', 'Chiapas', 'Quintana Roo', 'Yucatan','Campeche',
  'Veracruz', 'Tabasco', 'Puebla', 'Tlaxcala', 'Ciudad de México',
  'Estado de México', 'Queretaro', 'Zacatecas', 'Nuevo Leon', 'Tamaulipas',
  'Coahuila','Durango', 'San Luis Potosi', 'Michoacán', 'Guanajuato',
  'Hidalgo','Morelos']

  constructor(private pf: FormBuilder,private router: Router, private servicio: ProveedoresService, private serviciolog: CrudusuariosService ) { }
  onChanges(){
   
  }
  ngOnInit() {

    this.empleadoForm = this.pf.group({
      nombre: ['', Validators.required],
      app: ['', Validators.required],
      apm: ['', Validators.required],
      gestudio: ['', Validators.required],
      titulo: ['', Validators.required],
      curp: ['',[Validators.required, Validators.maxLength(18), Validators.minLength(18)]],
      correo: ['', [Validators.required,Validators.email]],
      pass: ['', Validators.required],
      telefono: ['', Validators.required],
      uni: ['', Validators.required],
      municipio: ['', Validators.required],
      ciudad: ['', Validators.required],
      calle: ['', Validators.required],
      numext: ['', Validators.required],
      numint: ['', Validators.required],
      estado: ['', Validators.required],
      edad: ['', Validators.required],

     
    
    });
     this.onChanges();
  }


  confirmacion(){
    const frm = this.empleadoForm.value;
    if(frm.pass == frm.cpass){
      this.resul = false;
      return this.resul;
    }else{
      this.resul = true;
      return this.resul;
    }
  }

  agregar(vari, correo){
    console.log('ES EL PASSWORD  '+this.empleadoForm.get('pass').value);
    this.servicio.agregar(vari,correo, 'empleado');
    this.serviciolog.agregarUsuario(correo, this.empleadoForm.get('pass').value )
  }

  saveEmpleado(){
    const varsev = {
      nombre: this.empleadoForm.get('nombre').value,
      app: this.empleadoForm.get('app').value,
      apm: this.empleadoForm.get('apm').value,
      curp: this.empleadoForm.get('curp').value,
      gestudio: this.empleadoForm.get('gestudio').value,
      titulo: this.empleadoForm.get('titulo').value,
      correo: this.empleadoForm.get('correo').value,
      password: this.empleadoForm.get('pass').value,
      telefono: this.empleadoForm.get('telefono').value,
      uni: this.empleadoForm.get('uni').value,
      estado: this.empleadoForm.get('estado').value,
      municipio: this.empleadoForm.get('municipio').value,
      ciudad: this.empleadoForm.get('ciudad').value,
      calle: this.empleadoForm.get('calle').value,
      numext: this.empleadoForm.get('numext').value,
      numint: this.empleadoForm.get('numint').value,
      edad: this.empleadoForm.get('edad').value,
      rol: "empleado"
     
     
      
    }
    console.log(varsev);
    return varsev;
  }

  EMP(){
    this.valor = this.ValidateEmail(this.empleadoForm.get('correo').value);
    console.log(this.valor)
     if (this.valor == true){
      console.log(this.valor)
    this.empleado = this.saveEmpleado();
    localStorage.setItem("empleado", JSON.stringify(this.empleado));
    //this.agregar(this.empleado, this.empleado.correo);
    this.router.navigateByUrl('/curriculum');
  }
    else {
      alert('El correo no es valido, Favor de corregir')
    }

  }
  

  checar(){
    this.valor = this.ValidateEmail(this.empleadoForm.get('correo').value);
    if (this.valor == true){

    }else{
      alert('El correo no es valido, Favor de corregir')
      

    }
  }

  ValidateEmail(email: String) {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email.toString())) {
      return (true);
    }
      return (false);
  }
  onSubmit(){
    this.empleado = this.saveEmpleado();
    localStorage.setItem("empleado", JSON.stringify(this.empleado));
  }

}
