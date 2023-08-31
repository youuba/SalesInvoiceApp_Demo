import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPassword } from 'src/app/interfaces/authentification/resetPassword';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPassword: ResetPassword = {} as ResetPassword;
  resetPasswordForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private http: AuthenticationService,
    private router: Router,
    private toaster: ToastrService
  ) { }
  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    return this.resetPasswordForm = this.fb.group({
      email: [this.resetPassword.email, Validators.required]
    });
  };
  get email() {
    return this.resetPasswordForm.get("email")!;
  }
  emailErrorMessage() {
    return this.email.hasError('required') ? 'Email is required'
      : '';
  }
  onSumbit() {
    this.resetPasswordForm.markAllAsTouched();
    if (this.resetPasswordForm.valid) {
      let email!: ResetPassword;
      this.http.resetPassword(email).subscribe({
        next: (response) => {
          this.toaster.success('Password reset request was sent successfully.please check your email to reset your password', 'Success!')
        },
        error: (error) => {
          {
            this.toaster.error('something went wrong. Please try again later', 'Error');
            //console.log(JSON.stringify(error));
          }
        }
      })
    }
  }
}
