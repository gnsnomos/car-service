import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromList from './list/list.reducer';
import {ListEffects} from './list/list.effects';

import * as fromDictionaries from './dictionaries/dictionaries.reducer';
import {DictionariesEffects} from './dictionaries/dictionaries.effects';

export interface VehiclesState {
  dictionaries: fromDictionaries.DictionariesState;
  list: fromList.ListState;
}

export const reducers: ActionReducerMap<VehiclesState> = {
  // @ts-ignore
  dictionaries: fromDictionaries.reducer,
  // @ts-ignore
  list: fromList.reducer
};

export const effects: any[] = [
  DictionariesEffects,
  ListEffects
];

export const getVehiclesState = createFeatureSelector<VehiclesState>('car-service');
