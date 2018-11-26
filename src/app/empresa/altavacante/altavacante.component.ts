import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { FribaseinicializarService } from 'src/app/servicios/fribaseinicializar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-altavacante',
  templateUrl: './altavacante.component.html',
  styleUrls: ['./altavacante.component.css']
})
export class AltavacanteComponent implements OnInit {
  res = [];
  vacanteForm: FormGroup;
  vacante: any;
  base: any;
  edad;
  sexo;
  gradoe;
  tipo: any;
  iva: any = 0;
  total: any = 0;
  viva: any;
  usuario;
  var_json;
  db;
  user;
  profiles;
  sujerencias = [];
  buenos = [];
  auth;
  correo;
  puntos: number = 0;
  cont: number = 0;
  
  
  
    constructor(private pf: FormBuilder, private servicio: ProveedoresService, private router: Router) {
    this.consultar()
   
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;

      this.usuario = localStorage.getItem('correo');
   
      this.perfil(this.usuario)  
      this.perfiles();
    }


    

    perfil(correo) {

      const query = this.db.collection('empresa').doc(correo); 
       query.get().then(querySnap => {
            this.profiles = querySnap.data();
        
      });
    }
    onChanges(){
      this.vacanteForm.get('base').valueChanges.subscribe(valor=>{
        this.base = this.vacanteForm.get('base').value;
        this.tipo = this.vacanteForm.get('tipo').value;
        this.viva = this.base*this.tipo;
        this.total = +this.base+ this.viva;
        this.vacanteForm.get('iva').setValue(+this.viva);
        this.vacanteForm.get('total').setValue(+this.total);
      });
      this.vacanteForm.get('tipo').valueChanges.subscribe(valor=>{
        this.base = this.vacanteForm.get('base').value;
        this.tipo = this.vacanteForm.get('tipo').value;
        this.viva = this.base*this.tipo;
        this.total = +this.base+ this.viva;
        this.vacanteForm.get('iva').setValue(+this.viva);
        this.vacanteForm.get('total').setValue(+this.total);
      });
      
    }
  
    ngOnInit() {
      
      this.vacanteForm = this.pf.group({
        puesto: ['', Validators.required],
        sexo: ['', Validators.required],
        salario: ['', [Validators.required, Validators.maxLength(10)]],
        experiencia: ['', Validators.required],
        esc: ['', Validators.required],
        edad: ['', Validators.required],
        seguro: ['', Validators.required],      
        cantidad:['',Validators.required]
      
      });
      //this.onChanges();
    }
  
    consultar(){
      
      this.servicio.vacantes();
      //this.res = this.servicio.dato.data();
      //console.log(this.res);
   
    }
    
    prueba(){
      
      this.res = this.servicio.dato;
 
    }
  
    savePresupuesto(){
      const savePresupuesto = {
        puesto: this.vacanteForm.get('puesto').value,
        cantidad: this.vacanteForm.get('cantidad').value,
        salario: this.vacanteForm.get('salario').value,
        sexo: this.vacanteForm.get('sexo').value,
        experiencia: this.vacanteForm.get('experiencia').value,
        esc: this.vacanteForm.get('esc').value,
        edad: this.vacanteForm.get('edad').value,
        seguro: this.vacanteForm.get('seguro').value,
        nombre: this.profiles.nombre, 
        correo: this.usuario,        
      }
      return savePresupuesto;
    }

    

    EMP(){
      this.vacante = this.savePresupuesto(); 
      this.agregar(this.vacante, this.vacante.puesto);
      this.checar();
      
    }



    agregar(vari,ID){
      

      this.servicio.agregarv(vari, this.usuario, ID);
      
    }
    onSubmit(){
      this.vacante = this.savePresupuesto();
    }
  

  perfiles(){
      this.cont = 0;
      const query = this.db.collection('empleado'); 
      query.get().then(querySnap => {
        querySnap.forEach(element => {
          this.sujerencias[this.cont] = element.data();
        
          this.cont = this.cont + 1;
      });
    });
  }

  checar(){
    console.log(this.vacante.edad.substring(0,2))
    console.log(this.vacante.edad.substring(3,5))
    this.sujerencias.forEach(element => {
      this.puntos = 0;
        console.log("si entra")
        if((this.vacante.esc == element.gestudio ) || (element.gestudio == "Licenciatura" )|| (element.gestudio == "Doctorado" ) || (element.gestudio == "Maestria" )){
          this.puntos = this.puntos + 1;
          this.gradoe = "SI";
          console.log("punto gestudio")
        }
        if(this.vacante.sexo == 'Indistinto'){
          this.puntos = this.puntos + 1;
          this.sexo = "SI";
          console.log("punto sexo indistinto")
        }else if(this.vacante.sexo == element.sexo){
          this.puntos = this.puntos + 1;
          console.log("punto sexo")
          this.sexo = "SI";
        }
        if(this.vacante.edad.substring(0,2) <= element.edad && this.vacante.edad.substring(3,5) >= element.edad){
          this.puntos = this.puntos + 1;
          console.log("punto edad")
          this.edad = "SI";
        }
        if(this.puntos >= 2){
            const svu = {
              nombre: element.nombre +" "+ element.app +" "+element.apm,
              edad: this.edad,
              sexo: this.sexo,
              gestudio: this.gradoe,
              puesto: this.vacante.puesto,
              correo: element.correo,
              estatus: "activo",
            }
           

              this.db.collection('sujerencias').doc(this.usuario).collection('sujerencias').add(svu)
              .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
                 })
              .catch(function(error) {
                console.error("Error adding document: ", error);
                });
 
            console.log('ya lo creo');
        }
        console.log(this.puntos);
    });
  }
  

}
