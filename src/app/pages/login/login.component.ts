import { LoginResponseInterface } from './login-response.interface';
import { LoginInterface } from './login.interface';
import { AuthService } from './../../shared/auth.service';
import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { EmailValidator } from '../../theme/validators';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  items: any;
  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  recordarSesion: AbstractControl;
  submitted: boolean = false;

  constructor(fb: FormBuilder,
              protected service: AuthService, 
              private localStorageService: LocalStorageService,
              private toastrService: ToastrService,
              private router: Router) {

    let recordar = (localStorage.getItem('recordarSesion') === 'true') ? true : false;

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'recordarSesion': [recordar]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.recordarSesion = this.form.controls['recordarSesion'];
  }

  onSubmit(values: LoginInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .login(values)
        .subscribe(
            (response: LoginResponseInterface) => {
                if (response.success) {
                    this.toastrService.success(response.message);
                } else {
                    this.toastrService.error(response.message);
                }
        });
              
              
    }
  }


}
