import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {select, Store} from "@ngrx/store";
import * as fromRoot from '@app/store';
import * as fromList from '../../store/list';
import {ControlEntities, markFormGroupTouched, regex, regexErrors} from "@app/shared";
import * as fromDictionaries from "app/pages/car/car-services/store/dictionaries";
import {ControlItem, Dictionary, TypeOfServiceDictionary} from "app/pages/car/car-services/store/dictionaries";
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
    controls: ControlEntities;
    sintirisiIgraItems: ControlItem[];
    sintirisiIlektrologikaItems: ControlItem[];
    sintirisiMixanikaMeriItems: ControlItem[];
    sintirisiAnartisiItems: ControlItem[];
    sintirisiLoipaItems: ControlItem[];

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
        ).subscribe(vehicles => this.vehicles = vehicles.controlItems);
        this.store.pipe(
            select(fromDictionaries.getSintirisiIgra),
            filter((dictionary: TypeOfServiceDictionary) => !!dictionary)
        ).subscribe(dictionary => this.sintirisiIgraItems = dictionary.controlItems);
        this.store.pipe(
            select(fromDictionaries.getSintirisiIlektrologika),
            filter((dictionary: TypeOfServiceDictionary) => !!dictionary)
        ).subscribe(dictionary => this.sintirisiIlektrologikaItems = dictionary.controlItems);
        this.store.pipe(
            select(fromDictionaries.getSintirisiMixanikaMeri),
            filter((dictionary: TypeOfServiceDictionary) => !!dictionary)
        ).subscribe(dictionary => this.sintirisiMixanikaMeriItems = dictionary.controlItems);
        this.store.pipe(
            select(fromDictionaries.getSintirisiAnartisi),
            filter((dictionary: TypeOfServiceDictionary) => !!dictionary)
        ).subscribe(dictionary => this.sintirisiAnartisiItems = dictionary.controlItems);
        this.store.pipe(
            select(fromDictionaries.getSintirisiLoipa),
            filter((dictionary: TypeOfServiceDictionary) => !!dictionary)
        ).subscribe(dictionary => this.sintirisiLoipaItems = dictionary.controlItems);

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
            date: [null, {
                updateOn: 'change', validators: [
                    Validators.required
                ]
            }],
            cost: [null, {
                updateOn: 'blur', validators: [
                    Validators.required,
                    Validators.maxLength(12),
                    Validators.pattern(regex.numbers)
                ]
            }],
            sintirisiIgra: [this.sintirisiIgraItems, {updateOn: 'change'}],
            sintirisiIlektrologika: [this.sintirisiIlektrologikaItems, {updateOn: 'change'}],
            sintirisiMixanikaMeri: [this.sintirisiMixanikaMeriItems, {updateOn: 'change'}],
            sintirisiAnartisi: [this.sintirisiAnartisiItems, {updateOn: 'change'}],
            sintirisiLoipa: [this.sintirisiLoipaItems, {updateOn: 'change'}],
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
