import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-addcurriculum',
  templateUrl: './addcurriculum.component.html',
  styleUrls: ['./addcurriculum.component.css']
})
export class AddcurriculumComponent implements OnInit  {
  curriculumForm: FormGroup;
  curriculum: any;
  fecha_l: any;
  fecha_f: any;
  iva: any = 0;
  total: any = 0;
  viva: any;
  constructor(private pf: FormBuilder, private servicio: ProveedoresService ) { }

  ngOnInit() {
    this.curriculumForm = this.pf.group({
      curp: ['', Validators.required],
      puesto: ['', Validators.required],
      fecha_l: ['', Validators.required],
      fecha_f: ['', Validators.required],
    });
    //this.onChanges();
  }

 

  saveCurri(){
    const saveCurri = {
     curp: this.curriculumForm.get('curp').value,
     puesto: this.curriculumForm.get('puesto').value,
     fechaI: this.curriculumForm.get('fecha_l').value,
     fechaF: this.curriculumForm.get('fecha_f').value,
      
    }
    return saveCurri;
  }

  EMP(){
    console.log("entro");
    this.curriculum = this.saveCurri();
    this.agregar(this.curriculum, this.curriculum.curp)
    //this.agregar(this.empleado, this.empleado.correo);
  }  

  agregar(vari, curp){
    console.log("entro");
    this.servicio.addcurri(vari,curp);
  } 
  onSubmit(){
    this.curriculum = this.saveCurri();
  }

}
