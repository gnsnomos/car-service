import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'vehicles',
    loadChildren: () => import('./vehicles/vehicles.module').then(m => m.VehiclesModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./car-services/car-services.module').then(m => m.CarServicesModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'vehicles'
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule {
}
