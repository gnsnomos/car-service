import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VehiclesRoutingModule} from './vehicles-routing.module';
import {MatDialogModule} from "@angular/material/dialog";
import {ButtonModule} from "@app/shared";
import {FormModule} from "@app/pages/car/vehicles/components/form/form.module";
import {VehiclesComponent} from './vehicles.component';
import {VehicleComponent} from '@app/pages/car/vehicles/components/vehicle/vehicle.component';
import {StoreModule} from "@ngrx/store";
import {effects, reducers} from "./store";
import {EffectsModule} from "@ngrx/effects";

@NgModule({
  declarations: [
    VehiclesComponent,
    VehicleComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('vehicles', reducers),
    EffectsModule.forFeature(effects),
    VehiclesRoutingModule,
    MatDialogModule,
    ButtonModule,
    FormModule
  ]
})
export class VehiclesModule {
}
