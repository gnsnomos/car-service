import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {of, zip} from 'rxjs';
import {catchError, map, switchMap, take} from 'rxjs/operators';

import {
  ControlItem,
  Dictionaries,
  Dictionary,
  TypeOfService,
  TypeOfServiceDictionary,
  Vehicle
} from './dictionaries.models';

import * as fromActions from './dictionaries.actions';
import {AngularFirestore, DocumentChangeAction} from "@angular/fire/compat/firestore";
import {TypesOfService} from "@app/models/frontend";

const documentToItem = (x: DocumentChangeAction<any>): Vehicle => {
  const data = x.payload.doc.data();
  return {
    id: x.payload.doc.id,
    ...data
  };
};

const itemToControlItem = (x: Vehicle): ControlItem => ({
  value: x.id,
  label: `${x.brand} ${x.model} - ${x.year}`,
  icon: x.icon
});

const addDictionary = (items: Vehicle[]): Dictionary => ({
  items,
  controlItems: [...items].map(x => itemToControlItem(x))
});

const documentToServiceItem = (x: DocumentChangeAction<any>): TypeOfService => {
  const data = x.payload.doc.data();
  return {
    id: x.payload.doc.id as TypesOfService,
    values: data
  };
};

const itemServiceToControlItem = (x: { [key: string]: string }): ControlItem[] => {
  const controlItems: ControlItem[] = [];
  Object.keys(x).forEach(key => controlItems.push({value: key, label: x[key]}))
  return controlItems;
};

const addServiceDictionary = (items: { [key: string]: string }): TypeOfServiceDictionary => ({
  items: items,
  controlItems: itemServiceToControlItem(items)
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
          ),
          this.afs.collection('typeOfServices').snapshotChanges().pipe(
            take(1),
            map(items => items.map(x => documentToServiceItem(x)))
          )
        ).pipe(
          map(([vehicles, typeOfServices]) => {

            const dictionaries: Dictionaries = {
              vehicles: addDictionary(vehicles),
              sintirisiIgra: addServiceDictionary(
                typeOfServices
                  .filter(type => type.id === TypesOfService.SintirisiIgra)
                  .map(item => item.values)[0]
              ),
              sintirisiIlektrologika: addServiceDictionary(
                typeOfServices
                  .filter(type => type.id === TypesOfService.SintirisiIlektrologika)
                  .map(item => item.values)[0]
              ),
              sintirisiMixanikaMeri: addServiceDictionary(
                typeOfServices
                  .filter(type => type.id === TypesOfService.SintirisiMixanikaMeri)
                  .map(item => item.values)[0]
              ),
              sintirisiAnartisi: addServiceDictionary(
                typeOfServices
                  .filter(type => type.id === TypesOfService.SintirisiAnartisi)
                  .map(item => item.values)[0]
              ),
              sintirisiLoipa: addServiceDictionary(
                typeOfServices
                  .filter(type => type.id === TypesOfService.SintirisiLoipa)
                  .map(item => item.values)[0]
              ),
            };

            return new fromActions.ReadSuccess(dictionaries);
          }),
          catchError(err => of(new fromActions.ReadError(err.message)))
        );
      })
    ));
}
