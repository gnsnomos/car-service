import {createSelector} from '@ngrx/store';
import {getVehiclesState, VehiclesState} from '../index';

import {listAdapter} from './list.reducer';

export const getListState = createSelector(
  getVehiclesState,
  (state: VehiclesState) => state.list
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = listAdapter.getSelectors(getListState);

export const selectEntityById = createSelector(
  selectEntities,
  (entities: any, props: { id: string }) => {
    return entities[props.id];
  }
);
