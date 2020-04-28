import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { SignComponent } from './view/sign/sign.component';
import { NotfoundComponent } from './view/notfound/notfound.component';
import { CartComponent } from './view/cart/cart.component';
import { KidsComponent } from './view/kids/kids.component';
import { CadburyComponent } from './view/cadbury/cadbury.component';
import { ElectronicComponent } from './view/electronic/electronic.component';
import { ProductDetailsComponent } from './view/product-details/product-details.component';
import { ToysComponent } from './view/toys/toys.component';
import { AdminComponent } from './view/admin/admin.component';
import {UserService} from "src/app/services/guard/user.service"
import { AnonymousService } from './services/guard/anonymous.service';
import { AdminService } from './services/guard/admin.service';
import { CartProtectService } from './services/guard/cart-protect.service';
const routes: Routes = [
  
    {path:"home",component:HomeComponent},
    {path:"",redirectTo:"/home",pathMatch:"full"},
    {path:"login",component:LoginComponent,canActivate:[UserService]},
    {path:"sign",component:SignComponent,canActivate:[UserService]},
    {path:"cart",component:CartComponent,canActivate:[AnonymousService,CartProtectService]},
    {path:"kids",component:KidsComponent},
    {path:"toys",component:ToysComponent},
    {path:"electronics",component:ElectronicComponent},
    {path:"cadbury",component:CadburyComponent},
    {path:"admin",component:AdminComponent,canActivate:[AnonymousService,AdminService]},
    {path:"productdetails/:n",component:ProductDetailsComponent},
    {path:"**",component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
