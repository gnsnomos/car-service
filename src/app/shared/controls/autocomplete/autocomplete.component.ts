import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, filter, map, startWith, takeUntil} from 'rxjs/operators';

import {ControlItem, Value} from '@app/models/frontend';
import {MatAutocomplete} from "@angular/material/autocomplete";

export {ControlItem, Value} from '@app/models/frontend';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() items?: ControlItem[];
  @Input() placeholder: string;
  @Input() selectFirst = false;

  @Output() changed = new EventEmitter<Value>();

  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;

  formControl = new FormControl();
  options$: Observable<ControlItem[] | undefined>;

  private destroy = new Subject<any>();

  constructor() {
  }

  ngOnInit(): void {
    this.options$ = this.formControl.valueChanges.pipe(
      startWith(''),
      filter(value => typeof value === 'string' || typeof value === 'object'),
      map(value => typeof value === 'string' ? value : value.label),
      map(label => label ? this.filter(label) : this.items?.slice())
    );

    setTimeout(() => this.matAutocomplete.options.first.setActiveStyles(), 2000);

    this.formControl.valueChanges.pipe(
      takeUntil(this.destroy),
      distinctUntilChanged()
    ).subscribe(item => {
      const value = typeof item === 'object' ? item.value : null;
      this.propagateChange(value);
      this.changed.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  private filter(value: string): ControlItem[] | undefined {
    const filterValue = value.toLowerCase();
    return this.items?.filter(item => item.label.toLowerCase().includes(filterValue));
  }

  private propagateChange: any = () => {
  };
  private propagateTouched: any = () => {
  };

  writeValue(value: Value): void {
    const selectedOption = this.items?.find(item => item.value === value);
    this.formControl.setValue(selectedOption);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  displayFn(item?: ControlItem): string {
    return item ? item.label : '';
  }

  onBlur(): void {
    this.propagateTouched();
  }

}
