import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import * as fromRoot from './store';
import * as fromUser from './store/user';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = $localize`Car service`;

  isAuthorized$!: Observable<boolean>;
  user$!: Observable<fromUser.User | null>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized));
    this.user$ = this.store.pipe(select(fromUser.getUser));

    this.store.dispatch(new fromUser.Init());
  }
}
