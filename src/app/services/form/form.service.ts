import {Injectable} from '@angular/core';

@Injectable()
export class FormService {

  getModalHeight(): number {
    let height = 530;
    const innerHeight = window.innerHeight;

    if (height > innerHeight) {
      height = innerHeight;
    }

    return height;
  }

  getModalWidth(): number {
    let width = 650;
    const innerWidth = window.innerWidth;

    if (width > innerWidth) {
      width = innerWidth;
    }

    return width;
  }
}
