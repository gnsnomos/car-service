import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormService} from "@app/services";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FormModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: FormModule,
      providers: [
        FormService
      ]
    };
  }
}
