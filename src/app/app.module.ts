import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

 
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/authentification/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { RegiserComponent } from './components/authentification/regiser/regiser.component';
import { ResetPasswordComponent } from './components/authentification/reset-password/reset-password.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegiserComponent,
    ResetPasswordComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  
    ToastrModule.forRoot({
      preventDuplicates:true
    }), 
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule ,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
