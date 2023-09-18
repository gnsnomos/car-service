import {Action} from '@ngrx/store';
import {Vehicle, VehicleCreateRequest} from './list.models';

export enum Types {

  READ = '[Vehicles] Read: Start',
  READ_SUCCESS = '[Vehicles] Read: Success',
  READ_ERROR = '[Vehicles] Read: Error',

  CREATE = '[Vehicles] Create: Start',
  CREATE_SUCCESS = '[Vehicles] Create: Success',
  CREATE_ERROR = '[Vehicles] Create: Error',

  UPDATE = '[Vehicles] Update: Start',
  UPDATE_SUCCESS = '[Vehicles] Update: Success',
  UPDATE_ERROR = '[Vehicles] Update: Error',

  DELETE = '[Vehicles] Delete: Start',
  DELETE_SUCCESS = '[Vehicles] Delete: Success',
  DELETE_ERROR = '[Vehicles] Delete: Error',
}

// Read

export class Read implements Action {
  readonly type = Types.READ;

  constructor(public userId?: string) {
  }
}

export class ReadSuccess implements Action {
  readonly type = Types.READ_SUCCESS;

  constructor(public items: Vehicle[]) {
  }
}

export class ReadError implements Action {
  readonly type = Types.READ_ERROR;

  constructor(public error: string) {
  }
}

// Create

export class Create implements Action {
  readonly type = Types.CREATE;

  constructor(public vehicle: VehicleCreateRequest, public userId?: string) {
  }
}

export class CreateSuccess implements Action {
  readonly type = Types.CREATE_SUCCESS;

  constructor(public vehicle: Vehicle) {
  }
}

export class CreateError implements Action {
  readonly type = Types.CREATE_ERROR;

  constructor(public error: string) {
  }
}

// Update

export class Update implements Action {
  readonly type = Types.UPDATE;

  constructor(public vehicle: Vehicle, public userId?: string) {
  }
}

export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS;

  constructor(
    public id: string,
    public changes: Partial<Vehicle>
  ) {
  }
}

export class UpdateError implements Action {
  readonly type = Types.UPDATE_ERROR;

  constructor(public error: string) {
  }
}

// Delete

export class Delete implements Action {
  readonly type = Types.DELETE;

  constructor(public id: string, public userId?: string) {
  }
}

export class DeleteSuccess implements Action {
  readonly type = Types.DELETE_SUCCESS;

  constructor(public id: string) {
  }
}

export class DeleteError implements Action {
  readonly type = Types.DELETE_ERROR;

  constructor(public error: string) {
  }
}

export type All
  = Read
  | ReadSuccess
  | ReadError
  | Create
  | CreateSuccess
  | CreateError
  | Update
  | UpdateSuccess
  | UpdateError
  | Delete
  | DeleteSuccess
  | DeleteError;
