import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  authForm = this.formBuilder.group({
    id: [],
    email: [null, Validators.compose([
      Validators.required, Validators.maxLength(255), Validators.email
    ])],
    password: [null, Validators.required]
  });

  ngOnInit(): void {
  }

  async login() {
    await this.authService.login(this.authForm.value);
    await this.router.navigate(['']);
  }

}
