import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarServicesComponent} from '@app/pages/car/car-services/car-services.component';

const routes: Routes = [
  {
    path: '',
    component: CarServicesComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarServicesRoutingModule {
}
