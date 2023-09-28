import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormFieldComponent} from './form-field.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    FormFieldComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    FormFieldComponent
  ]
})
export class FormFieldModule {
}
