import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})  
export class AutenticacionService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(nect: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    try{
      let token =  localStorage.getItem('token');
      let rol = localStorage.getItem('rol')
      token = atob(token.split('.')[1]);
      token = JSON.parse(token);
      if (token => Date.now()/1000000){
         if(rol == "empresa"){
          return true;
        }else{
          this.router.navigateByUrl('/curri');
          return false;
        }
        
      }
    }catch{
    }
    this.router.navigateByUrl('/#');
    return false;
  }
}
