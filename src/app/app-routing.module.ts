import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/authentification/login/login.component';
import { RegiserComponent } from './components/authentification/regiser/regiser.component';
import { NotFoundError } from 'rxjs';
import { ResetPasswordComponent } from './components/authentification/reset-password/reset-password.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent,title:"Login"},
  {path:"register",component:RegiserComponent,title:"Register"},
  {path:"resetPassword",component:ResetPasswordComponent,title:"Reset Password"},
  {path:"dashboard",component:DashboardComponent,title:"Dashboard"},
  {path:"**",component:PageNotFoundComponent,title:"404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
