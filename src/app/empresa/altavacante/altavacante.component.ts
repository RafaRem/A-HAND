import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { FribaseinicializarService } from 'src/app/servicios/fribaseinicializar.service';
import { Router } from '@angular/router';
import { element } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-altavacante',
  templateUrl: './altavacante.component.html',
  styleUrls: ['./altavacante.component.css']
})
export class AltavacanteComponent implements OnInit {
 
  vacanteForm: FormGroup;
  vacante: any;
  base: any;
  edad;
  sexo;
  gradoe;
  usuario;
  var_json;
  db;
  user;
  curri ;
  colecta;
  conth:number = 3;
  profiles;
  sujerencias = [];
  buenos = [];
  auth;
  correo;
  hab = [];
  puntos: number = 0;
  cont: number = 0;
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
  habilidad = {
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
     
      const query = this.db.collection('curriculum').doc('REQE970126HJCMND02').collection('curriculum'); 
      query.get().then(querySnap => {
      querySnap.forEach(element => {
      this.curri = element.data();
      alert('entro primero a contar')
        if((this.curri.equipo  == 1) && (this.curri.equipo == this.datos.equipo)){
          this.puntos  = this.puntos +1;
          console.log(this.puntos);
        }
        if((this.curri.resproblemas== 1) && (this.curri.resproblemas == this.datos.resproblemas)){
          this.puntos  = this.puntos +1;
          console.log(this.puntos);
        } 
        if((this.curri.comunicacion == 1) && (this.curri.comunicacion == this.datos.comunicacion)){
          this.puntos  = this.puntos +1;
          console.log(this.puntos);
        } 
        if((this.curri.organizacion== 1) && (this.curri.resproblemas == this.datos.organizacion)){
          this.puntos  = this.puntos +1;
          console.log(this.puntos);
        }
        if((this.curri.analisis== 1) && (this.curri.analisis == this.datos.analisis)){
          this.puntos  = this.puntos +1;
          console.log(this.puntos);
        }  
        if((this.curri.conocimientos== 1) && (this.curri.conocimientos == this.datos.conocimientos)){
          this.puntos  = this.puntos +1;
          console.log(this.puntos);
        } 
        if((this.curri.manejo== 1) && (this.curri.manejo == this.datos.manejo)){
          this.puntos  = this.puntos +1;
          console.log(this.puntos);
        } 
        if((this.curri.edicion== 1) && (this.curri.edicion == this.datos.edicion)){
          this.puntos  = this.puntos +1;
          console.log(this.puntos);
        } 
        if((this.curri.marketing== 1) && (this.curri.resproblemas == this.datos.marketing)){
          this.puntos  = this.puntos +1;
          console.log(this.puntos);
          
        } 
      
  });
  if(this.puntos >= this.conth){
    alert('entro primero a registrar')
    console.log("si exiten sugerencias")
      const svu = {
        nombre: "Edgar Rafael Rembao Quintero",
        edad: this.edad,
        sexo: this.sexo,
        gestudio: this.gradoe,
        puesto: this.vacante.puesto,
        correo: "edgarembao@hotmail.com",
        estatus: "activo",
      }
    

        this.db.collection('sujerencias').doc(this.usuario).collection('sujerencias').add(svu)
        .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
          })
        .catch(function(error) {
          console.error("Error adding document: ", error);
          });

      console.log('ya creo la sujerencia');
  }
});

    
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
    
      for(var i = 0;i<this.sujerencias.length;i++){
        const element = this.sujerencias[i];
        const curp = element.curp
        console.log('es la curp')
        console.log(curp)
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

          //--------------------------------------------------------------------------------------
         
          alert('entro primero a contar')
            if((this.curri.equipo  == 1) && (this.curri.equipo == this.datos.equipo)){
              this.puntos  = this.puntos +1;
              console.log(this.puntos);
            }
            if((this.curri.resproblemas== 1) && (this.curri.resproblemas == this.datos.resproblemas)){
              this.puntos  = this.puntos +1;
              console.log(this.puntos);
            } 
            if((this.curri.comunicacion == 1) && (this.curri.comunicacion == this.datos.comunicacion)){
              this.puntos  = this.puntos +1;
              console.log(this.puntos);
            } 
            if((this.curri.organizacion== 1) && (this.curri.resproblemas == this.datos.organizacion)){
              this.puntos  = this.puntos +1;
              console.log(this.puntos);
            }
            if((this.curri.analisis== 1) && (this.curri.analisis == this.datos.analisis)){
              this.puntos  = this.puntos +1;
              console.log(this.puntos);
            }  
            if((this.curri.conocimientos== 1) && (this.curri.conocimientos == this.datos.conocimientos)){
              this.puntos  = this.puntos +1;
              console.log(this.puntos);
            } 
            if((this.curri.manejo== 1) && (this.curri.manejo == this.datos.manejo)){
              this.puntos  = this.puntos +1;
              console.log(this.puntos);
            } 
            if((this.curri.edicion== 1) && (this.curri.edicion == this.datos.edicion)){
              this.puntos  = this.puntos +1;
              console.log(this.puntos);
            } 
            if((this.curri.marketing== 1) && (this.curri.resproblemas == this.datos.marketing)){
              this.puntos  = this.puntos +1;
              console.log(this.puntos);
              
            } 
          
    
              if(this.puntos >= this.conth){
              alert('entro primero a registrar')
              console.log("si exiten sugerencias")
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

          console.log('ya creo la sujerencia');
      }
 
          //--------------------------------------------------------------------------------------
          
         
          console.log(this.puntos);
      };
    }
//-----------------------------------------------------------------------------
  check1(values:any){
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true){
      this.datos.equipo = 1;
      this.conth = this.conth + 1
    }else{
      this.datos.equipo = 0;
      this.conth = this.conth - 1
    }
    }
  check2(values:any){
      console.log(values.currentTarget.checked);
      if (values.currentTarget.checked == true){
        this.datos.resproblemas = 1;
        this.conth = this.conth + 1
      }else{
        this.datos.resproblemas = 0;
        this.conth = this.conth - 1
      }
    }
    check3(values:any){
      console.log(values.currentTarget.checked);
      if (values.currentTarget.checked == true){
        this.datos.comunicacion = 1;
        this.conth = this.conth + 1
      }else{
        this.datos.comunicacion = 0;
        this.conth = this.conth - 1
      }
      } 
  check4(values:any){
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true){
      this.datos.organizacion = 1;
      this.conth = this.conth + 1
    }else{
      this.datos.organizacion = 0;
      this.conth = this.conth - 1
    }
    } 
  
  check5(values:any){
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true){
    this.datos.analisis = 1;
    this.conth = this.conth + 1
    }else{
    this.datos.analisis = 0;
    this.conth = this.conth - 1
    }
  }
  check6(values:any){
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true){
    this.datos.conocimientos = 1;
    this.conth = this.conth + 1
    }else{
    this.datos.conocimientos = 0;
    this.conth = this.conth - 1
    }
  }
  check7(values:any){
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true){
    this.datos.manejo = 1;
    this.conth = this.conth + 1
    }else{
    this.datos.manejo = 0;
    this.conth = this.conth - 1
    }
  }   
  
  check8(values:any){
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true){
    this.datos.edicion = 1;
    this.conth = this.conth + 1
    }else{
    this.datos.edicion = 0;
    this.conth = this.conth - 1
    }
  } 
  check9(values:any){
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true){
    this.datos.marketing = 1;
    this.conth = this.conth + 1
    }else{
    this.datos.marketing = 0;
    this.conth = this.conth - 1
    }
    } 

}
