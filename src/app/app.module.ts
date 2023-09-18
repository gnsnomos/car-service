import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from '@app/components/header/header.component';
import {NotificationModule} from '@app/services';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {environment} from '../environments/environment';
import {StoreModule} from '@ngrx/store';

const StoreDevtools = !environment.production ? StoreDevtoolsModule.instrument({maxAge: 50}) : [];
import {effects, reducers} from '@app/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase.config),
    AngularFirestoreModule,
    AngularFireStorageModule,

    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtools,
    EffectsModule.forRoot(effects),

    NotificationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
