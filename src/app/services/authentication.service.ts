import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Login } from '../interfaces/authentification/login';
import { Register } from '../interfaces/authentification/register';
import { ResetPassword } from '../interfaces/authentification/resetPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http:HttpClient) { }
 httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  urlApi=`${environment.apiURL}/api/Authentification`;

  getData():Observable<any[]>{
    return this.http.get<any>(this.urlApi); 
  }
  logIn(login:Login):Observable<any>{
    return this.http.post<any>(`${this.urlApi}/Login`,login,this.httpOptions);
  }
  resetPassword(email:ResetPassword):Observable<any>{
    return this.http.post<any>(`${this.urlApi}/ForgotPassword`,email,this.httpOptions);
  }
}
