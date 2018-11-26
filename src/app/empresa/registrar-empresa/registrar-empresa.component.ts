import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { NgForm } from '@angular/forms';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { CrudusuariosService } from 'src/app/servicios/crudusuarios.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrar-empresa',
  templateUrl: './registrar-empresa.component.html',
  styleUrls: ['./registrar-empresa.component.css']
})
export class RegistrarEmpresaComponent implements OnInit {
  @ViewChild('formEmpresa') formEmpresa: NgForm;
  empresaForm: FormGroup;
  empresa: any;
  password: string;
  cpassword: string;
  resul: boolean = true;
  estado;
  categoria: string[]= ["dato1", "dato2", "dato3"];

  ligas: {
    nombre: "Tres Garantias",
      torneo:[{
        nombre:"apertura 2018",
        categoria:"masculina"
    }]
  }

  todos: string[] =[ 'Aguascalientes', 'Chihuahua','Baja California', 'Baja california sur',
  'Sonora', 'Sinaloa', 'Nayarit', 'Jalisco', 'Colima', 'Guerrero',
  'Oaxaca', 'Chiapas', 'Quintana Roo', 'Yucatan','Campeche',
  'Veracruz', 'Tabasco', 'Puebla', 'Tlaxcala', 'Ciudad de México',
  'Estado de México', 'Queretaro', 'Zacatecas', 'Nuevo Leon', 'Tamaulipas',
  'Coahuila','Durango', 'San Luis Potosi', 'Michoacán', 'Guanajuato',
  'Hidalgo','Morelos']
  valor: boolean;

  constructor(private pf: FormBuilder,private router: Router, private servicio: ProveedoresService, private serviciolog: CrudusuariosService) { }

  ngOnInit() {

    this.empresaForm = this.pf.group({
      nombre: ['', Validators.required],
      correo:['', [Validators.required, Validators.email]],
      pass:['', Validators.required],
      rfc:['', Validators.required],
      rs:['', Validators.required],
      contacto:['', Validators.required],
      descripcion:['',Validators.required],
      estado:['', Validators.required],
      municipio:['', Validators.required],
      ciudad:['', Validators.required],
      calle:['', Validators.required],
      numext:['', Validators.required],
      numint:['', Validators.required],
    
    });

  }

  checar(){
    this.valor = this.ValidateEmail(this.empresaForm.get('correo').value);
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

  capturar() {
    console.log(this.estado);
  }
  saveEmpleado(){
    const savePresupuesto = {
      nombre: this.empresaForm.get('nombre').value,
      correo: this.empresaForm.get('correo').value,
      pass: this.empresaForm.get('pass').value,
      rfc: this.empresaForm.get('rfc').value,
      rs: this.empresaForm.get('rs').value,
      contacto: this.empresaForm.get('contacto').value,
      descripcion: this.empresaForm.get('descripcion').value,
      estado: this.empresaForm.get('estado').value,
      municipio: this.empresaForm.get('municipio').value,
      ciudad: this.empresaForm.get('ciudad').value,
      calle: this.empresaForm.get('calle').value,
      numext: this.empresaForm.get('numext').value,
      numint: this.empresaForm.get('numint').value,
      rol: "empresa",

    }
    return savePresupuesto;  
  }

  

  EMP(){
    this.valor = this.ValidateEmail(this.empresaForm.get('correo').value);
  
     if (this.valor == true){
    this.empresa = this.saveEmpleado(); 
    console.log(this.empresa.prueba);
    this.agregar(this.empresa, this.empresa.correo);}else{
      alert('El correo no es valido, Favor de corregir')
    }
  }

  agregar(vari, id){
    this.servicio.agregar(vari,id, 'empresa');
    this.serviciolog.agregarUsuario(this.empresa.correo, this.empresa.pass );
    this.router.navigateByUrl("login");
  }

  onSubmit(){
    
    this.empresa = this.saveEmpleado();
  }
}
