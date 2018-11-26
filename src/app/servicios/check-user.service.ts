import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {firebase} from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import { FribaseinicializarService } from './fribaseinicializar.service';

@Injectable({
  providedIn: 'root'
})
export class CheckUserService implements CanActivate {

  db;
  profiles;
  constructor(private router: Router) { 
    if(!firebase){
      FribaseinicializarService.inicializar();
    }
    this.db = firebase.firestore();
  }

  canActivate(nect: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    var user = firebase.auth().currentUser;
    if (user) {
      console.log(user.email);
      this.perfil(user.email);
    
    } else {
      this.router.navigateByUrl("login");
    }
    return true;
  }


  perfil(correo) {
    console.log("this"+correo)
    const query = this.db.collection('empleado').doc(correo);
    
    query.get().then(doc=>{

      if (doc.exists) {
        this.profiles = doc.data();
        console.log(this.profiles);
        localStorage.setItem('rol', "empleado");
      
          this.router.navigateByUrl("InicioEmpleado");
          
    } else {
        const query = this.db.collection('empresa').doc(correo);
        query.get().then(doc => {
          this.profiles = doc.data();
          console.log(this.profiles);
          localStorage.setItem('rol', "empresa");
         
          this.router.navigateByUrl("InicioEmpresa");
          
    });
  }
    });
  }
}