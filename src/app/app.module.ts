import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { NavComponent } from './view/nav/nav.component';
import { KidsComponent } from './view/kids/kids.component';
import { NotfoundComponent } from './view/notfound/notfound.component';
import { LoginComponent } from './view/login/login.component';
import { SignComponent } from './view/sign/sign.component';
import { ElectronicComponent } from './view/electronic/electronic.component';
import { CadburyComponent } from './view/cadbury/cadbury.component';
import { CartComponent } from './view/cart/cart.component';
import { ToysComponent } from './view/toys/toys.component';
import { ProductDetailsComponent } from './view/product-details/product-details.component';
import { AdminComponent } from './view/admin/admin.component';

import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms"
import { RouterModule } from '@angular/router';



import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from "@angular/fire/auth";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireStorageModule} from "@angular/fire/storage"

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    KidsComponent,
    NotfoundComponent,
    LoginComponent,
    SignComponent,
    ElectronicComponent,
    CadburyComponent,
    CartComponent,
    ToysComponent,
    ProductDetailsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
     AngularFireModule.initializeApp( {
      apiKey: "AIzaSyAVcz-PeZz1_y1x7uPn2UnnknYxaWH0oz0",
      authDomain: "thegiftery-bfeaa.firebaseapp.com",
      databaseURL: "https://thegiftery-bfeaa.firebaseio.com",
      projectId: "thegiftery-bfeaa",
      storageBucket: "thegiftery-bfeaa.appspot.com",
      messagingSenderId: "632406993731",
      appId: "1:632406993731:web:addd943dc159312ad4ddf6",
      measurementId: "G-V620V69RF3"
    }),     
    NgbModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule, 
    MatPaginatorModule,
    FormsModule,
    AngularFireStorageModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
