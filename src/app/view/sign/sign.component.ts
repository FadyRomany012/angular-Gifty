import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {User} from "../../interfaces/user"
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  error=""
createAccountForm = new FormGroup({
  name:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z]/)]),
  email:new FormControl('',[Validators.required,Validators.email]),
  pass:new FormControl('',[Validators.required,Validators.minLength(6)])
})
  constructor(private _Title:Title,
    private _AuthService:AuthService,
    private _UserService:UserService,
    private _Router:Router) { 
    this._Title.setTitle("create account")
  }

  ngOnInit() {
  }
sign(form) {
  let data:User = form.value
 this._AuthService.sign(data.email,data.pass)
 .then(done=> {
   this.error=""
   this._UserService.addUser(data.name,done.user.uid)
   .then(() => this._Router.navigate(["/home"]))
 })
 .catch(err => this.error = err.message)
}
}
