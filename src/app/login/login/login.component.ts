import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { CrudusuariosService } from 'src/app/servicios/crudusuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {firebase} from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import { PerfilEmpleadoComponent } from 'src/app/empleado/perfil-empleado/perfil-empleado.component';
import { FribaseinicializarService } from 'src/app/servicios/fribaseinicializar.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  yestoken: string;
  password: string;
  public static equis;
  db;
  auth;
  profiles;
  public static correo;
  i: boolean = true;
  public loginform: FormGroup;

  constructor(private router: Router) {
    this.yestoken = "";
    if (!FribaseinicializarService.auth || !FribaseinicializarService.db){
      FribaseinicializarService.inicializar();
    }
    this.db = FribaseinicializarService.db;
    this.auth = FribaseinicializarService.auth;
    
  }
  ngOnInit() {
    
  }
  perfil(correo) {
    
    const query = this.db.collection('empleado').doc(correo); 
     query.get().then(querySnap => {
          this.profiles = querySnap.data();
          console.log('rol  '+ this.profiles.rol);
    });
  }
 

  public iniciar(){
    
  }

  public registrese(){
  
    this.agregarUsuario(this.email, this.password)
    
  }

  public iniciarSecion(){
  
    console.log("este es el correo " +this.email);
    console.log("este es el pass " +this.password);
    this.iniciarSesion(this.email, this.password);
  
  }

  agregarUsuario(email: string, password: string){
    this.auth.createUserWithEmailAndPassword(email, password).catch(
      function(error){
    }); 
   }

   iniciarSesion(email:string, password:string){
       this.auth.signOut().then(function(){
       console.log("Se cerro la sesion");
     }).catch(function(error){});

     this.auth.signInWithEmailAndPassword(email, password).then(
       response=> {
         this.auth.currentUser.getIdToken().then(function(jsonwebtoken){
            localStorage.setItem('token', jsonwebtoken);
            localStorage.setItem('correo', FribaseinicializarService.auth.currentUser.email);
            
          });
          this.router.navigateByUrl('sabe');
       }
     ).catch (error => console.log(error));



    }

    public static nex(correo){
      console.log(correo)
      console.log("fuera: "+ this.equis);
      
    }
 

  loginUser(e){

  }


  

}
