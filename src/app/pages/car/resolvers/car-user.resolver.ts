import {inject} from "@angular/core";
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromUser from '@app/store/user';
import {filter, take} from "rxjs/operators";

export const CarUserResolver: ResolveFn<fromUser.User> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  store: Store = inject(Store)
  // @ts-ignore
): Observable<fromUser.User> => store.pipe(select(fromUser.getUser), filter(user => !!user), take(1));

