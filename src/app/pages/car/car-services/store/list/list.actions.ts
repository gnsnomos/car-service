import {Action} from '@ngrx/store';
import {Service, ServiceCreateRequest} from './list.models';

export enum Types {

  READ = '[Car services] Read: Start',
  READ_SUCCESS = '[Car services] Read: Success',
  READ_ERROR = '[Car services] Read: Error',

  CREATE = '[Car services] Create: Start',
  CREATE_SUCCESS = '[Car services] Create: Success',
  CREATE_ERROR = '[Car services] Create: Error',

  UPDATE = '[Car services] Update: Start',
  UPDATE_SUCCESS = '[Car services] Update: Success',
  UPDATE_ERROR = '[Car services] Update: Error',

  DELETE = '[Car services] Delete: Start',
  DELETE_SUCCESS = '[Car services] Delete: Success',
  DELETE_ERROR = '[Car services] Delete: Error',
}

// Read

export class Read implements Action {
  readonly type = Types.READ;

  constructor(public userId?: string) {
  }
}

export class ReadSuccess implements Action {
  readonly type = Types.READ_SUCCESS;

  constructor(public items: Service[]) {
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

  constructor(public service: ServiceCreateRequest, public userId?: string) {
  }
}

export class CreateSuccess implements Action {
  readonly type = Types.CREATE_SUCCESS;

  constructor(public service: Service) {
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

  constructor(public service: Service, public userId?: string) {
  }
}

export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS;

  constructor(
    public id: string,
    public changes: Partial<Service>
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
