import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {from, of} from 'rxjs';
import {map, switchMap, catchError, take} from 'rxjs/operators';

import {extractDocumentChangeActionData} from '@app/shared/utils/data';

import {Vehicle, VehicleCreateData} from './list.models';

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
        this.afs.collection(`users/${userId}/vehicles`, ref => ref.orderBy('created')).snapshotChanges().pipe(
          take(1),
          // @ts-ignore
          map(changes => changes.map(x => extractDocumentChangeActionData(x))),
          map((items: Vehicle[]) => new fromActions.ReadSuccess(items)),
          catchError(err => of(new fromActions.ReadError(err.message)))
        )
      )
    )
  );

  create = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.CREATE),
      map((data: VehicleCreateData) => ({
          vehicle: {
            ...data.vehicle,
            created: serverTimestamp()
          },
          userId: data.userId
        })
      ),
      switchMap((request: VehicleCreateData) =>
        from(this.afs.collection(`users/${request.userId}/vehicles`).add(request.vehicle)).pipe(
          map(res => ({...request.vehicle, id: res.id})),
          map((vehicle: Vehicle) => new fromActions.CreateSuccess(vehicle)),
          catchError(err => of(new fromActions.CreateError(err.message)))
        )
      )
    ));

  update = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.UPDATE),
      map((action: VehicleCreateData) => ({
          vehicle: {
            ...action.vehicle,
            updated: serverTimestamp()
          },
          userId: action.userId
        })
      ),
      switchMap((request: VehicleCreateData) =>
        from(this.afs.collection(`users/${request.userId}/vehicles`).doc(request.vehicle.id).set(request.vehicle)).pipe(
          map(() => new fromActions.UpdateSuccess(request.vehicle.id, request.vehicle)),
          catchError(err => of(new fromActions.UpdateError(err.message)))
        )
      )
    ));

  delete = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.DELETE),
      switchMap((action: fromActions.Delete) =>
        from(this.afs.collection(`users/${action.userId}/vehicles`).doc(action.id).delete()).pipe(
          map(() => new fromActions.DeleteSuccess(action.id)),
          catchError(err => of(new fromActions.DeleteError(err.message)))
        )
      )
    ));
}
