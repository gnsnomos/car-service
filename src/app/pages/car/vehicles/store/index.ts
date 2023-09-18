import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromList from './list/list.reducer';
import {ListEffects} from './list/list.effects';

export interface VehiclesState {
  list: fromList.ListState;
}

export const reducers: ActionReducerMap<VehiclesState> = {
  // @ts-ignore
  list: fromList.reducer
};

export const effects: any[] = [
  ListEffects
];

export const getVehiclesState = createFeatureSelector<VehiclesState>('cars');
