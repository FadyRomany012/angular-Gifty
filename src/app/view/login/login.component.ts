import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error=""
LoginForm = new FormGroup({
  email:new FormControl('',Validators.required),
  pass:new FormControl('',Validators.required)
})
  constructor(private _Title:Title,
    private _AuthService:AuthService,
    private _Router:Router) { 
    this._Title.setTitle("Login")
  }

  ngOnInit() {
  }
log(form) {
  let data:User= form.value
this._AuthService.login(data.email,data.pass)
.then(() => {
  this.error=""
this._Router.navigate(["/home"])
})
.catch(err => this.error=err.message)
}

}
 