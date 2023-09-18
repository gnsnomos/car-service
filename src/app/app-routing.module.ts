import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarUserResolver} from "@app/pages/car/resolvers";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'cars',
        loadChildren: () => import('./pages/car/car.module').then(m => m.CarModule),
        resolve: {
          user: CarUserResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
