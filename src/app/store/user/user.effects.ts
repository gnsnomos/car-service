import {Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';

import {from, of} from 'rxjs';
import {map, switchMap, catchError, take, tap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {User} from './user.models';

import * as fromActions from './user.actions';

import {NotificationService} from '@app/services/notification/notification.service';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable()
export class UserEffects {
  constructor(private actions: Actions,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private notification: NotificationService
  ) {
  }

  init = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.INIT),
      switchMap(() => this.afAuth.authState.pipe(take(1))),
      switchMap(authState => {
        if (authState) {

          return this.afs.doc<User>(`users/${authState.uid}`).valueChanges().pipe(
            take(1),
            map(user => new fromActions.InitAuthorized(authState.uid, user || null)),
            catchError(err => of(new fromActions.InitError(err.message)))
          );

        } else {
          return of(new fromActions.InitUnauthorized());
        }
      })
    )
  );

  signInEmail = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_IN_EMAIL),
      map((action: fromActions.SignInEmail) => action.credentials),
      switchMap(credentials =>
        from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)).pipe(
          switchMap(signInState =>
            this.afs.doc<User>(`users/${signInState.user?.uid}`).valueChanges().pipe(
              take(1),
              tap(() => {
                this.router.navigate(['/']);
              }),
              // @ts-ignore
              map(user => new fromActions.SignInEmailSuccess(signInState.user?.uid, user || null))
            )
          ),
          catchError(err => {
            this.notification.error(err.message);
            return of(new fromActions.SignInEmailError(err.message));
          })
        )
      )
    )
  );

  signUpEmail = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_UP_EMAIL),
      map((action: fromActions.SignUpEmail) => action.credentials),
      switchMap(credentials =>
        from(this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)).pipe(
          tap(async () => {
            const currentUser = await this.afAuth.currentUser;
            currentUser?.sendEmailVerification(
              environment.firebase.actionCodeSettings
            );
            await this.router.navigate(['/auth/email-confirm']);
          }),
          map((signUpState) => new fromActions.SignUpEmailSuccess(signUpState.user?.uid)),
          catchError(err => {
            this.notification.error(err.message);
            return of(new fromActions.SignUpEmailError(err.message));
          })
        )
      )
    )
  );

  signOut = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_OUT),
      switchMap(() =>
        from(this.afAuth.signOut()).pipe(
          map(() => new fromActions.SignOutSuccess()),
          catchError(err => of(new fromActions.SignOutError(err.message)))
        )
      )
    )
  );
}
