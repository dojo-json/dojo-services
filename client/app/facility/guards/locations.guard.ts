import { CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { StoreEntitiesGuard } from '@app/core';

import * as fromInjectors from '../injectors';
import * as fromStore from '../store';

@Injectable({
  providedIn: 'root',
})
export class LocationsGuard
  extends StoreEntitiesGuard<
    fromStore.FacilitiesState,
    fromStore.LocationActions
  >
  implements CanActivateChild {
  selector = fromStore.getLocationsLoaded;

  constructor(
    protected readonly store: Store<fromStore.FacilitiesState>,
    @Inject(fromInjectors.LOCATIONS_LOAD)
    protected loader: fromStore.LocationsLoad
  ) {
    super(store, loader);
  }

  canActivateChild(next: ActivatedRouteSnapshot) {
    return this.canActivate(next);
  }
}
