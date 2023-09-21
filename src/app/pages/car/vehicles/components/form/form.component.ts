import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import * as fromRoot from '@app/store';
import * as fromList from '../../store/list';
import {markFormGroupTouched, regex, regexErrors} from "@app/shared";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form!: FormGroup;
  regexErrors = regexErrors;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string, value: {[key: string]: any }},
    private store: Store<fromRoot.State>,
    private dialogRef: MatDialogRef<FormComponent>,) {
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      brand: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(regex.safe)
        ]
      }],
      model: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(regex.safe)
        ]
      }],
      year: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.maxLength(4),
          Validators.minLength(4),
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
        const updateVehicle = {...this.data.value, ...this.form.value};
        this.store.dispatch(new fromList.Update(updateVehicle, this.data.userId));
      } else {
        this.store.dispatch(new fromList.Create(this.form.value, this.data.userId));
      }

      this.dialogRef.close();

    } else {
      markFormGroupTouched(this.form);
    }
  }
}
