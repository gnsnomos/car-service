import {createSelector, createFeatureSelector} from '@ngrx/store';

import {DictionariesState} from './dictionaries.reducer';
import {getVehiclesState, VehiclesState} from "@app/pages/car/car-services/store";

export const getDictionariesState = createSelector(
  getVehiclesState,
  (state: VehiclesState) => state.dictionaries);

export const getDictionaries = createSelector(
  getDictionariesState,
  (state) => state.entities
);

export const getLoading = createSelector(
  getDictionariesState,
  (state) => state.loading
);

export const getIsReady = createSelector(
  getDictionariesState,
  (state) => state.entities && !state.loading
);

export const getVehicles = createSelector(
  getDictionaries,
  (state) => state.vehicles
);
