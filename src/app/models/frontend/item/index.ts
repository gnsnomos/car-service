import {Icon} from '../icon';

export interface Item {
  id: string;
  brand: string;
  model: string;
  year: string;
  icon?: Icon;
}
