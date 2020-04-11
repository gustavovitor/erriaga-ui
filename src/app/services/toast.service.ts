import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastrService) {}

  success(msg: string) {
    this.toast.success(msg, 'Opa, deu certo!', { easeTime: 10000, positionClass: 'toast-bottom-right', closeButton: true });
  }

  warning(msg: string) {
    this.toast.warning(msg, 'Atenção!', { easeTime: 10000, positionClass: 'toast-bottom-right', closeButton: true });
  }

  info(msg: string) {
    this.toast.info(msg, 'Ei, olhe aqui!', { easeTime: 10000, positionClass: 'toast-bottom-right', closeButton: true });
  }

  error(msg: string) {
    this.toast.error(msg, 'Opa, pera lá.', { easeTime: 10000000, positionClass: 'toast-bottom-right' });
  }

}
