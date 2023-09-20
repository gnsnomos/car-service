import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CarServicesRoutingModule} from './car-services-routing.module';
import {CarServicesComponent} from './car-services.component';
import {CarServiceComponent} from '@app/pages/car/car-services/components/car-service/car-service.component';
import {ButtonModule} from '@app/shared';
import {MatDialogModule} from '@angular/material/dialog';
import {FormModule} from '@app/pages/car/car-services/components/form/form.module';
import {FirebaseDateTransformPipe} from '@app/pages/car/car-services/pipes/firebase-date-transform';
import {StoreModule} from "@ngrx/store";
import {effects, reducers} from "@app/pages/car/car-services/store";
import {EffectsModule} from "@ngrx/effects";

@NgModule({
  declarations: [
    CarServicesComponent,
    CarServiceComponent,
    FirebaseDateTransformPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('car-service', reducers),
    EffectsModule.forFeature(effects),
    CarServicesRoutingModule,
    ButtonModule,
    MatDialogModule,
    FormModule
  ]
})
export class CarServicesModule {
}
