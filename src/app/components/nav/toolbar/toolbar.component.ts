import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {Store} from "@ngrx/store";
import * as fromRoot from "@app/store";
import * as fromUser from "@app/store/user";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {

  @Input() title: string;
  @Input() isAuthorized: boolean | null;
  @Input() sidenav: MatSidenav;

  constructor(private store: Store<fromRoot.State>) {
  }

  onSignOut(): void {
    this.store.dispatch(new fromUser.SignOut());
  }
}
