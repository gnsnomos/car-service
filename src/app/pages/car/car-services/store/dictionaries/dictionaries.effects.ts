import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {of, zip} from 'rxjs';
import {map, switchMap, catchError, take} from 'rxjs/operators';

import {Dictionaries, Dictionary, Item, ControlItem} from './dictionaries.models';

import * as fromActions from './dictionaries.actions';
import {AngularFirestore, DocumentChangeAction} from "@angular/fire/compat/firestore";

const documentToItem = (x: DocumentChangeAction<any>): Item => {
  const data = x.payload.doc.data();
  return {
    id: x.payload.doc.id,
    ...data
  };
};

const itemToControlItem = (x: Item): ControlItem => ({
  value: x.id,
  label: `${x.brand} ${x.model} - ${x.year}`,
  icon: x.icon
});

const addDictionary = (items: Item[]): Dictionary => ({
  items,
  controlItems: [...items].map(x => itemToControlItem(x))
});

@Injectable()
export class DictionariesEffects {

  constructor(private actions: Actions,
              private afs: AngularFirestore) {
  }

  read = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      map((action: fromActions.Read) => action.userId),
      switchMap((userId: string) => {
        return zip(
          this.afs.collection(`users/${userId}/vehicles`).snapshotChanges().pipe(
            take(1),
            map(items => items.map(x => documentToItem(x)))
          )/*,
          this.afs.collection('serviceTypes').snapshotChanges().pipe(
            take(1),
            map(items => items.map(x => documentToItem(x)))
          )*/
        ).pipe(
          map(([vehicles]) => {

            const dictionaries: Dictionaries = {
              vehicles: addDictionary(vehicles)
            };

            return new fromActions.ReadSuccess(dictionaries);
          }),
          catchError(err => of(new fromActions.ReadError(err.message)))
        );
      })
    ));
}
