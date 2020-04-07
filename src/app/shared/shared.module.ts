import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { AppEnumPipe } from './pipes/app-enum.pipe';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [DataTableComponent, AppEnumPipe],
  exports: [
    DataTableComponent,
    NgxMaskModule
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
