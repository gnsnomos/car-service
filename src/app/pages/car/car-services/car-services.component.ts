import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, fromEvent, Observable, of, Subscription, switchMap, zip} from 'rxjs';
import {User} from '@app/models/backend/user';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '@app/store';
import {ActivatedRoute} from '@angular/router';
import * as fromList from './store/list';
import {FormComponent} from '@app/pages/car/car-services/components/form/form.component';
import * as fromDictionaries from './store/dictionaries';
import {ControlItem, Dictionary} from './store/dictionaries';
import {Service} from "@app/pages/car/car-services/store/list";
import {filter, map} from "rxjs/operators";
import {FormService} from "@app/services";

@Component({
  selector: 'app-car-services',
  templateUrl: './car-services.component.html',
  styleUrls: ['./car-services.component.scss']
})
export class CarServicesComponent implements OnInit, OnDestroy {
  user: User;
  services$: Observable<Service[]>;
  vehicles$: Observable<ControlItem[]>;

  collapsedHeight = '80px';
  expandedHeight = '90px';

  private readonly expansionPanelCollapsedHeightSmallScreens = '120px';
  private readonly expansionPanelExpandedHeightSmallScreens = '130px';
  private readonly expansionPanelCollapsedHeightLargerScreens = '80px';
  private readonly expansionPanelExpandedHeightLargerScreens = '90px';
  private onResize$: Subscription;

  constructor(public dialog: MatDialog,
              private store: Store<fromRoot.State>,
              private activatedRoute: ActivatedRoute,
              private formService: FormService) {
  }

  ngOnInit(): void {
    this.vehicles$ = this.store.pipe(
      select(fromDictionaries.getVehicles),
      filter((vehicles: Dictionary) => !!vehicles),
      map(vehicles => vehicles.controlItems)
    );

    this.setExpansionPanelHeight();

    this.onResize$ = fromEvent(window, 'resize').pipe(debounceTime(400))
      .subscribe(_ => this.setExpansionPanelHeight());

    this.activatedRoute.data.subscribe(
      ({user}) => {
        this.user = user;
        this.services$ = this.store.pipe(
          select(fromList.selectAll),
          switchMap((services) => zip(of(services), this.vehicles$)),
          map(([services, vehicles]) => {
            return services.map(service => {
              return ({
                ...service,
                vehicleLabel: vehicles.filter(vehicle => vehicle.value === service.vehicle)[0].label
              })
            })
          })
        );

        this.store.dispatch(new fromList.Read(user.uid));
        this.store.dispatch(new fromDictionaries.Read(user.uid));
      });
  }

  ngOnDestroy(): void {
    this.onResize$.unsubscribe();
  }

  onAdd(): void {
    this.dialog.open(FormComponent, {
      width: this.formService.getModalWidth() + 'px',
      height: this.formService.getModalHeight() + 'px',
      data: {userId: this.user.uid}
    });
  }

  onEdit(value: Service): void {
    this.dialog.open(FormComponent, {
      width: this.formService.getModalWidth() + 'px',
      height: this.formService.getModalHeight() + 'px',
      data: {value, userId: this.user.uid}
    });
  }

  onDelete(id: string): void {
    this.store.dispatch(new fromList.Delete(id, this.user.uid));
  }

  private setExpansionPanelHeight(width: number = window.innerWidth): void {
    if (width <= 430) {
      this.collapsedHeight = this.expansionPanelCollapsedHeightSmallScreens;
      this.expandedHeight = this.expansionPanelExpandedHeightSmallScreens;
    } else {
      this.collapsedHeight = this.expansionPanelCollapsedHeightLargerScreens;
      this.expandedHeight = this.expansionPanelExpandedHeightLargerScreens;
    }
  }
}
