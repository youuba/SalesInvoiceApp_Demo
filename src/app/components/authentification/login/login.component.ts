import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/interfaces/authentification/login';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login = {} as Login;
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private http: AuthenticationService,
    private router: Router,
    private toaster: ToastrService
    //private authService: AuthService
  ) { }
  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    return this.loginForm = this.fb.group({
      email: [this.login.email, Validators.required],
      password: [this.login.password, Validators.required]
    });
  }
  get email() {
    return this.loginForm.get("email")!;
  }
  get password() {
    return this.loginForm.get("password")!;
  }
  emailErrorMessage() {
    return this.email.hasError('required') ? 'Email is required'
      : '';
  }
  passwordErrorMessage() {
    return this.password.hasError('required') ? 'Password is required'
      : '';
  }
  onSumbit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      let login: Login = this.loginForm.value;
      this.http.logIn(login).subscribe({
        next: (response) => {
          this.router.navigate(['dashboard']);
          //console.log(response);
        },
        error: (error) => {
          if (error.status === 401) {
            this.toaster.error('Invalid Username or Password', 'Error')
          }
          else {
            this.toaster.error('something went wrong. Please try again later', 'Error');
            //console.log(JSON.stringify(error));
          }
        }
      });
    }
  }
}
