import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-auth-register-form',
  templateUrl: './auth-register-form.component.html',
  styleUrls: ['./auth-register-form.component.css']
})
export class AuthRegisterFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private errorHandlerService: ErrorHandlerService,
              private router: Router) { }

  authRegisterForm = this.formBuilder.group({
    id: [],
    name: [null, Validators.compose([
      Validators.required, Validators.maxLength(64)
    ])],
    email: [null, Validators.compose([
      Validators.required, Validators.maxLength(255), Validators.email
    ])],
    password: [null, Validators.required]
  });

  ngOnInit(): void {
  }

  register() {
    this.authRegisterForm.disable();
    this.authService.register(this.authRegisterForm.value)
      .then(async () => {
        await this.authService.login(this.authRegisterForm.value);
        await this.router.navigate(['']);
      })
      .catch((err) => {
        this.errorHandlerService.handler(err.error);
        this.authRegisterForm.enable();
      });
  }
}
