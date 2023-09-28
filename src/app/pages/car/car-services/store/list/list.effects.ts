import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {from, of} from 'rxjs';
import {catchError, map, switchMap, take} from 'rxjs/operators';

import {extractDocumentChangeActionData} from '@app/shared/utils/data';

import {Service, ServiceCreateData} from './list.models';

import * as fromActions from './list.actions';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {serverTimestamp} from "@angular/fire/firestore";

@Injectable()
export class ListEffects {

  constructor(
    private actions: Actions,
    private afs: AngularFirestore
  ) {
  }

  read = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      map((action: fromActions.Read) => action.userId),
      switchMap((userId) =>
        this.afs.collection(`users/${userId}/services`, ref => ref.orderBy('created', 'desc')).snapshotChanges().pipe(
          take(1),
          // @ts-ignore
          map(changes => changes.map(x => extractDocumentChangeActionData(x))),
          map((items: Service[]) => new fromActions.ReadSuccess(items)),
          catchError(err => of(new fromActions.ReadError(err.message)))
        )
      )
    )
  );

  create = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.CREATE),
      map((data: ServiceCreateData) => ({
          service: {
            ...data.service,
            created: serverTimestamp()
          },
          userId: data.userId
        })
      ),
      switchMap((request: ServiceCreateData) =>
        from(this.afs.collection(`users/${request.userId}/services`).add(request.service)).pipe(
          map(res => ({...request.service, id: res.id})),
          map((service: Service) => new fromActions.CreateSuccess(service)),
          catchError(err => of(new fromActions.CreateError(err.message)))
        )
      )
    ));

  update = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.UPDATE),
      map((action: ServiceCreateData) => ({
          service: {
            ...action.service,
            updated: serverTimestamp()
          },
          userId: action.userId
        })
      ),
      switchMap((request: ServiceCreateData) =>
        from(this.afs.collection(`users/${request.userId}/services`).doc(request.service.id).set(request.service)).pipe(
          map(() => new fromActions.UpdateSuccess(request.service.id, request.service)),
          catchError(err => of(new fromActions.UpdateError(err.message)))
        )
      )
    ));

  delete = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.DELETE),
      switchMap((action: fromActions.Delete) =>
        from(this.afs.collection(`users/${action.userId}/services`).doc(action.id).delete()).pipe(
          map(() => new fromActions.DeleteSuccess(action.id)),
          catchError(err => of(new fromActions.DeleteError(err.message)))
        )
      )
    ));
}
