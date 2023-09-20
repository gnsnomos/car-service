import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {select, Store} from "@ngrx/store";
import * as fromRoot from '@app/store';
import * as fromList from '../../store/list';
import {markFormGroupTouched, regex, regexErrors} from "@app/shared";
import * as fromDictionaries from "app/pages/car/car-services/store/dictionaries";
import {ControlItem, Dictionary} from "app/pages/car/car-services/store/dictionaries";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form!: FormGroup;
  regexErrors = regexErrors;

  vehicles?: ControlItem[];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string, value: { [key: string]: any } },
    private store: Store<fromRoot.State>,
    private dialogRef: MatDialogRef<FormComponent>,) {
  }

  ngOnInit(): void {
    this.store.pipe(
      select(fromDictionaries.getVehicles),
      filter((vehicles: Dictionary) => !!vehicles)
    )
      .subscribe(vehicles => this.vehicles = vehicles.controlItems);

    this.form = this.fb.group({
      vehicle: [(this.vehicles?.length === 1 ? this.vehicles[0].value : null), {
        updateOn: 'blur', validators: [
          Validators.required
        ]
      }],
      kilometers: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern(regex.numbers)
        ]
      }],
      typeOfService: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(regex.safe)
        ]
      }],
      cost: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.maxLength(12),
          Validators.pattern(regex.numbers)
        ]
      }]
    });

    if (this.data.value) {
      this.form.patchValue(this.data.value);
    }
  }

  onSubmit(): void {

    if (this.form.valid) {

      if (this.data.value) {
        const updateService = {...this.data.value, ...this.form.value};
        this.store.dispatch(new fromList.Update(updateService, this.data.userId));
      } else {
        this.store.dispatch(new fromList.Create(this.form.value, this.data.userId));
      }

      this.dialogRef.close();

    } else {
      markFormGroupTouched(this.form);
    }
  }
}
