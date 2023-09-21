import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CarRoutingModule} from './car-routing.module';
import {FormModule} from "@app/services/form/form.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CarRoutingModule,

    FormModule.forRoot(),
  ]
})
export class CarModule {
}
