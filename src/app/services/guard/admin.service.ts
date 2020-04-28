import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate {
adminn
  constructor(private _UserService:UserService,
    private _Router:Router,
    private _Auth:AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean> {
    return new Promise(resolve => {
      this._Auth.user.subscribe(user => {
        if (user) {
          this._UserService.getUserName(this._Auth.userId).subscribe(data => {
            this.adminn = data
            if (this.adminn.admin) resolve(true)
            else {
              this._Router.navigate(["/home"])
              resolve(false)
            }
          })
        }
      })
   
    })
  
  } 
}
