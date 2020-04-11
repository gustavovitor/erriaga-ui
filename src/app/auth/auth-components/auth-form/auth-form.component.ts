import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastService: ToastService,
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

  login() {
    this.authService.login(this.authForm.value)
      .then(() => {
        this.router.navigate(['']);
      }).catch(err => {
        if (Object.keys(err).includes('status')) {
          if (err.status === 0) {
            this.toastService.error('Não consegui se comunicar com o servidor. Contate o administrador do sistema.');
          } else {
            this.toastService.error('Erro desconhecido. Contate o administrador do sistema.');
          }
        } else {
          this.toastService.error(err);
        }
    });

  }

}
