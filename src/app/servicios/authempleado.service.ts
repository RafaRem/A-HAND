import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import {firebase} from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import { FribaseinicializarService } from './fribaseinicializar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthempleadoService implements CanActivate {
  constructor(private router: Router) { }

  canActivate(nect: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    try{
      let token =  localStorage.getItem('token');
      let rol = localStorage.getItem('rol')
      token = atob(token.split('.')[1]);
      token = JSON.parse(token);
      if (token => Date.now()/10000){
        if(rol == "empleado"){
          return true;
        }else{
          this.router.navigateByUrl('/addcurri');
          return false;
        }
        
      }
    }catch{
    }
    this.router.navigateByUrl('/#');
    return false;
  }
  }



