import {Component, OnInit} from '@angular/core';
import {combineAll, concatAll, forkJoin, from, merge, mergeAll, Observable, of, switchMap, zip} from 'rxjs';
import {User} from '@app/models/backend/user';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '@app/store';
import {ActivatedRoute} from '@angular/router';
import * as fromList from './store/list';
import {FormComponent} from '@app/pages/car/car-services/components/form/form.component';
import * as fromDictionaries from './store/dictionaries';
import {Service} from "@app/pages/car/car-services/store/list";
import {filter, map, tap} from "rxjs/operators";
import {ControlItem, Dictionary} from "./store/dictionaries";

@Component({
    selector: 'app-car-services',
    templateUrl: './car-services.component.html',
    styleUrls: ['./car-services.component.scss']
})
export class CarServicesComponent implements OnInit {
    services$: Observable<Service[]>;
    user: User;

    private vehicles$: Observable<ControlItem[]>;

    constructor(public dialog: MatDialog,
                private store: Store<fromRoot.State>,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.vehicles$ = this.store.pipe(
            select(fromDictionaries.getVehicles),
            filter((vehicles: Dictionary) => !!vehicles),
            map(vehicles => vehicles.controlItems)
        );

        this.activatedRoute.data.subscribe(
            ({user}) => {
                this.user = user;
                this.services$ = this.store.pipe(
                    select(fromList.selectAll),
                    switchMap((services) => zip(of(services), this.vehicles$)),
                    map(([services, vehicles]) => {
                        return services.map(service => {
                            return ({...service, vehicleLabel: vehicles.filter(vehicle => vehicle.value === service.vehicle)[0].label})
                        })
                    })
                );

                this.store.dispatch(new fromList.Read(user.uid));
                this.store.dispatch(new fromDictionaries.Read(user.uid));
            });
    }

    onAdd(): void {
        this.dialog.open(FormComponent, {
            width: '650px',
            height: '400px',
            data: {userId: this.user.uid}
        });
    }

    onEdit(value: Service): void {
        this.dialog.open(FormComponent, {
            width: '650px',
            height: '400px',
            data: {value, userId: this.user.uid}
        });
    }

    onDelete(id: string): void {
        this.store.dispatch(new fromList.Delete(id, this.user.uid));
    }
}
