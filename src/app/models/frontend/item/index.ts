import {Icon} from '../icon';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: string;
  icon?: Icon;
}

export interface TypeOfService {
  id: TypesOfService;
  values: {[key: string]: string};
}

export enum TypesOfService {
  SintirisiIgra = 'sintirisi-igra',
  SintirisiIlektrologika = 'sintirisi-ilektroliogika',
  SintirisiMixanikaMeri = 'sintirisi-mixanika-meri',
  SintirisiAnartisi = 'sintirisi-anartisi',
  SintirisiLoipa = 'sintirisi-loipa',

}
