import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';

import {FormFieldModule, InputModule, PasswordModule} from '@app/shared/controls';
import {ButtonModule} from '@app/shared/buttons';
import {SpinnerModule} from '@app/shared/indicators';
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        FormFieldModule,
        InputModule,
        PasswordModule,
        ButtonModule,
        SpinnerModule,
        MatIconModule,
        MatListModule
    ]
})
export class LoginModule {
}
