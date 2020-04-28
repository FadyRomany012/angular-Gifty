import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit  {
  openNav:boolean=false
 
  user=false
  userName=null
  cartLength
  constructor(public _AuthService:AuthService,
    private _Router:Router,
    private _CartService:CartService,
    private _UserService:UserService) { }
    
  ngOnInit() {
  this._AuthService.user.subscribe(data => {
     if(data) {
   this.user=true;
   this._AuthService.userId=data.uid
   this._UserService.getUserName(data.uid).subscribe(name =>{
    this.userName=name
    this._AuthService.username=name
   })
   this._CartService.getCartLength().subscribe(data => this.cartLength=data.length)
   
   console.log(data)

     }
     else {
      this.user=false;
      this._AuthService.userId=""
      this.userName=""    
      this._AuthService.username=""
      console.log(data)
     }
   })

  }
  opennav() {
    this.openNav=!this.openNav 
  }

  logOut() {
    this._AuthService.logout().then(() => this._Router.navigate(["/home"]))
   
 
  
  }

}
