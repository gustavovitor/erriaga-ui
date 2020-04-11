import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastService: ToastService) { }

  handler(err: APIError) {
    if (err) {
      err.errors.forEach(error => {
        this.toastService.error(error.message);
      });
    }
  }
}



export class APIError {
  errorCount: number;
  errors: Array<ErrorHandler>;
}

export class ErrorHandler {
  message: string;
  error: string;
  code: number;
  object: any;
}
