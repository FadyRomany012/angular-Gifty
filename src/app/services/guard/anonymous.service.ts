import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AnonymousService implements CanActivate {

  constructor(private _AuthService:AuthService,
    private _Router:Router) { }
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Promise<boolean> {
     return new Promise(resolve => {
         this._AuthService.user.subscribe(data => {
           if (data) resolve(true)
           else{
             resolve(false)
             this._Router.navigate(["/home"])
           }
         })
     })
  }
}
