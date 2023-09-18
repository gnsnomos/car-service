import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CarRoutingModule} from './car-routing.module';
import {StoreModule} from '@ngrx/store';
import {effects, reducers} from '@app/pages/car/vehicles/store';
import {EffectsModule} from '@ngrx/effects';
import {MatDialogModule} from '@angular/material/dialog';
import {ButtonModule} from '@app/shared';
import {FormModule} from '@app/pages/car/vehicles/components/form/form.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('cars', reducers),
    EffectsModule.forFeature(effects),
    CarRoutingModule,
    MatDialogModule,
    ButtonModule,
    FormModule
  ]
})
export class CarModule {
}
