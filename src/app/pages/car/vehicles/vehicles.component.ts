import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Vehicle} from "@app/pages/car/vehicles/store/list";
import {FormComponent} from "@app/pages/car/vehicles/components/form/form.component";
import {MatDialog} from "@angular/material/dialog";
import {select, Store} from "@ngrx/store";
import * as fromRoot from '@app/store';
import * as fromList from './store/list';
import {User} from "@app/store/user";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html'
})
export class VehiclesComponent {

  vehicles$!: Observable<Vehicle[]>;
  user!: User | null;

  constructor(public dialog: MatDialog,
              private store: Store<fromRoot.State>,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      ({user}) => {
        this.user = user;
        this.vehicles$ = this.store.pipe(select(fromList.selectAll));
        this.store.dispatch(new fromList.Read(this.user?.uid));
      });
  }

  onAdd(): void {
    this.dialog.open(FormComponent, {
      width: '650px',
      height: '320px',
      data: {userId: this.user?.uid}
    });
  }

  onEdit(value: Vehicle): void {
    this.dialog.open(FormComponent, {
      width: '650px',
      height: '320px',
      data: {value, userId: this.user?.uid}
    });
  }

  onDelete(id: string): void {
    this.store.dispatch(new fromList.Delete(id, this.user?.uid));
  }
}
