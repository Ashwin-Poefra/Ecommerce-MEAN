import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
    /**
     * Combine pieces of state using createSelector,
     * and expose them as observables through the facade.
     */
    loaded$ = this.store.pipe(select(UsersSelectors.getUsersLoaded));
    allUsers$ = this.store.pipe(select(UsersSelectors.getAllUsers));
    selectedUsers$ = this.store.pipe(select(UsersSelectors.getSelected));

    constructor(private readonly store: Store) {}

    /**
     * Use the initialization action to perform one
     * or more tasks in your Effects.
     */
    init() {
        this.store.dispatch(UsersActions.init());
    }
}
