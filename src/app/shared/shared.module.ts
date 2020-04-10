import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { AppEnumPipe } from './pipes/app-enum.pipe';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';
import { AutofocusDirective } from './directives/autofocus.directive';



@NgModule({
  declarations: [DataTableComponent, AppEnumPipe, AutofocusDirective],
  exports: [
    DataTableComponent,
    NgxMaskModule,
    AutofocusDirective
  ],
  providers: [
    MaskPipe
  ],
  imports: [
    CommonModule,
    NgxMaskModule
  ]
})
export class SharedModule { }
