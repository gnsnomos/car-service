import {ControlItem} from '@app/models/frontend';

export const markFormGroupTouched = (formGroup: { controls: any; }) => {
  (Object as any).values(formGroup.controls).forEach((control: { markAsTouched?: any; controls: any; }) => {
    control.markAsTouched();

    if (control.controls) {
      markFormGroupTouched(control);
    }
  });
};

export interface Control {
  items?: ControlItem[];
  changed?: () => void;
  map?: () => void;
}

export interface ControlEntities {
  [key: string]: Control;
}

export const mapControls = (controls: ControlEntities): void => {
  Object.keys(controls).forEach(key => {
    const mapFn = controls[key].map;
    if (mapFn) {
      mapFn();
    }
  });
};

