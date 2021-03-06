import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '@auth/store';

import { routeAnimations } from '@app/core/animations';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  animations: [routeAnimations],
})
export class RootComponent implements OnInit {
  loggedIn$: Observable<boolean>;

  constructor(private readonly store: Store<fromStore.State>) {}

  ngOnInit() {
    this.loggedIn$ = this.store.pipe(select(fromStore.getLoggedIn));
  }

  onLogout() {
    this.store.dispatch(new fromStore.Logout());
  }
}
