import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VehiclesRoutingModule} from './vehicles-routing.module';
import {MatDialogModule} from "@angular/material/dialog";
import {ButtonModule} from "@app/shared";
import {FormModule} from "@app/pages/car/vehicles/components/form/form.module";
import {VehiclesComponent} from './vehicles.component';
import {VehicleComponent} from '@app/pages/car/vehicles/components/vehicle/vehicle.component';

@NgModule({
  declarations: [
    VehiclesComponent,
    VehicleComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    MatDialogModule,
    ButtonModule,
    FormModule
  ]
})
export class VehiclesModule {
}
