import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaintenanceTasksComponent} from './maintenance-tasks.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    MaintenanceTasksComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    MaintenanceTasksComponent
  ]
})
export class MaintenanceTasksModule {
}
