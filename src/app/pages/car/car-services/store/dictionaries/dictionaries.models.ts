import {ControlItem, TypeOfService, Vehicle} from '@app/models/frontend';

export {TypeOfService, Vehicle, ControlItem} from '@app/models/frontend';


export interface Dictionaries {
  vehicles: Dictionary;
  sintirisiIgra: TypeOfServiceDictionary;
  sintirisiIlektrologika: TypeOfServiceDictionary;
  sintirisiMixanikaMeri: TypeOfServiceDictionary;
  sintirisiAnartisi: TypeOfServiceDictionary;
  sintirisiLoipa: TypeOfServiceDictionary;
}

export interface Dictionary {
  items: Vehicle[];
  controlItems: ControlItem[];
}

export interface TypeOfServiceDictionary {
  items: {[key: string]: string};
  controlItems: ControlItem[];
}

