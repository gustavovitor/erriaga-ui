import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  constructor(public router: Router,
              private toastService: ToastService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().then(() => {
      this.authService.cleanAccessToken();
      this.router.navigate(['/auth']);
    }).catch(() => this.toastService.error('Erro desconhecido. Entre em contato com o administrador do sistema.'));
  }

}
