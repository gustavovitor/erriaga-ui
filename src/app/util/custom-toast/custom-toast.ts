import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';

@Component({
  selector: 'app-custom-toast-component',
  styleUrls: ['custom-toast.scss'],
  templateUrl: 'custom-toast.html',
  animations: [
    trigger('flyInOut', [
      state('inactive', style({ opacity: 0 })),
      transition(
        'inactive => active',
        animate(
          '200ms ease-out',
          keyframes([
            style({
              opacity: 0,
              bottom: '-15px',
              'max-height': 0,
              'max-width': 0,
              'margin-top': 0,
            }),
            style({
              opacity: 0.8,
              bottom: '-3px',
            }),
            style({
              opacity: 1,
              bottom: '0',
              'max-height': '800px',
              'margin-top': '12px',
              'max-width': '800px',
            }),
          ]),
        ),
      ),
      state(
        'active',
        style({
          bottom: '0',
          'max-height': '800px',
          'margin-top': '12px',
          'max-width': '800px',
        }),
      ),
      transition(
        'active => removed',
        animate(
          '200ms ease-out',
          keyframes([
            style({
              opacity: 1,
              transform: 'translateY(0)'
            }),
            style({
              opacity: 0,
              transform: 'translateY(25%)'
            }),
          ]),
        ),
      ),
    ]),
  ],
})
export class CustomToastComponent extends Toast implements OnInit {
  // constructor is only necessary when not using AoT
  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
  ) {
    super(toastrService, toastPackage);
  }

  bgClass;
  colorClass;
  notyfToast;
  principalClass;

  showActionButton = false;
  actionButtonText: string;
  onActionCall: Function;

  ngOnInit() {
  }

  activateToast(): void {
    this.getBgStyle();
    super.activateToast();
  }

  close() {
    this.toastrService.remove(this.toastPackage.toastId);
  }

  onAction() {
    this.onActionCall();
  }

  getBgStyle() {
    this.principalClass = this.toastClasses.split(' ')[0].replace('toast-', '');
    this.bgClass = 'bg-' + this.principalClass;
    this.colorClass = 'color-' + this.principalClass + ' notyf__icon--' + this.principalClass;
    this.notyfToast = 'notyf__toast--' + this.principalClass;
  }
}
