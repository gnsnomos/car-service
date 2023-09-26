import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {AutocompleteModule, CheckboxesModule, DateModule, FormFieldModule, InputModule} from '@app/shared/controls';
import {ButtonModule} from '@app/shared/buttons';

import {FormComponent} from './form.component';
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputModule,
    FormFieldModule,
    ButtonModule,
    AutocompleteModule,
    CheckboxesModule,
    DateModule,

    MatNativeDateModule,
  ]
})
export class FormModule {
}
