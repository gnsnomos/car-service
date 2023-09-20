import {Item, ControlItem} from '@app/models/frontend';

export {Item, ControlItem} from '@app/models/frontend';


export interface Dictionaries {
  vehicles: Dictionary;
}

export interface Dictionary {
  items: Item[];
  controlItems: ControlItem[];
}

