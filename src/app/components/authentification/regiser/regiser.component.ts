import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/interfaces/authentification/login';
import { Register } from 'src/app/interfaces/authentification/register';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-regiser',
  templateUrl: './regiser.component.html',
  styleUrls: ['./regiser.component.css']
})
export class RegiserComponent implements OnInit {

  regiser: Register = {} as Register;
  registerForm!: FormGroup;
  formSubmitted: boolean = false;
  constructor(private fb: FormBuilder,
    private http: AuthenticationService,
    private router: Router,
    private toaster: ToastrService
  ) { }
  ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['ConfirmPasswordValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ ConfirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  };
  builForm() {
    this.registerForm = this.fb.group({
      userName: [this.regiser.userName, [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{4,12}$')]],
      email: [this.regiser.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [this.regiser.password, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: this.ConfirmPasswordValidator('password', 'confirmPassword')
      });
  }
  ngOnInit() {
    this.builForm();
  }
  get userName() {
    return this.registerForm.get("userName")!;
  }
  get email() {
    return this.registerForm.get("email")!;
  }
  get password() {
    return this.registerForm.get("password")!;
  }
  get confirmPassword() {
    return this.registerForm.get("confirmPassword")!;
  }
  userNameErrorMessage() {
    return this.userName.hasError('required') ? 'Username is required'
      : (this.userName.hasError('pattern') && this.formSubmitted) ? 'Username must be of 4 to 12 lenght with no special characters.'
        : '';
  }
  emailErrorMessage() {
    return this.email.hasError('required') ? 'Email is required'
      : (this.email.hasError('pattern')) ? 'Please enter a valid email address.'
        : '';
  }
  passwordErrorMessage() {
    return this.password.hasError('required') ? 'Password is required'
      : this.password.hasError('min') ? 'Password must be at least 8 characters'
        : (this.password.hasError('pattern') && this.formSubmitted) ? 'Password must contain at least' +
          '1 lowercase letter, 1 capital letter, 1 number, and 1 special characters.'
          : '';
  }
  confirmPasswordErrorMessage() {
    return this.confirmPassword.hasError('required') ? 'Confirm Password is required'
      : this.confirmPassword.hasError('ConfirmPasswordValidator') ? 'Password and Confirm Password do not match.'
        : '';
  }
  onSumbit() {
    this.formSubmitted = true,
      this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      let login!: Login;
      login = this.registerForm.value;
      this.http.logIn(login).subscribe({
        next: (response) => {
          this.toaster.success('Your accoutn has been successfully created.Please login to continue.','Congratulation!')
          //this.router.navigate(['/login']);
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


