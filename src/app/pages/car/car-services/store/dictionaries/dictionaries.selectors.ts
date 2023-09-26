import {createSelector} from '@ngrx/store';

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

export const getSintirisiIgra = createSelector(
  getDictionaries,
  (state) => state.sintirisiIgra
);

export const getSintirisiIlektrologika = createSelector(
  getDictionaries,
  (state) => state.sintirisiIlektrologika
);

export const getSintirisiMixanikaMeri = createSelector(
  getDictionaries,
  (state) => state.sintirisiMixanikaMeri
);

export const getSintirisiAnartisi = createSelector(
  getDictionaries,
  (state) => state.sintirisiAnartisi
);

export const getSintirisiLoipa = createSelector(
  getDictionaries,
  (state) => state.sintirisiLoipa
);
